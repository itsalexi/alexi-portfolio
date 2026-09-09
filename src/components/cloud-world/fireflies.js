export function createFireflies(T, atmosphere) {
  const scene = new T.Scene();
  const geometry = new T.InstancedBufferGeometry();
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.setAttribute(
    "position",
    new T.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3),
  );
  const anchors = [
    [-9, -1.1, -9],
    [8.5, 1.2, -15],
    [-1, -1.8, -26],
  ];
  const offsets = [];
  const seeds = [];
  let seed = 421;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 66; i++) {
    const anchor = anchors[i % anchors.length];
    offsets.push(
      anchor[0] + (random() - 0.5) * 9,
      anchor[1] + (random() - 0.5) * 4.4,
      anchor[2] + (random() - 0.5) * 9,
    );
    seeds.push(random() * Math.PI * 2, random(), random(), random());
  }
  geometry.setAttribute(
    "aOffset",
    new T.InstancedBufferAttribute(new Float32Array(offsets), 3),
  );
  geometry.setAttribute(
    "aSeed",
    new T.InstancedBufferAttribute(new Float32Array(seeds), 4),
  );
  geometry.instanceCount = 66;
  const material = new T.ShaderMaterial({
    glslVersion: T.GLSL3,
    transparent: true,
    blending: T.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uMobile: { value: 0 },
      uVolume: { value: atmosphere.density },
      uOffset: atmosphere.offset,
      uDepth: { value: atmosphere.depth },
      uResolution: { value: atmosphere.resolution },
    },
    vertexShader: `
      precision highp sampler3D;
      in vec3 aOffset; in vec4 aSeed;
      uniform float uTime, uMobile, uOffset;
      uniform sampler3D uVolume;
      out vec2 vPoint;
      out vec3 vColor;
      out float vGlow;
      void main() {
        float t = uTime * (.22 + aSeed.y * .16);
        float phase = aSeed.x;
        vec3 center = aOffset;
        center.x *= 1. - uMobile * .55;
        center += vec3(
          sin(t + phase) * 1.25 + sin(t * .43 + phase * 2.) * .4,
          sin(t * .73 + phase * 1.8) * .65 + sin(t * 1.9 + phase) * .13,
          cos(t * .67 + phase) * 1.15
        );

        // Sample the same moving density field as the clouds. Each light dims
        // inside mist, even though the little light cores render at full resolution.
        vec3 ray = center - cameraPosition;
        float stepLength = length(ray) / 16.;
        float opticalDepth = 0.;
        for (int i = 0; i < 16; i++) {
          vec3 p = cameraPosition + ray * ((float(i) + .5) / 16.);
          p.x += sin(uTime * .045) * 3.4 + sin(p.z * .17 + uTime * .13) * .7;
          p.y += sin(p.x * .23 + p.z * .11 + uTime * .19) * .24;
          p.z += sin(p.x * .15 + uTime * .08) * .5;
          vec3 uv = (p - vec3(-52., -30. + uOffset, -78.)) / vec3(104., 36., 84.);
          if (all(greaterThan(uv, vec3(0.))) && all(lessThan(uv, vec3(1.)))) {
            opticalDepth += texture(uVolume, uv).r * stepLength * .92;
          }
        }
        float pulse = pow(.5 + .5 * sin(uTime * (.72 + aSeed.z * .7) + phase), 4.);
        vGlow = (.16 + pulse * .94) * exp(-opticalDepth);
        vColor = mix(vec3(.64, .94, .29), vec3(1., .76, .3), smoothstep(.35, .7, aSeed.w));
        vec4 view = modelViewMatrix * vec4(center, 1.);
        float radius = .16 + aSeed.y * .18;
        view.xy += position.xy * radius;
        vPoint = position.xy;
        gl_Position = projectionMatrix * view;
      }`,
    fragmentShader: `
      uniform sampler2D uDepth;
      uniform vec2 uResolution;
      in vec2 vPoint;
      in vec3 vColor;
      in float vGlow;
      out vec4 outColor;
      void main() {
        float r2 = dot(vPoint, vPoint);
        if (r2 > 1. || gl_FragCoord.z > texture(uDepth, gl_FragCoord.xy / uResolution).r + .00001) discard;
        float core = exp(-r2 * 90.);
        float halo = exp(-r2 * 6.) * (1. - smoothstep(.65, 1., r2));
        outColor = vec4(mix(vColor, vec3(1., 1., .73), core * .35), (core * .95 + halo * .2) * vGlow);
      }`,
  });
  const swarm = new T.Mesh(geometry, material);
  swarm.frustumCulled = false;
  scene.add(swarm);
  return {
    scene,
    setMobile(value) {
      geometry.instanceCount = value ? 45 : 66;
      material.uniforms.uMobile.value = value ? 1 : 0;
    },
    update(time) {
      material.uniforms.uTime.value = time;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      scene.remove(swarm);
    },
  };
}
