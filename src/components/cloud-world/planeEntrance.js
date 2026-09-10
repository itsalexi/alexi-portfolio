const FLIGHT_DURATION = 1.6;
const READY_AFTER = 0.5;
const REVEAL_DURATION = 1.1;

/** A foreground projection of the hero mesh, using the hero's existing clock. */
export function createPlaneEntrance(T, { plane, camera, host }) {
  const root = document.documentElement;
  const mesh = plane.children[0];
  const positions = mesh.geometry.getAttribute("position");
  const normals = mesh.geometry.getAttribute("normal");
  const shades = mesh.geometry.getAttribute("aShade");
  const light = new T.Vector3(0.5, 0.8, 0.3).normalize();
  const start = new T.Vector3();
  const handle = new T.Vector3();
  const destination = new T.Vector3();
  const direction = new T.Vector3();
  const delta = new T.Vector3();
  const look = new T.Vector3();
  const flightRotation = new T.Quaternion();
  const center = new T.Vector3();
  const vertex = new T.Vector3();
  const normal = new T.Vector3();
  const triangles = Array.from({ length: positions.count / 3 }, (_, index) => ({
    index,
    depth: 0,
    front: true,
    color: "",
    points: Array.from({ length: 3 }, () => ({ x: 0, y: 0 })),
  }));
  let pending = true;
  let active = false;
  let flightTime = 0;
  let revealTime = null;
  let canvas = null;
  let context = null;
  let bounds = null;
  let size = 0;
  let pixelRatio = 1;
  let overlayFinished = false;
  const removeOverlay = () => {
    canvas?.remove();
    canvas = null;
    context = null;
    overlayFinished = true;
  };
  const resize = () => {
    bounds = host.getBoundingClientRect();
    if (!canvas) return;
    size = Math.ceil(Math.min(800, Math.max(280, bounds.height * 0.48)));
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(size * pixelRatio);
    canvas.height = Math.ceil(size * pixelRatio);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
  };
  const createOverlay = () => {
    canvas = document.createElement("canvas");
    try {
      context = canvas.getContext("2d", { alpha: true });
    } catch {
      removeOverlay();
      return false;
    }
    if (!context) {
      removeOverlay();
      return false;
    }
    canvas.dataset.planeEntrance = "true";
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "101",
      pointerEvents: "none",
      opacity: "0",
      contain: "strict",
      willChange: "transform, opacity",
    });
    resize();
    document.body.appendChild(canvas);
    return true;
  };
  const cancel = () => {
    pending = false;
    active = false;
    removeOverlay();
  };
  return {
    get ready() {
      return !active || flightTime >= READY_AFTER;
    },
    resize,
    cancel,
    update(dt, allowed) {
      if (!allowed) {
        cancel();
        return;
      }
      if (pending) {
        pending = false;
        if (
          root.dataset.preloaderReady === "true" ||
          root.dataset.preloaderPhase !== "loading" ||
          !createOverlay()
        )
          return;
        active = true;
      } else if (active) {
        flightTime += dt;
      }
      if (!active) return;
      const phase = root.dataset.preloaderPhase;
      if (phase === "revealing") revealTime = (revealTime ?? 0) + dt;
      else if (!phase) removeOverlay();
      if (flightTime >= FLIGHT_DURATION && overlayFinished) {
        active = false;
        return;
      }
      // Both final control points follow the live flight pose. Their equality
      // removes the entrance's extra velocity at the handoff, including resize.
      const progress = Math.min(flightTime / FLIGHT_DURATION, 1);
      const remaining = 1 - progress;
      const halfHeight = Math.tan((camera.fov * Math.PI) / 360);
      start
        .set(
          -1.45 * 5.8 * halfHeight * camera.aspect,
          0.03 * 5.8 * halfHeight,
          -5.8,
        )
        .applyMatrix4(camera.matrixWorld);
      handle
        .set(
          0.45 * 6.5 * halfHeight * camera.aspect,
          0.12 * 6.5 * halfHeight,
          -6.5,
        )
        .applyMatrix4(camera.matrixWorld);
      destination.copy(plane.position);
      flightRotation.copy(plane.quaternion);
      plane.position
        .copy(start)
        .multiplyScalar(remaining ** 3)
        .addScaledVector(handle, 3 * remaining ** 2 * progress)
        .addScaledVector(
          destination,
          3 * remaining * progress ** 2 + progress ** 3,
        );
      if (progress < 1) {
        direction
          .subVectors(handle, start)
          .multiplyScalar(3 * remaining ** 2)
          .addScaledVector(
            delta.subVectors(destination, handle),
            6 * remaining * progress,
          )
          .normalize();
        plane.lookAt(look.copy(plane.position).add(direction));
        plane.rotateY(Math.PI);
        plane.rotateZ(-0.24 * remaining);
        plane.rotateX(0.16);
        plane.quaternion.slerp(
          flightRotation,
          T.MathUtils.smoothstep(progress, 0.35, 1),
        );
      }
    },
    draw() {
      if (!active || !context || !canvas) return;
      const fade =
        revealTime === null
          ? 0
          : T.MathUtils.smoothstep(revealTime / REVEAL_DURATION, 0.15, 0.9);
      if (fade >= 1) {
        removeOverlay();
        return;
      }
      // Keep this tiny raster layer aligned with the same projected mesh below
      // the veil. Six depth-sorted triangles reproduce its custom paper shader.
      mesh.updateWorldMatrix(true, false);
      center.copy(plane.position).project(camera);
      const centerX = bounds.left + ((center.x + 1) * bounds.width) / 2;
      const centerY = bounds.top + ((1 - center.y) * bounds.height) / 2;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, size, size);
      for (const triangle of triangles) {
        triangle.depth = 0;
        for (let corner = 0; corner < 3; corner++) {
          vertex
            .fromBufferAttribute(positions, triangle.index * 3 + corner)
            .applyMatrix4(mesh.matrixWorld);
          delta.copy(vertex).applyMatrix4(camera.matrixWorldInverse);
          triangle.depth += delta.z / 3;
          vertex.project(camera);
          const point = triangle.points[corner];
          point.x = ((vertex.x - center.x) * bounds.width) / 2 + size / 2;
          point.y = ((center.y - vertex.y) * bounds.height) / 2 + size / 2;
        }
        const [a, b, c] = triangle.points;
        triangle.front =
          (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0;
        normal
          .fromBufferAttribute(normals, triangle.index * 3)
          .transformDirection(mesh.matrixWorld)
          .multiplyScalar(triangle.front ? 1 : -1);
        const shade =
          (0.68 + 0.32 * Math.max(normal.dot(light), 0)) *
          shades.getX(triangle.index * 3);
        const paper = triangle.front ? [0.94, 0.89, 0.76] : [0.46, 0.6, 0.46];
        triangle.color = `rgb(${paper.map((channel) => channel * shade * 255).join(" ")})`;
      }
      triangles.sort((a, b) => a.depth - b.depth);
      for (const triangle of triangles) {
        context.beginPath();
        triangle.points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
        context.fillStyle = triangle.color;
        context.fill();
      }
      canvas.style.transform = `translate3d(${centerX - size / 2}px, ${centerY - size / 2}px, 0)`;
      canvas.style.opacity = String(1 - fade);
      canvas.style.filter = fade > 0 ? `blur(${fade * 1.1}px)` : "none";
    },
    dispose: cancel,
  };
}
