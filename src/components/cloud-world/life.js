export function createSkyLife(T, scene) {
  const geometry = new T.InstancedBufferGeometry();
  // Curved wings and a body silhouette, with the tips free to bend in flight.
  geometry.setAttribute(
    "position",
    new T.Float32BufferAttribute(
      [
        0, 0, -0.22, -0.35, 0.06, -0.12, -0.3, 0, 0.19, -0.35, 0.06, -0.12,
        -0.83, 0.02, 0.17, -0.3, 0, 0.19, 0, 0, -0.22, 0.3, 0, 0.19, 0.35, 0.06,
        -0.12, 0.35, 0.06, -0.12, 0.3, 0, 0.19, 0.83, 0.02, 0.17, -0.055, 0,
        -0.31, 0.055, 0, -0.31, 0, 0, 0.35,
      ],
      3,
    ),
  );
  geometry.setAttribute(
    "aOffset",
    new T.InstancedBufferAttribute(
      new Float32Array([
        0, 0, 0, -1.15, 0.2, -1.2, -2.6, 0.5, -2.3, -1.6, -0.3, 1.5, -3.3, -0.1,
        2.8, -21, 1, -3, -22.7, 1.3, -4.2, -23.8, 0.7, -2,
      ]),
      3,
    ),
  );
  geometry.instanceCount = 8;
  const material = new T.ShaderMaterial({
    side: T.DoubleSide,
    toneMapped: false,
    uniforms: { uTime: { value: 0 }, uMobile: { value: 0 } },
    vertexShader: `
      attribute vec3 aOffset;uniform float uTime;uniform float uMobile;
      varying float vLight;
      void main(){
        float phase=aOffset.x*1.8+aOffset.z;
        float effort=smoothstep(.15,.65,sin(uTime*.62+phase));
        vec3 p=position;
        p.y+=pow(abs(p.x),1.3)*(.12+sin(uTime*10.+phase)*effort*.45);
        float bank=.32+sin(uTime*.4+phase)*.12;
        p.yz=mat2(cos(bank),-sin(bank),sin(bank),cos(bank))*p.yz;
        p*=.47;
        vec3 formation=aOffset;
        formation.y+=sin(uTime*.3+phase)*.13;
        float flight=mod(uTime*.85+12.,88.)-34.;
        p+=formation+vec3(flight,6.3+sin(uTime*.13)*.65+uMobile*4.,-30.+sin(uTime*.07)*3.);
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
        vLight=.76+.24*abs(sin(uTime*10.+phase));
      }`,
    fragmentShader: `varying float vLight;void main(){gl_FragColor=vec4(vec3(.31,.37,.43)*vLight,1.);}`,
  });
  const flock = new T.Mesh(geometry, material);
  flock.frustumCulled = false;
  scene.add(flock);
  return {
    setMobile(value) {
      material.uniforms.uMobile.value = value ? 1 : 0;
    },
    update(time) {
      material.uniforms.uTime.value = time;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      scene.remove(flock);
    },
  };
}
