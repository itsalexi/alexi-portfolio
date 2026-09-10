import { createMeteors } from "./meteors";

export function createSkyDetails(T, scene) {
  const geometries = [];
  const materials = [];
  const plane = new T.Group();
  scene.add(plane);
  const faces = [
    [0, 0.04, -1, -0.91, 0.08, 0.66, -0.16, 0.04, 0.39],
    [0, 0.04, -1, 0.16, 0.04, 0.39, 0.91, 0.08, 0.66],
    [0, 0.04, -1, -0.16, 0.04, 0.39, 0, -0.23, 0.56],
    [0, 0.04, -1, 0, -0.23, 0.56, 0.16, 0.04, 0.39],
    [-0.91, 0.08, 0.66, -0.87, 0.19, 0.49, 0, 0.04, -1],
    [0.91, 0.08, 0.66, 0, 0.04, -1, 0.87, 0.19, 0.49],
  ];
  const geometry = new T.BufferGeometry();
  geometry.setAttribute(
    "position",
    new T.Float32BufferAttribute(faces.flat(), 3),
  );
  geometry.setAttribute(
    "aShade",
    new T.Float32BufferAttribute(
      [1, 0.88, 0.69, 0.78, 0.91, 0.86].flatMap((value) => [
        value,
        value,
        value,
      ]),
      1,
    ),
  );
  geometry.computeVertexNormals();
  const material = new T.ShaderMaterial({
    side: T.DoubleSide,
    transparent: false,
    depthWrite: true,
    depthTest: true,
    toneMapped: false,
    vertexShader: `
      attribute float aShade; varying vec3 vNormal; varying float vShade;
      void main(){
        vNormal = normalize(mat3(modelMatrix) * normal); vShade = aShade;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.);
      }`,
    fragmentShader: `
      varying vec3 vNormal; varying float vShade;
      void main(){
        vec3 n = normalize(vNormal) * (gl_FrontFacing ? 1. : -1.);
        float light = max(dot(n, normalize(vec3(.5,.8,.3))),0.);
        vec3 paper = gl_FrontFacing ? vec3(.94,.89,.76) : vec3(.46,.60,.46);
        gl_FragColor = vec4(paper * (.68 + .32 * light) * vShade, 1.);
      }`,
  });
  geometries.push(geometry);
  materials.push(material);
  const foldedPaper = new T.Mesh(geometry, material);
  foldedPaper.renderOrder = 2;
  plane.add(foldedPaper);
  plane.scale.setScalar(0.72);
  const path = new T.CatmullRomCurve3(
    [
      new T.Vector3(3.6, 4, -3.2),
      new T.Vector3(7, 5.1, -10),
      new T.Vector3(12, 3.8, -24),
      new T.Vector3(7.7, -0.3, -18),
      new T.Vector3(5, -1, -10),
      new T.Vector3(3.8, 1.8, -4),
      new T.Vector3(2.8, 4, -2),
    ],
    true,
    "catmullrom",
    0.5,
  );
  const mobilePath = new T.CatmullRomCurve3(
    [
      new T.Vector3(-1.3, -1.8, -4),
      new T.Vector3(2, -2.2, -9),
      new T.Vector3(4, -3, -18),
      new T.Vector3(-2, -3.5, -15),
      new T.Vector3(-1.8, -1.6, -4),
    ],
    true,
    "catmullrom",
    0.5,
  );
  const tangent = new T.Vector3();
  const next = new T.Vector3();
  const look = new T.Vector3();
  const turn = new T.Vector3();
  const previousRotation = new T.Quaternion();
  const flightRotation = new T.Quaternion();
  const normalFlightRotation = new T.Quaternion();
  const meteors = createMeteors(T, scene);
  let mobile = false;
  let lastTime = null;
  return {
    plane,
    streaks: meteors.streaks,
    position: plane.position,
    setMobile(value) {
      mobile = value;
      plane.scale.setScalar(value ? 0.44 : 0.72);
    },
    update(time, journey = 0) {
      const firstFrame = lastTime === null;
      const dt = firstFrame
        ? 1 / 60
        : Math.max(0, Math.min(time - lastTime, 0.08));
      lastTime = time;
      const t = (time * 0.024 + 0.02) % 1;
      const flightPath = mobile ? mobilePath : path;
      flightPath.getPointAt(t, plane.position);
      plane.position.x = plane.position.x * (1 - journey * 0.3) - journey;
      plane.position.y -= journey * 3;
      plane.position.z -= journey * 10;
      flightPath.getTangentAt(t, tangent);
      flightPath.getTangentAt((t + 0.012) % 1, next);
      tangent.x *= 1 - journey * 0.3;
      next.x *= 1 - journey * 0.3;
      tangent.normalize();
      next.normalize();
      // Keep the underlying flight independent of the temporary entrance pose.
      previousRotation.copy(normalFlightRotation);
      plane.lookAt(look.copy(plane.position).add(tangent));
      plane.rotateY(Math.PI);
      // Bank into the actual turn, then ease the rotation through each bend.
      plane.rotateZ(
        T.MathUtils.clamp(turn.crossVectors(tangent, next).y * 7, -0.55, 0.55),
      );
      plane.rotateX(0.16);
      flightRotation.copy(plane.quaternion);
      if (!firstFrame) {
        plane.quaternion
          .copy(previousRotation)
          .slerp(flightRotation, 1 - Math.exp(-dt * 6));
      }
      normalFlightRotation.copy(plane.quaternion);
      meteors.update(time);
    },
    dispose() {
      geometries.forEach((g) => {
        g.dispose();
      });
      materials.forEach((m) => {
        m.dispose();
      });
      meteors.dispose();
      scene.remove(plane);
    },
  };
}
