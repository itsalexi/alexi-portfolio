import { screenVertex } from "./shaders";

export const CLOUD_VOLUME = {
  url: "/clouds/volume.rgba.gz",
  width: 192,
  height: 80,
  depth: 144,
};

export function createCloudVolume(T, data) {
  // Keep a conservative ceiling for the occupied density, including the
  // texture's linear-filter footprint and the animated vertical displacement.
  let topLayer = CLOUD_VOLUME.height - 1;
  densityBounds: for (; topLayer >= 0; topLayer--) {
    for (let z = 0; z < CLOUD_VOLUME.depth; z++) {
      const row = (z * CLOUD_VOLUME.height + topLayer) * CLOUD_VOLUME.width;
      for (let x = 0; x < CLOUD_VOLUME.width; x++) {
        if (data[(row + x) * 4] > 0) break densityBounds;
      }
    }
  }
  const densityCeiling =
    -30 + ((topLayer + 1.5) / CLOUD_VOLUME.height) * 36 + 0.241;
  const volume = new T.Data3DTexture(
    data,
    CLOUD_VOLUME.width,
    CLOUD_VOLUME.height,
    CLOUD_VOLUME.depth,
  );
  volume.format = T.RGBAFormat;
  volume.minFilter = volume.magFilter = T.LinearFilter;
  volume.needsUpdate = true;
  const worldTarget = new T.WebGLRenderTarget(1, 1);
  worldTarget.depthTexture = new T.DepthTexture(1, 1);
  const cloudTarget = new T.WebGLRenderTarget(1, 1, { depthBuffer: false });
  const geometry = new T.PlaneGeometry(2, 2);
  const uniforms = {
    uVolume: { value: volume },
    uDepth: { value: worldTarget.depthTexture },
    uTime: { value: 0 },
    uVisibleRange: { value: new T.Vector2(0, 1) },
    uDensityCeiling: { value: densityCeiling },
    uOffset: { value: 0 },
    uInverseProjection: { value: new T.Matrix4() },
    uWorld: { value: new T.Matrix4() },
  };
  const material = new T.ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    glslVersion: T.GLSL3,
    vertexShader: `out vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader: `
      precision highp float; precision highp sampler3D;
      in vec2 vUv; out vec4 outColor;
      uniform sampler3D uVolume; uniform sampler2D uDepth;
      uniform mat4 uInverseProjection; uniform mat4 uWorld;
      uniform float uTime; uniform float uOffset; uniform float uDensityCeiling;
      uniform vec2 uVisibleRange;
      void main(){
        // The sticky stage can extend beyond the viewport. Leave two source
        // texels around the visible area so the composite still filters cleanly.
        if(vUv.y < uVisibleRange.x || vUv.y > uVisibleRange.y){outColor=vec4(0.);return;}
        vec4 v = uInverseProjection * vec4(vUv*2.-1.,1.,1.);
        vec3 rd = normalize(mat3(uWorld)*v.xyz);
        vec3 ro = uWorld[3].xyz;
        float ceiling=uDensityCeiling+uOffset;
        if(ro.y>ceiling && rd.y>=0.){outColor=vec4(0.);return;}
        vec3 minimum=vec3(-52.,-30.+uOffset,-78.), maximum=vec3(52.,6.+uOffset,6.);
        vec3 a=(minimum-ro)/rd, b=(maximum-ro)/rd;
        vec3 nearHit=min(a,b), farHit=max(a,b);
        float entry=max(max(nearHit.x,nearHit.y),max(nearHit.z,0.));
        float exitDistance=min(min(farHit.x,farHit.y),farHit.z);
        float depth=texture(uDepth,vUv).r;
        if(depth<.99999){
          vec4 point=uInverseProjection*vec4(vUv*2.-1.,depth*2.-1.,1.);
          exitDistance=min(exitDistance,length(point.xyz/point.w));
        }
        if(exitDistance<=entry){outColor=vec4(0.);return;}
        float stepSize=(exitDistance-entry)/80.;
        float jitter=.5+.12*(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5);
        float distance=entry+stepSize*jitter;
        // Skip only known-empty air. Keep the original 80-step spacing and
        // jitter, plus one boundary sample, so cloud detail does not change.
        int firstSample=0, lastSample=80;
        if(rd.y<0.){
          firstSample=int(clamp(floor(((ceiling-ro.y)/rd.y-distance)/stepSize),0.,80.));
        }else if(rd.y>0.){
          lastSample=int(clamp(ceil(((ceiling-ro.y)/rd.y-distance)/stepSize)+1.,0.,80.));
        }
        distance+=float(firstSample)*stepSize;
        vec3 color=vec3(0.); float transmittance=1.;
        float hazeTransmission=exp((15.-distance)*.009);
        float hazeDecay=exp(-stepSize*.009);
        for(int i=firstSample;i<lastSample;i++){
          if(transmittance<.015) break;
          vec3 p=ro+rd*distance;
          p.x+=sin(uTime*.045)*3.4+sin(p.z*.17+uTime*.13)*.7;
          p.y+=sin(p.x*.23+p.z*.11+uTime*.19)*.24;
          p.z+=sin(p.x*.15+uTime*.08)*.5;
          vec3 uv=(p-minimum)/vec3(104.,36.,84.);
          vec3 cloud=texture(uVolume,clamp(uv,0.,1.)).rgb;
          if(cloud.r>.004){
            float alpha=1.-exp(-cloud.r*stepSize*.92);
            vec3 light=vec3(.065,.105,.18)+cloud.g*vec3(.61,.60,.54)+cloud.b*vec3(.12,.15,.19);
            float haze=1.-min(1.,hazeTransmission);
            light=mix(light,vec3(.25,.32,.43),haze*.6);
            color+=transmittance*alpha*light;
            transmittance*=1.-alpha;
          }
          distance+=stepSize;
          hazeTransmission*=hazeDecay;
        }
        outColor=vec4(color,1.-transmittance);
      }`,
  });
  const cloudScene = new T.Scene();
  cloudScene.add(new T.Mesh(geometry, material));
  const compositeMaterial = new T.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uWorld: { value: worldTarget.texture },
      uCloud: { value: cloudTarget.texture },
    },
    vertexShader: screenVertex,
    fragmentShader: `varying vec2 vUv; uniform sampler2D uWorld;uniform sampler2D uCloud;void main(){vec4 cloud=texture2D(uCloud,vUv);vec3 world=texture2D(uWorld,vUv).rgb;gl_FragColor=vec4(world*(1.-cloud.a)+cloud.rgb,1.);}`,
  });
  const compositeScene = new T.Scene();
  compositeScene.add(new T.Mesh(geometry, compositeMaterial));
  return {
    atmosphere: {
      density: volume,
      offset: uniforms.uOffset,
      depth: worldTarget.depthTexture,
      resolution: new T.Vector2(),
    },
    setVisibleRange(top, height, viewportHeight) {
      const padding = 2 / cloudTarget.height;
      // Keep extra sky ready for compositor scrolling and the page entrance.
      const motionPadding = 96 / height;
      // CSS masks the bottom 6% of the scene completely.
      const minimum = Math.max(
        0,
        0.06 - padding,
        1 - (viewportHeight - top) / height - padding - motionPadding,
      );
      const maximum = Math.min(1, 1 + top / height + padding + motionPadding);
      const range = uniforms.uVisibleRange.value;
      if (range.x === minimum && range.y === maximum) return false;
      range.set(minimum, maximum);
      return true;
    },
    resize(width, height, pixelRatio = 1) {
      worldTarget.setSize(
        Math.round(width * pixelRatio),
        Math.round(height * pixelRatio),
      );
      this.atmosphere.resolution.set(worldTarget.width, worldTarget.height);
      const ratio = Math.min(0.6, Math.sqrt(210000 / (width * height)));
      cloudTarget.setSize(Math.ceil(width * ratio), Math.ceil(height * ratio));
      uniforms.uOffset.value = width < 760 ? -2.3 : 0;
    },
    render(renderer, sky, screenCamera, scene, camera, time, foreground) {
      uniforms.uTime.value = time;
      uniforms.uInverseProjection.value.copy(camera.projectionMatrixInverse);
      uniforms.uWorld.value.copy(camera.matrixWorld);
      renderer.setRenderTarget(worldTarget);
      renderer.clear();
      renderer.render(sky, screenCamera);
      renderer.clearDepth();
      renderer.render(scene, camera);
      renderer.setRenderTarget(cloudTarget);
      renderer.clear();
      renderer.render(cloudScene, screenCamera);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(compositeScene, screenCamera);
      if (foreground) renderer.render(foreground, camera);
    },
    dispose() {
      volume.dispose();
      worldTarget.dispose();
      cloudTarget.dispose();
      geometry.dispose();
      material.dispose();
      compositeMaterial.dispose();
    },
  };
}
