"use client";

import { useEffect, useRef, useState } from "react";
import { beginSceneLoad } from "@/lib/sceneReadiness";
import { createAmbientEntrance } from "./cloud-world/ambientEntrance";
import { createSkyDetails } from "./cloud-world/details";
import { createFireflies } from "./cloud-world/fireflies";
import { createDistantJet } from "./cloud-world/jet";
import { createSkyLife } from "./cloud-world/life";
import { createPlaneEntrance } from "./cloud-world/planeEntrance";
import { screenVertex, skyFragment } from "./cloud-world/shaders";
import { CLOUD_VOLUME, createCloudVolume } from "./cloud-world/volume";

export default function CloudWorld({ paused, onReady }) {
  const hostRef = useRef(null);
  const pausedRef = useRef(paused);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const settleScene = beginSceneLoad("home");
    const controller = new AbortController();
    let cancelled = false;
    let cleanup = () => {};
    import("three")
      .then(async (T) => {
        if (cancelled) return;
        const response = await fetch(CLOUD_VOLUME.url, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Cloud material could not load");
        const stream = response.body.pipeThrough(
          new DecompressionStream("gzip"),
        );
        const atlas = new Uint8Array(await new Response(stream).arrayBuffer());
        if (cancelled) return;
        if (
          atlas.length !==
          CLOUD_VOLUME.width * CLOUD_VOLUME.height * CLOUD_VOLUME.depth * 4
        )
          throw new Error("Invalid cloud material");
        const host = hostRef.current;
        const interaction = host.parentElement;
        const hero = host.closest(".cloud-hero");
        const introduction = hero.querySelector(".cloud-original-introduction");
        const legibility = hero.querySelector(".cloud-legibility");
        const controls = hero.querySelector(".cloud-hero-bottom");
        const work = hero.closest("main").querySelector("#current-work");
        let renderer;
        try {
          renderer = new T.WebGLRenderer({ antialias: false, alpha: false });
        } catch {
          settleScene("fallback");
          setUnavailable(true);
          return;
        }
        renderer.debug.onShaderError = () => {
          throw new Error("The sky shaders could not compile");
        };
        renderer.autoClear = false;
        renderer.setClearColor(0x101c32);
        host.appendChild(renderer.domElement);
        cleanup = () => {
          renderer.dispose();
          renderer.domElement.remove();
        };
        const scene = new T.Scene();
        const clouds = createCloudVolume(T, atlas);
        const details = createSkyDetails(T, scene);
        const life = createSkyLife(T, scene);
        const jet = createDistantJet(T, scene);
        const fireflies = createFireflies(T, clouds.atmosphere);
        const camera = new T.PerspectiveCamera(47, 1, 0.1, 150);
        camera.position.set(0, 3.7, 9);
        const target = new T.Vector3(0, 2, -8);
        camera.lookAt(target);
        camera.updateMatrixWorld();
        const entrance = createPlaneEntrance(T, {
          plane: details.plane,
          camera,
          host,
        });
        const ambientEntrance = createAmbientEntrance(T, {
          camera,
          host,
          fireflies,
          streaks: details.streaks,
          jet,
        });
        const uniforms = {
          uTime: { value: 0 },
          uAspect: { value: 1 },
          uParallax: { value: new T.Vector2() },
        };
        const geometry = new T.PlaneGeometry(2, 2);
        const material = new T.ShaderMaterial({
          vertexShader: screenVertex,
          fragmentShader: skyFragment,
          uniforms,
          depthWrite: false,
          depthTest: false,
          toneMapped: false,
        });
        const sky = new T.Scene();
        sky.add(new T.Mesh(geometry, material));
        const screenCamera = new T.Camera();
        let inView = true;
        let sceneVisible = true;
        let sceneLost = false;
        let dirty = true;
        let elapsed = 0;
        let last = 0;
        let frame;
        let first = true;
        let signatureDrawn = false;
        // Shader compilation/texture upload must not interrupt the pen stroke.
        Promise.allSettled(
          (document.querySelector(".loader-path")?.getAnimations() ?? []).map(
            (animation) => animation.finished,
          ),
        ).then(() => {
          signatureDrawn = true;
        });
        let suspended = true;
        let scroll = 0;
        let journey = 0;
        const pointer = { x: 0, y: 0 };
        const easedPointer = new T.Vector2();
        const media = matchMedia("(prefers-reduced-motion: reduce)");
        const resize = () => {
          const w = host.clientWidth;
          const h = host.clientHeight;
          // Bound full-screen compositing cost on high-density displays.
          renderer.setPixelRatio(
            Math.min(
              window.devicePixelRatio || 1,
              2,
              Math.sqrt(2000000 / Math.max(1, w * h)),
            ),
          );
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.fov = w < 760 ? 54 : 47;
          camera.updateProjectionMatrix();
          uniforms.uAspect.value = w / h;
          clouds.resize(w, h, renderer.getPixelRatio());
          details.setMobile(w < 760);
          life.setMobile(w < 760);
          fireflies.setMobile(w < 760);
          entrance.resize();
          ambientEntrance.resize();
          onScroll();
          dirty = true;
        };
        const onPointer = (event) => {
          if (event.pointerType === "touch") return;
          const r = host.getBoundingClientRect();
          pointer.x = (event.clientX - r.left) / r.width - 0.5;
          pointer.y = (event.clientY - r.top) / r.height - 0.5;
          if (!pausedRef.current && !media.matches) dirty = true;
        };
        const onLeave = () => {
          pointer.x = 0;
          pointer.y = 0;
          if (!pausedRef.current && !media.matches) dirty = true;
        };
        const onScroll = () => {
          const staticLayout = media.matches || sceneLost;
          const heroTop = hero.getBoundingClientRect().top;
          const workTop = work.getBoundingClientRect().top;
          const stageBounds = interaction.getBoundingClientRect();
          const clippingChanged = clouds.setVisibleRange(
            stageBounds.top,
            Math.max(1, stageBounds.height),
            innerHeight,
          );
          const pinnedTravel = Math.max(
            1,
            hero.offsetHeight - interaction.offsetHeight,
          );
          // Keep flying until the work heading has entered, including the release
          // of the sticky stage. This removes the old stop-then-scroll handoff.
          const travel = Math.max(1, workTop - heroTop - innerHeight * 0.14);
          scroll = staticLayout
            ? 0
            : T.MathUtils.clamp(-heroTop / travel, 0, 1);
          const introProgress = Math.max(0, -heroTop / pinnedTravel);
          const fade = staticLayout
            ? 0
            : T.MathUtils.smoothstep(introProgress, 0.06, 1.05);
          introduction.style.opacity = String(1 - fade);
          introduction.style.transform = fade
            ? `translate3d(0, ${-fade * 72}px, 0) scale(${1 - fade * 0.025})`
            : "none";
          introduction.inert = fade > 0.96;
          introduction.setAttribute("aria-hidden", String(fade > 0.96));
          legibility.style.opacity = String(1 - fade * 0.65);
          const controlsFade = staticLayout
            ? 0
            : T.MathUtils.smoothstep(introProgress, 0.25, 0.55);
          controls.style.opacity = String(1 - controlsFade);
          controls.inert = controlsFade > 0.96;
          controls.setAttribute("aria-hidden", String(controlsFade > 0.96));
          const exit = staticLayout
            ? 0
            : T.MathUtils.smoothstep(1 - workTop / innerHeight, 0.08, 0.86);
          interaction.style.setProperty("--sky-visibility", String(1 - exit));
          sceneVisible = exit < 0.999;
          // Paused scrolling changes the HTML overlay, not the frozen scene.
          // Redraw only if scrolling reveals a previously clipped cloud region.
          if (clippingChanged || (!pausedRef.current && !media.matches))
            dirty = true;
        };
        const onMotionChange = () => {
          if (media.matches) {
            journey = 0;
            camera.position.set(0, 3.7, 9);
            target.set(0, 2, -8);
            uniforms.uParallax.value.set(0, 0);
          }
          onScroll();
          dirty = true;
        };
        const markDirty = () => {
          dirty = true;
        };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        const visibility = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          last = 0;
          dirty = true;
        });
        visibility.observe(host);
        interaction.addEventListener("pointermove", onPointer);
        interaction.addEventListener("pointerleave", onLeave);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        document.addEventListener("visibilitychange", markDirty);
        media.addEventListener("change", onMotionChange);
        function draw(now) {
          frame = requestAnimationFrame(draw);
          const dt = last ? Math.min((now - last) / 1000, 0.08) : 1 / 60;
          last = now;
          if (document.hidden || ((!inView || !sceneVisible) && !first)) {
            entrance.cancel();
            ambientEntrance.dispose();
            if (!first) settleScene("ready");
            suspended = true;
            return;
          }
          if (suspended) {
            // Re-enter at the current scroll position instead of replaying a
            // camera move that happened while the hero was out of view.
            journey = scroll;
            easedPointer.set(pointer.x, pointer.y);
            suspended = false;
          }
          const still = pausedRef.current || media.matches;
          if (still) {
            entrance.cancel();
            ambientEntrance.dispose();
            if (!first) settleScene("ready");
          }
          if (still && !dirty && !first) return;
          if (!still) elapsed += dt;
          uniforms.uTime.value = elapsed;
          if (!still) {
            // One damped scroll value drives both camera and look target.
            journey += (scroll - journey) * (1 - Math.exp(-dt * 10));
            const pointerEase = 1 - Math.exp(-dt * 4);
            easedPointer.x += (pointer.x - easedPointer.x) * pointerEase;
            easedPointer.y += (pointer.y - easedPointer.y) * pointerEase;
            camera.position.set(
              easedPointer.x * 0.7 - journey * 1.1,
              3.7 - journey * 2.8 - easedPointer.y * 0.18,
              9 - journey * 8.5,
            );
            target.set(
              camera.position.x - journey * 0.4,
              camera.position.y - 1.7 - journey * 0.65,
              camera.position.z - 17,
            );
            uniforms.uParallax.value.set(
              -camera.position.x * 0.003,
              -journey * 0.045,
            );
          }
          details.update(elapsed, journey);
          life.update(elapsed);
          jet.update(elapsed);
          fireflies.update(elapsed);
          camera.lookAt(target);
          camera.updateMatrixWorld();
          entrance.update(
            dt,
            !still && inView && sceneVisible && scroll < 0.04,
          );
          const loaderOpaque =
            document.documentElement.dataset.preloaderPhase === "loading";
          const renderFrame = !loaderOpaque || (first && signatureDrawn);
          try {
            // Prepare the GPU after the stroke, then leave its expensive cloud
            // pass idle behind the opaque veil. Foreground details keep moving.
            if (renderFrame) {
              clouds.render(
                renderer,
                sky,
                screenCamera,
                scene,
                camera,
                elapsed,
                fireflies.scene,
              );
            }
            if (first && renderFrame && renderer.getContext().isContextLost())
              throw new Error(
                "The sky context was lost before its first frame",
              );
          } catch {
            sceneLost = true;
            onScroll();
            cleanup();
            settleScene("fallback");
            if (!cancelled) setUnavailable(true);
            return;
          }
          entrance.draw();
          ambientEntrance.draw(
            elapsed,
            dt,
            !still && inView && sceneVisible && scroll < 0.04,
          );
          dirty = false;
          if (first && renderFrame) {
            first = false;
            host.dataset.ready = "true";
            onReady();
          }
          if (!first && entrance.ready && ambientEntrance.ready)
            settleScene("ready");
        }
        const contextLost = (event) => {
          event.preventDefault();
          cancelAnimationFrame(frame);
          entrance.dispose();
          ambientEntrance.dispose();
          sceneLost = true;
          onScroll();
          settleScene("fallback");
          setUnavailable(true);
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          visibility.disconnect();
          interaction.removeEventListener("pointermove", onPointer);
          interaction.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          document.removeEventListener("visibilitychange", markDirty);
          media.removeEventListener("change", onMotionChange);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          entrance.dispose();
          ambientEntrance.dispose();
          geometry.dispose();
          material.dispose();
          clouds.dispose();
          details.dispose();
          life.dispose();
          jet.dispose();
          fireflies.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        resize();
        frame = requestAnimationFrame(draw);
      })
      .catch(() => {
        cleanup();
        if (!cancelled) {
          settleScene("fallback");
          setUnavailable(true);
        }
      });
    return () => {
      cancelled = true;
      controller.abort();
      cleanup();
    };
  }, [onReady]);

  return (
    <div
      ref={hostRef}
      className={`cloud-world${unavailable ? " cloud-world-unavailable" : ""}`}
      aria-hidden="true"
    />
  );
}
