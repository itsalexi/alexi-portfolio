const REVEAL_DURATION = 1.1;
const FIREFLY_INDICES = [0, 4, 8, 15, 19, 24, 28, 38];

/** Borrow a few real sky details while the opaque loading veil is present. */
export function createAmbientEntrance(
  T,
  { camera, host, fireflies, streaks, jet },
) {
  const root = document.documentElement;
  const point = new T.Vector3();
  const tail = new T.Vector3();
  const tip = new T.Vector3();
  const side = new T.Vector3();
  const sample = {
    position: new T.Vector3(),
    color: new T.Color(),
    glow: 0,
    radius: 0,
  };
  const glows = [];
  const shootingStars = [];
  const jetTrails = [];
  let jetBody = null;
  let container = null;
  let ownsContainer = false;
  let bounds = null;
  let pending = true;
  let active = false;
  let age = 0;
  let revealTime = null;
  const dispose = () => {
    if (container) {
      if (ownsContainer) container.remove();
      else {
        container.style.opacity = "0";
        container.style.visibility = "hidden";
        for (const { element, owned } of glows) if (owned) element.remove();
        jetBody?.remove();
        for (const { element } of jetTrails) element.remove();
        for (const { line, glow } of shootingStars) {
          line.remove();
          glow.remove();
        }
      }
    }
    container = null;
    active = false;
    pending = false;
    glows.length = 0;
    shootingStars.length = 0;
    jetTrails.length = 0;
    jetBody = null;
  };
  const makeSpan = (styles) => {
    const span = document.createElement("span");
    Object.assign(span.style, {
      position: "absolute",
      left: "0",
      top: "0",
      pointerEvents: "none",
      opacity: "0",
      ...styles,
    });
    container.appendChild(span);
    return span;
  };
  const resize = () => {
    bounds = host.getBoundingClientRect();
  };
  const create = (time) => {
    container = document.querySelector?.(
      '[data-ambient-entrance="true"][data-ambient-owner="preloader"]',
    );
    ownsContainer = !container;
    if (ownsContainer) {
      container = document.createElement("div");
      container.dataset.ambientEntrance = "true";
      container.setAttribute("aria-hidden", "true");
      Object.assign(container.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: "100",
        overflow: "hidden",
        contain: "layout style",
      });
    }
    container.dataset.managed = "true";
    for (const index of FIREFLY_INDICES) {
      if (!fireflies.sample(index, time, sample)) continue;
      const { r, g, b } = sample.color;
      const color = `${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}`;
      const core = `${Math.round((r * 0.65 + 0.35) * 255)} ${Math.round((g * 0.65 + 0.35) * 255)} ${Math.round((b * 0.65 + 0.73 * 0.35) * 255)}`;
      let element = container.querySelector?.(
        `[data-entrance-firefly="${index}"]`,
      );
      const owned = !element;
      let origin = null;
      if (element) {
        const box = element.getBoundingClientRect();
        origin = {
          x: box.left + box.width / 2,
          y: box.top + box.height / 2,
          scale: box.width / 12,
          opacity: Number.parseFloat(getComputedStyle(element).opacity) || 0.24,
        };
        // Freeze the current CSS pose before the scene takes over these same nodes.
        Object.assign(element.style, {
          animation: "none",
          left: "0",
          top: "0",
          transform: `translate3d(${origin.x - 6}px, ${origin.y - 6}px, 0) scale(${origin.scale})`,
          opacity: String(origin.opacity),
        });
      } else {
        element = makeSpan({
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgb(${core}) 0%, rgb(${color} / 75%) 9%, rgb(${color} / 15%) 28%, transparent 70%)`,
        });
        element.dataset.entranceFirefly = String(index);
      }
      glows.push({ index, element, owned, origin });
    }
    for (const streak of streaks.slice(0, 2)) {
      const line = makeSpan({
        width: "1px",
        height: "1px",
        transformOrigin: "0 50%",
        background:
          "linear-gradient(90deg, transparent, rgb(140 173 255 / 8%) 30%, rgb(185 200 236 / 38%) 68%, rgb(255 240 196))",
      });
      line.dataset.entranceMeteor = "true";
      const head = makeSpan({
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgb(255 245 204 / 90%), rgb(140 224 171 / 15%) 22%, transparent 68%)",
      });
      shootingStars.push({ ...streak, line, glow: head });
    }
    if (jet) {
      jetBody = makeSpan({
        width: "1px",
        height: "1px",
        borderRadius: "2px",
        transformOrigin: "0 50%",
        background: "#bac6d1",
      });
      jetBody.dataset.entranceJet = "true";
      for (const trail of jet.trails) {
        for (let segment = 0; segment < 8; segment++) {
          const element = makeSpan({
            width: "1px",
            height: "1px",
            borderRadius: "1px",
            transformOrigin: "0 50%",
            background: "rgb(176 196 219)",
          });
          jetTrails.push({
            trail,
            element,
            start: segment / 8,
            end: (segment + 1) / 8,
          });
        }
      }
    }
    resize();
    if (ownsContainer) document.body.appendChild(container);
    active = true;
  };
  const project = (vector) => {
    vector.project(camera);
    vector.x = bounds.left + ((vector.x + 1) * bounds.width) / 2;
    vector.y = bounds.top + ((1 - vector.y) * bounds.height) / 2;
    return vector;
  };
  const draw = (time, dt, allowed) => {
    if (!allowed) {
      dispose();
      return;
    }
    let created = false;
    if (pending) {
      pending = false;
      if (
        root.dataset.preloaderReady === "true" ||
        root.dataset.preloaderPhase !== "loading"
      )
        return;
      create(time);
      created = true;
    }
    if (!active) return;
    if (!root.dataset.preloaderPhase) {
      dispose();
      return;
    }
    if (!created) age += dt;
    if (root.dataset.preloaderPhase === "revealing")
      revealTime = (revealTime ?? 0) + dt;
    const fade =
      revealTime === null
        ? 0
        : T.MathUtils.smoothstep(revealTime / REVEAL_DURATION, 0.05, 0.9);
    if (fade >= 1) {
      dispose();
      return;
    }
    const presence = T.MathUtils.smoothstep(age, 0, 0.24) * (1 - fade);
    const adoption = T.MathUtils.smoothstep(age, 0, 0.6);
    const focalLength =
      bounds.height / (2 * Math.tan((camera.fov * Math.PI) / 360));
    for (const { index, element, origin } of glows) {
      if (!fireflies.sample(index, time, sample)) {
        element.style.opacity = "0";
        continue;
      }
      point.copy(sample.position).applyMatrix4(camera.matrixWorldInverse);
      const depth = -point.z;
      project(point.copy(sample.position));
      if (depth <= camera.near || point.z > 1) {
        element.style.opacity = "0";
        continue;
      }
      const core = T.MathUtils.clamp(
        (sample.radius * focalLength * 0.1755) / depth,
        1,
        3,
      );
      const x = origin
        ? T.MathUtils.lerp(origin.x, point.x, adoption)
        : point.x;
      const y = origin
        ? T.MathUtils.lerp(origin.y, point.y, adoption)
        : point.y;
      const scale = origin
        ? T.MathUtils.lerp(origin.scale, core / 2, adoption)
        : core / 2;
      element.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0) scale(${scale})`;
      element.style.opacity = String(
        origin
          ? T.MathUtils.lerp(origin.opacity, sample.glow * 0.62, adoption) *
              (1 - fade)
          : sample.glow * presence * 0.62,
      );
    }
    if (jetBody) {
      jet.jet.updateWorldMatrix(true, false);
      project(tail.set(-0.408, 0, 0).applyMatrix4(jet.jet.matrixWorld));
      project(tip.set(0.408, 0, 0).applyMatrix4(jet.jet.matrixWorld));
      const length = Math.hypot(tip.x - tail.x, tip.y - tail.y);
      jetBody.style.width = `${length}px`;
      jetBody.style.transform = `translate3d(${tail.x}px, ${tail.y - 0.5}px, 0) rotate(${Math.atan2(tip.y - tail.y, tip.x - tail.x)}rad)`;
      jetBody.style.opacity = String(presence * 0.38);
      jetBody.style.filter = fade > 0 ? `blur(${fade * 0.6}px)` : "none";
      for (const { trail, element, start, end } of jetTrails) {
        trail.mesh.updateWorldMatrix(true, false);
        const trailTime = trail.material.uniforms.uTime.value;
        const centerline = (u, vector) => {
          const x = (u - 0.5) * 19;
          const age = 1 - u;
          const y =
            Math.sin(x * 0.37 + trailTime * 0.06) * age * 0.18 +
            Math.sin(x * 1.1 + trailTime * 0.11) * age * age * 0.055;
          return project(
            vector.set(x, y, 0).applyMatrix4(trail.mesh.matrixWorld),
          );
        };
        centerline(start, tail);
        centerline(end, tip);
        const u = (start + end) / 2;
        const breakup =
          0.72 +
          0.28 *
            Math.sin(u * 43 + trailTime * 0.09) *
            Math.sin(u * 17 - trailTime * 0.07);
        const intensity =
          T.MathUtils.smoothstep(u, 0, 0.5) *
          (1 - T.MathUtils.smoothstep(u, 0.94, 1)) *
          T.MathUtils.lerp(breakup, 1, u);
        element.style.width = `${Math.hypot(tip.x - tail.x, tip.y - tail.y) + 0.4}px`;
        element.style.height = "1.5px";
        element.style.transform = `translate3d(${tail.x}px, ${tail.y - 0.75}px, 0) rotate(${Math.atan2(tip.y - tail.y, tip.x - tail.x)}rad)`;
        element.style.opacity = String(
          intensity * jet.trailOpacity * presence * 0.6,
        );
      }
    }
    for (const { mesh, head, line, glow } of shootingStars) {
      if (!mesh.visible) {
        line.style.opacity = "0";
        glow.style.opacity = "0";
        continue;
      }
      mesh.updateWorldMatrix(true, false);
      project(tail.set(-0.5, 0, 0).applyMatrix4(mesh.matrixWorld));
      project(tip.set(0.5, 0, 0).applyMatrix4(mesh.matrixWorld));
      project(side.set(-0.5, 0.5, 0).applyMatrix4(mesh.matrixWorld));
      if (tail.z > 1 || tip.z > 1) {
        line.style.opacity = "0";
        glow.style.opacity = "0";
        continue;
      }
      const dx = tip.x - tail.x;
      const dy = tip.y - tail.y;
      const length = Math.hypot(dx, dy);
      const width = Math.max(
        0.55,
        Math.hypot(side.x - tail.x, side.y - tail.y) * 0.16,
      );
      line.style.width = `${length}px`;
      line.style.height = `${width}px`;
      line.style.transform = `translate3d(${tail.x}px, ${tail.y - width / 2}px, 0) rotate(${Math.atan2(dy, dx)}rad)`;
      line.style.opacity = String(
        mesh.material.uniforms.uOpacity.value * presence * 0.68,
      );
      line.style.filter = fade > 0 ? `blur(${fade * 0.6}px)` : "none";
      glow.style.transform = `translate3d(${tip.x - 5}px, ${tip.y - 5}px, 0)`;
      glow.style.opacity = String(
        head.material.uniforms.uOpacity.value * presence * 0.65,
      );
    }
  };
  return {
    get ready() {
      return !active || age >= 0.6;
    },
    resize,
    dispose,
    draw(time, dt, allowed) {
      // Decorative DOM must never interrupt scene readiness or the hero frame.
      try {
        draw(time, dt, allowed);
      } catch {
        dispose();
      }
    },
  };
}
