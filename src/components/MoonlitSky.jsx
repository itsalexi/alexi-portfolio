"use client";

import { useEffect, useRef } from "react";
import { beginSceneLoad } from "@/lib/sceneReadiness";
import { screenVertex, skyFragment } from "./cloud-world/shaders";

/** A quiet version of the homepage sky for the reading pages. */
export default function MoonlitSky({ className }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const settleScene = beginSceneLoad("moonlit");
    let cancelled = false;
    let failed = false;
    let cleanup = () => {};
    import("three")
      .then((T) => {
        if (cancelled) return;
        const host = hostRef.current;
        const renderer = new T.WebGLRenderer({
          alpha: false,
          antialias: false,
        });
        renderer.debug.onShaderError = () => {
          throw new Error("The moonlit sky shaders could not compile");
        };
        cleanup = () => renderer.dispose();
        const geometry = new T.PlaneGeometry(2, 2);
        const uniforms = {
          uTime: { value: 0 },
          uAspect: { value: 1 },
          uParallax: { value: new T.Vector2() },
        };
        const material = new T.ShaderMaterial({
          vertexShader: screenVertex,
          fragmentShader: skyFragment,
          uniforms,
          depthTest: false,
          depthWrite: false,
          toneMapped: false,
        });
        const scene = new T.Scene();
        const camera = new T.Camera();
        scene.add(new T.Mesh(geometry, material));
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        let visible = true,
          first = true,
          frame = null,
          timer = null,
          last = 0;
        const stop = () => {
          if (frame !== null) cancelAnimationFrame(frame);
          if (timer !== null) clearTimeout(timer);
          frame = null;
          timer = null;
          last = 0;
        };
        const request = () => {
          timer = null;
          if (
            !cancelled &&
            !failed &&
            (visible || first) &&
            !document.hidden &&
            frame === null
          )
            frame = requestAnimationFrame(draw);
        };
        function draw(now) {
          frame = null;
          if (cancelled || failed || (!visible && !first) || document.hidden)
            return;
          if (!reduced.matches && last)
            uniforms.uTime.value += Math.min((now - last) / 1000, 0.1);
          last = now;
          try {
            renderer.render(scene, camera);
            if (first && renderer.getContext().isContextLost())
              throw new Error("The moonlit sky context was lost");
          } catch {
            failed = true;
            settleScene("fallback");
            cleanup();
            return;
          }
          if (first) {
            first = false;
            settleScene("ready");
          }
          // Stars and thin high clouds move slowly; they don't need a 60 Hz pass.
          if (!reduced.matches) timer = setTimeout(request, 1000 / 24);
        }
        const resize = () => {
          const width = host.clientWidth,
            height = host.clientHeight;
          if (!width || !height) return;
          renderer.setPixelRatio(
            Math.min(
              devicePixelRatio || 1,
              2,
              Math.sqrt(1800000 / (width * height)),
            ),
          );
          renderer.setSize(width, height);
          uniforms.uAspect.value = width / height;
          stop();
          request();
        };
        const resume = () => {
          stop();
          request();
        };
        const contextLost = (event) => {
          event.preventDefault();
          failed = true;
          settleScene("fallback");
          cleanup();
        };
        const observer = new ResizeObserver(resize);
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          resume();
        });
        cleanup = () => {
          stop();
          observer.disconnect();
          intersection.disconnect();
          document.removeEventListener("visibilitychange", resume);
          reduced.removeEventListener("change", resume);
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          );
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        host.appendChild(renderer.domElement);
        observer.observe(host);
        intersection.observe(host);
        document.addEventListener("visibilitychange", resume);
        reduced.addEventListener("change", resume);
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        resize();
      })
      .catch(() => {
        // The CSS sky remains visible if WebGL is unavailable.
        failed = true;
        cleanup();
        if (!cancelled) settleScene("fallback");
      });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
