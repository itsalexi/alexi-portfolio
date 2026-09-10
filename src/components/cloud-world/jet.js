export function createDistantJet(T, scene) {
  const jet = new T.Group();
  const bodyGeometry = new T.CapsuleGeometry(0.048, 0.72, 3, 8);
  bodyGeometry.rotateZ(-Math.PI / 2);
  const bodyMaterial = new T.MeshBasicMaterial({ color: 0xbac6d1 });
  jet.add(new T.Mesh(bodyGeometry, bodyMaterial));
  const wingGeometry = new T.BufferGeometry();
  wingGeometry.setAttribute(
    "position",
    new T.Float32BufferAttribute(
      [
        0.12, 0, 0, -0.2, 0, -0.48, -0.27, 0, -0.05, 0.12, 0, 0, -0.27, 0, 0.05,
        -0.2, 0, 0.48, -0.26, 0, 0, -0.4, 0, -0.2, -0.43, 0, 0, -0.26, 0, 0,
        -0.43, 0, 0, -0.4, 0, 0.2, -0.22, 0, 0, -0.42, 0.17, 0, -0.43, 0, 0,
      ],
      3,
    ),
  );
  const wingMaterial = new T.MeshBasicMaterial({
    color: 0x8e9eaf,
    side: T.DoubleSide,
  });
  jet.add(new T.Mesh(wingGeometry, wingMaterial));
  jet.rotation.x = 0.35;
  jet.scale.setScalar(0.85);
  scene.add(jet);
  const trailGeometry = new T.PlaneGeometry(19, 0.8, 48, 1);
  const trails = [-0.08, 0.08].map((offset) => {
    const material = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv;uniform float uTime;void main(){vUv=uv;vec3 p=position;float age=1.-uv.x;p.y*=mix(1.25,.12,uv.x);p.y+=sin(p.x*.37+uTime*.06)*age*.18+sin(p.x*1.1+uTime*.11)*age*age*.055;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uTime;void main(){float width=mix(4.,9.,vUv.x);float core=exp(-pow((vUv.y-.5)*width,2.));float breakup=.72+.28*sin(vUv.x*43.+uTime*.09)*sin(vUv.x*17.-uTime*.07);float fade=smoothstep(0.,.5,vUv.x)*(1.-smoothstep(.94,1.,vUv.x));gl_FragColor=vec4(.69,.77,.86,core*fade*mix(breakup,1.,vUv.x)*.24);}`,
    });
    const mesh = new T.Mesh(trailGeometry, material);
    mesh.renderOrder = 1;
    scene.add(mesh);
    return { mesh, material, offset };
  });
  return {
    jet,
    trails,
    trailOpacity: 0.24,
    update(time) {
      const x = ((time * 0.42 + 29) % 120) - 60;
      const y = 10.8 + Math.sin(time * 0.018) * 0.3;
      jet.position.set(x, y, -62);
      for (const trail of trails) {
        trail.mesh.position.set(x - 9.9, y + trail.offset, -62);
        trail.material.uniforms.uTime.value = time;
      }
    },
    dispose() {
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      wingGeometry.dispose();
      wingMaterial.dispose();
      trailGeometry.dispose();
      scene.remove(jet);
      for (const trail of trails) {
        trail.material.dispose();
        scene.remove(trail.mesh);
      }
    },
  };
}
