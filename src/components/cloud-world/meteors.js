export function createMeteors(T, scene) {
  const geometry = new T.PlaneGeometry(1, 1);
  const specs = [
    {
      period: 4.05,
      offset: 3.1,
      duration: 2.7,
      x: 14,
      y: 10,
      z: -26,
      dx: -14,
      dy: -6,
      length: 4.5,
      width: 0.18,
    },
    {
      period: 6.35,
      offset: 3.75,
      duration: 3.6,
      x: -5,
      y: 12,
      z: -39,
      dx: -19,
      dy: -8,
      length: 6,
      width: 0.12,
    },
    {
      period: 9.65,
      offset: 5.5,
      duration: 4.2,
      x: 23,
      y: 14,
      z: -34,
      dx: -22,
      dy: -12,
      length: 7,
      width: 0.28,
    },
  ];
  specs.push(
    {
      period: 13.7,
      offset: 11.4,
      duration: 4.6,
      x: 15,
      y: 15,
      z: -42,
      dx: -24,
      dy: -9,
      length: 6.8,
      width: 0.32,
      fireball: true,
    },
    {
      period: 9.65,
      offset: 5.325,
      duration: 3.8,
      x: 20,
      y: 13,
      z: -40,
      dx: -21,
      dy: -11,
      length: 4.4,
      width: 0.14,
    },
    {
      period: 9.65,
      offset: 5.05,
      duration: 2.9,
      x: 23,
      y: 12,
      z: -45,
      dx: -19,
      dy: -10,
      length: 3.2,
      width: 0.12,
    },
  );
  const meteors = specs.map((spec) => {
    const material = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      uniforms: { uOpacity: { value: 0 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uOpacity;void main(){float line=exp(-pow((vUv.y-.5)*22.,2.));float halo=exp(-pow((vUv.y-.5)*7.,2.))*.18;float tail=pow(vUv.x,2.8);vec3 color=mix(vec3(.55,.68,1.),vec3(1.,.94,.77),vUv.x);gl_FragColor=vec4(color,(line+halo)*tail*uOpacity);}`,
    });
    const mesh = new T.Mesh(geometry, material);
    mesh.renderOrder = 5;
    mesh.rotation.z = Math.atan2(spec.dy, spec.dx);
    mesh.scale.set(spec.length, spec.width, 1);
    scene.add(mesh);
    const headMaterial = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      blending: T.AdditiveBlending,
      uniforms: { uOpacity: { value: 0 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uOpacity;void main(){float r=length(vUv-.5)*2.;float core=exp(-r*r*80.);float glow=exp(-r*r*7.)*.22;gl_FragColor=vec4(mix(vec3(.55,.88,.67),vec3(1.,.96,.8),core), (core+glow)*uOpacity);}`,
    });
    const head = new T.Mesh(geometry, headMaterial);
    head.scale.setScalar(spec.width * (spec.fireball ? 6 : 3));
    head.renderOrder = 6;
    scene.add(head);
    let wake = null;
    if (spec.fireball) {
      const wakeMaterial = new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        uniforms: { uProgress: { value: 0 } },
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec2 vUv;uniform float uProgress;void main(){float age=uProgress-vUv.x;if(age<0.)discard;float center=.5+sin(vUv.x*24.+age)*min(age,.5)*.12;float width=mix(30.,7.,min(age,1.));float wisp=exp(-pow((vUv.y-center)*width,2.));float fade=exp(-age*3.8)*(1.-smoothstep(1.,1.7,uProgress))*smoothstep(0.,.08,vUv.x);gl_FragColor=vec4(.46,.72,.65,wisp*fade*.24);}`,
      });
      wake = new T.Mesh(geometry, wakeMaterial);
      wake.rotation.z = mesh.rotation.z;
      wake.scale.set(Math.hypot(spec.dx, spec.dy), 0.75, 1);
      wake.renderOrder = 4;
      scene.add(wake);
    }
    return { mesh, material, head, headMaterial, wake, ...spec };
  });
  return {
    streaks: meteors.map(({ mesh, head }) => ({ mesh, head })),
    update(time) {
      for (const meteor of meteors) {
        const phase = (time + meteor.offset) % meteor.period,
          progress = phase / meteor.duration;
        meteor.mesh.visible = progress < 1;
        meteor.head.visible = meteor.mesh.visible;
        const cycle = Math.floor((time + meteor.offset) / meteor.period);
        const directionLength = Math.hypot(meteor.dx, meteor.dy);
        const tipX = (meteor.dx / directionLength) * meteor.length * 0.5;
        const tipY = (meteor.dy / directionLength) * meteor.length * 0.5;
        if (meteor.wake) {
          meteor.wake.visible = progress < 1.7;
          meteor.wake.position.set(
            meteor.x + meteor.dx * 0.5 + tipX - (cycle % 3) * 2,
            meteor.y + meteor.dy * 0.5 + tipY,
            meteor.z,
          );
          meteor.wake.material.uniforms.uProgress.value = progress;
        }
        if (!meteor.mesh.visible) continue;
        meteor.mesh.position.set(
          meteor.x + meteor.dx * progress - (cycle % 3) * 2,
          meteor.y + meteor.dy * progress,
          meteor.z,
        );
        meteor.material.uniforms.uOpacity.value =
          Math.sin(progress * Math.PI) * 0.85;
        meteor.head.position.copy(meteor.mesh.position);
        meteor.head.position.x += tipX;
        meteor.head.position.y += tipY;
        meteor.headMaterial.uniforms.uOpacity.value =
          Math.sin(progress * Math.PI) * (meteor.fireball ? 1.25 : 0.65);
      }
    },
    dispose() {
      geometry.dispose();
      meteors.forEach(({ mesh, material, head, headMaterial, wake }) => {
        scene.remove(mesh);
        scene.remove(head);
        material.dispose();
        headMaterial.dispose();
        if (wake) {
          scene.remove(wake);
          wake.material.dispose();
        }
      });
    },
  };
}
