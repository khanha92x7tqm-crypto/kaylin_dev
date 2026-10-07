(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40645,e=>{"use strict";var o=e.i(43476),t=e.i(71645),i=e.i(90072),a=e.i(75056),s=e.i(94800),n=e.i(48546),r=e.i(18443);let l=`
uniform float uTime;
uniform float uMode; // 0=tactical, 1=neural, 2=quantum
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;

  if (uMode > 1.5) {
    float wave = sin(uTime * 2.0 + pos.y * 0.5) * 0.5 + 0.5;
    pos += normal * wave * 0.3;
  } else {
    pos.z += sin(uTime * 1.1 + pos.y * 0.15) * 0.035;
  }

  vPosition = pos;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.5 + 1.8 * step(1.5, uMode)) * (20.0 / -mv.z);
}
`,c=`
uniform float uTime;
uniform float uMode;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 norm = normalize(vNormal);
  vec3 viewDir = vec3(0.0, 0.0, 1.0);

  float x = vPosition.x;
  float y = vPosition.y;
  float z = vPosition.z;
  float ax = abs(x);

  // 1. Authentic Porcelain Palette
  vec3 porcelain = vec3(0.96, 0.96, 0.97);
  vec3 darkFeature = vec3(0.04, 0.04, 0.05); // Jet-black
  vec3 lipTone = vec3(0.12, 0.12, 0.14);
  vec3 blushTone = vec3(0.93, 0.86, 0.89);

  vec3 col = porcelain;

  // Front face features (z > -1.2)
  if (z > -1.2) {
    // Mustache: starts at center y = -3.15, curls upwards to y = -1.2 at ax = 4.8
    float mY = -3.15 + 0.08 * ax + 0.08 * ax * ax;
    float mDist = abs(y - mY);
    float mThick = smoothstep(5.0, 0.3, ax) * 0.34 + 0.06;
    float inMustache = smoothstep(mThick, mThick - 0.08, mDist) * smoothstep(5.0, 4.4, ax) * step(0.12, ax);

    // Chin Goatee: Soul patch below lip + vertical tapered strip on chin
    float inSoulPatch = smoothstep(0.35, 0.25, ax) * smoothstep(-5.6, -5.8, y) * smoothstep(-6.6, -6.4, y);
    float gWidth = mix(0.55, 0.18, clamp((y - (-7.0)) / (-2.8), 0.0, 1.0));
    float inChinBeard = smoothstep(gWidth, gWidth - 0.08, ax) * smoothstep(-6.8, -7.1, y) * smoothstep(-10.0, -9.6, y);
    float inGoatee = max(inSoulPatch, inChinBeard);

    // Arched Eyebrows: High on the anatomical brow bone, sweeping above the eye sockets
    float browT = clamp((ax - 1.4) / 4.0, 0.0, 1.0);
    float browY = 6.35 + 0.85 * sin(browT * 3.14159) - 0.25 * browT;
    float browDist = abs(y - browY);
    float browThick = 0.18 * sin(browT * 3.14159) + 0.06;
    float inBrow = smoothstep(browThick, browThick - 0.06, browDist) * smoothstep(1.3, 1.6, ax) * smoothstep(5.6, 5.1, ax);

    // Curved Smile Lips:
    float lY = -4.75 + 0.075 * ax * ax;
    float inLips = smoothstep(0.20, 0.08, abs(y - lY)) * smoothstep(3.6, 3.1, ax);

    // Subtle Cheek Blush on cheekbones:
    float cheekD = length(vec2((ax - 4.2) / 1.6, (y - 0.9) / 1.3));
    float inCheek = smoothstep(1.1, 0.2, cheekD) * 0.35;

    // Composite facial features
    col = mix(col, blushTone, inCheek);
    col = mix(col, lipTone, inLips);
    col = mix(col, darkFeature, max(max(inMustache, inGoatee), inBrow));
  }

  // 2. Controlled Studio Lighting
  vec3 keyLight = normalize(vec3(0.35, 0.75, 0.9));
  vec3 fillLight = normalize(vec3(-0.5, -0.2, 0.5));
  float diff1 = max(dot(norm, keyLight), 0.0);
  float diff2 = max(dot(norm, fillLight), 0.0);

  vec3 halfVec = normalize(keyLight + viewDir);
  float spec = pow(max(dot(norm, halfVec), 0.0), 32.0) * 0.25;

  col = col * (0.64 + 0.36 * diff1 + 0.15 * diff2) + vec3(spec);

  // Subtle silver fresnel rim
  float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 2.8);
  col += vec3(0.95, 0.96, 1.0) * fresnel * 0.3;

  float alpha = 1.0;

  // Mode 1: Neural X-Ray
  if (uMode > 0.5 && uMode < 1.5) {
    col = mix(vec3(0.08, 0.09, 0.12), vec3(0.95, 0.96, 1.0), fresnel * 1.5);
    alpha = 0.92;
  }
  // Mode 2: Quantum Atom
  else if (uMode > 1.5) {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    col = vec3(0.95, 0.96, 1.0) + vec3(0.35) * smoothstep(0.25, 0.0, d);
    alpha = (1.0 - d * 2.0) * 0.85;
  }

  gl_FragColor = vec4(col, alpha);
}
`;function m({mode:e}){let a=(0,t.useRef)(null),h=(0,t.useRef)(null),f=(0,t.useRef)(null),d=(0,r.useAnonymousModel)(),{pointer:u}=(0,n.useThree)(),p=(0,t.useMemo)(()=>({uTime:{value:0},uMode:{value:0}}),[]);return((0,t.useEffect)(()=>{p.uMode.value="tactical"===e?0:"neural"===e?1:2},[e,p]),(0,s.useFrame)((e,o)=>{let t=e.clock.elapsedTime;p.uTime.value=t;let i=a.current;if(i){let e=.28*u.x+.025*Math.sin(.3*t),a=-(.15*u.y)+.02*Math.cos(.4*t);i.rotation.y+=(e-i.rotation.y)*Math.min(1,4*o),i.rotation.x+=(a-i.rotation.x)*Math.min(1,4*o),i.position.y=.04*Math.sin(.8*t)}f.current&&(f.current.rotation.z=.04*t)}),d)?(0,o.jsxs)("group",{ref:a,children:[(0,o.jsxs)("group",{position:[0,0,-.6],children:[(0,o.jsxs)("mesh",{ref:f,children:[(0,o.jsx)("torusGeometry",{args:[1.75,.003,4,180]}),(0,o.jsx)("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.14})]}),(0,o.jsxs)("mesh",{rotation:[0,0,Math.PI/4],children:[(0,o.jsx)("torusGeometry",{args:[1.9,.0015,4,180]}),(0,o.jsx)("meshBasicMaterial",{color:"#71717a",transparent:!0,opacity:.08})]})]}),(0,o.jsx)("group",{scale:[.115,.115,.115],position:[0,-.05,0],children:"quantum"===e?(0,o.jsx)("points",{geometry:d.particleGeometry,children:(0,o.jsx)("shaderMaterial",{vertexShader:l,fragmentShader:c,uniforms:p,transparent:!0,depthWrite:!1,blending:i.AdditiveBlending})}):(0,o.jsx)("mesh",{ref:h,geometry:d.geometry,children:(0,o.jsx)("shaderMaterial",{vertexShader:l,fragmentShader:c,uniforms:p,transparent:"neural"===e,wireframe:"neural"===e,side:i.DoubleSide})})})]}):null}e.s(["default",0,function({className:e=""}){return(0,o.jsxs)("div",{className:`relative w-full h-[520px] lg:h-[600px] rounded-lg overflow-hidden bg-[#060709] border border-white/10 ${e}`,children:[(0,o.jsxs)(a.Canvas,{dpr:[1,1.6],camera:{position:[0,0,4.6],fov:38,near:.1,far:30},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance"},style:{position:"absolute",inset:0},children:[(0,o.jsx)("color",{attach:"background",args:["#060709"]}),(0,o.jsx)("ambientLight",{intensity:.65}),(0,o.jsx)("directionalLight",{position:[2,3,4],intensity:1.1,color:"#ffffff"}),(0,o.jsx)("directionalLight",{position:[-2,-1,3],intensity:.4,color:"#94a3b8"}),(0,o.jsx)("pointLight",{position:[0,4,1],intensity:.6,color:"#ffffff",distance:8}),(0,o.jsx)(m,{mode:"tactical"})]}),(0,o.jsxs)("div",{className:"absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-end justify-between pointer-events-none gap-2",children:[(0,o.jsxs)("div",{className:"panel px-3 py-2 rounded text-[10px] text-zinc-400 tracking-wider font-mono",children:[(0,o.jsx)("div",{children:"MODEL: GUY FAWKES · 5,301 FACETS"}),(0,o.jsx)("div",{className:"text-zinc-500",children:"PORCELAIN // STEALTH MONOCHROME"})]}),(0,o.jsxs)("div",{className:"panel px-3 py-2 rounded text-[10px] text-right text-zinc-400 tracking-wider font-mono",children:[(0,o.jsx)("span",{className:"text-white",children:"INTERACTIVE PARALLAX"}),(0,o.jsx)("div",{className:"text-zinc-500",children:"CURSOR TRACKING ACTIVE"})]})]})]})}])},40052,function(e){e.n(e.i(40645))}]);