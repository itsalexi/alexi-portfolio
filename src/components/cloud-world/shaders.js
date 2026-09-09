export const screenVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

export const skyFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec2 uParallax;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float cloudNoise(vec2 p) {
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);
}
vec3 skyColor(vec3 rd) {
  vec3 sky = mix(vec3(.19, .28, .46), vec3(.045, .075, .145), pow(vUv.y, .72));
  float horizon = exp(-pow((vUv.y - .39) * 5., 2.));
  sky += vec3(.16, .085, .055) * horizon * smoothstep(.3, 1., vUv.x);
  vec2 distantUv = vUv + uParallax;
  vec2 starCell = floor(distantUv * vec2(105., 65.));
  vec2 starOffset = fract(distantUv * vec2(105., 65.)) - .5;
  float seed = hash(starCell);
  float star = exp(-dot(starOffset, starOffset) * 130.) * step(.988, seed)
    * smoothstep(.45, .8, vUv.y);
  sky += vec3(.78, .66, .42) * star * (.45 + .2 * sin(uTime * .4 + seed * 70.));
  vec2 moonP = (distantUv - vec2(.84, .79)) * vec2(uAspect, 1.);
  float moonDistance = length(moonP);
  float moonAA = fwidth(moonDistance) * .8;
  float moon = 1. - smoothstep(.023 - moonAA, .023 + moonAA, moonDistance);
  float shadowDistance = length(moonP - vec2(-.012, .006));
  float shadowAA = fwidth(shadowDistance) * .8;
  moon *= smoothstep(.023 - shadowAA, .023 + shadowAA, shadowDistance);
  sky += vec3(.9, .7, .4) * moon;
  sky += vec3(.18, .10, .04) * exp(-length(moonP) * 65.);
  if(vUv.x>.6 && vUv.y>.67){
    vec2 p=vec2(vUv.x*8.-uTime*.012,vUv.y*63.);
    float wisps=cloudNoise(p)*.65+cloudNoise(p*2.07)*.35;
    float band=exp(-pow((vUv.y-.79-sin(vUv.x*12.+uTime*.025)*.015)/.035,2.));
    float veil=smoothstep(.48,.74,wisps)*band*smoothstep(.6,.88,vUv.x)*.12;
    sky=mix(sky,vec3(.3,.35,.43),veil);
  }
  return sky;
}
void main() {
  vec3 sky = skyColor(vec3(0.));
  sky += (hash(gl_FragCoord.xy + 19.) - .5) / 255.;
  gl_FragColor = vec4(sky, 1.);
}`;
