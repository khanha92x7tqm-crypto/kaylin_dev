(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,1624,e=>{"use strict";let t,r,i;var n=e.i(43476),s=e.i(71645),a=e.i(75056),o=e.i(90072),l=e.i(94800),u=e.i(48546);let c=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 curl(vec3 p){
  const float e=0.1;
  float n1,n2,a,b;
  n1=snoise(vec3(p.x,p.y+e,p.z)); n2=snoise(vec3(p.x,p.y-e,p.z)); a=(n1-n2)/(2.0*e);
  n1=snoise(vec3(p.x,p.y,p.z+e)); n2=snoise(vec3(p.x,p.y,p.z-e)); b=(n1-n2)/(2.0*e);
  float x=a-b;
  n1=snoise(vec3(p.x,p.y,p.z+e)); n2=snoise(vec3(p.x,p.y,p.z-e)); a=(n1-n2)/(2.0*e);
  n1=snoise(vec3(p.x+e,p.y,p.z)); n2=snoise(vec3(p.x-e,p.y,p.z)); b=(n1-n2)/(2.0*e);
  float y=a-b;
  n1=snoise(vec3(p.x+e,p.y,p.z)); n2=snoise(vec3(p.x-e,p.y,p.z)); a=(n1-n2)/(2.0*e);
  n1=snoise(vec3(p.x,p.y+e,p.z)); n2=snoise(vec3(p.x,p.y-e,p.z)); b=(n1-n2)/(2.0*e);
  float z=a-b;
  return normalize(vec3(x,y,z));
}
`;var h=e.i(55773),d=e.i(18443);let f=`
uniform float uTime;
uniform float uProgress;
uniform vec3 uMouse;
uniform float uHover;
uniform float uPixelRatio;
attribute vec3 aScatter;
attribute float aSize;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
${c}
void main() {
  float t = clamp(uProgress * 1.4 - aSeed * 0.4, 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  vec3 pos = mix(aScatter, position, t);

  // Gentle subtle drift
  vec3 n = curl(pos * 0.25 + uTime * 0.08 + aSeed);
  pos += n * (0.6 * (1.0 - t) + 0.02);
  pos.z += sin(uTime * 1.0 + aSeed * 10.0) * 0.03;

  // Cursor repulsion
  vec2 d = pos.xy - uMouse.xy;
  float dist = length(d);
  float f = smoothstep(5.0, 0.0, dist) * uHover * t;
  pos.xy += (d / max(dist, 0.001)) * f * 1.2;
  pos.z += f * 1.5;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float flick = 0.85 + 0.15 * sin(uTime * 3.0 + aSeed * 25.0);
  gl_PointSize = aSize * uPixelRatio * (16.0 / -mv.z) * flick * (1.0 + f * 0.8);
  
  vColor = vec3(0.92, 0.94, 0.98);
  vAlpha = (0.2 + 0.5 * t) * (0.5 + 0.5 * flick) * (0.4 + 0.6 * uHover);
}
`,p=`
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.1, d);
  float core = smoothstep(0.2, 0.0, d);
  gl_FragColor = vec4(vColor + core * 0.3, a * vAlpha * 0.7);
}
`,v=`
uniform float uTime;
uniform float uProgress;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,m=`
uniform float uTime;
uniform float uProgress;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 norm = normalize(vNormal);
  vec3 viewDir = vec3(0.0, 0.0, 1.0);

  float x = vPosition.x;
  float y = vPosition.y;
  float z = vPosition.z;
  float ax = abs(x);

  // 1. Luxury Porcelain Base Tone
  vec3 porcelain = vec3(0.96, 0.96, 0.97);
  vec3 darkFeature = vec3(0.04, 0.04, 0.05); // Jet-black
  vec3 lipTone = vec3(0.12, 0.12, 0.14);
  vec3 blushTone = vec3(0.93, 0.86, 0.89);

  vec3 col = porcelain;

  // Front face features
  if (z > -1.2) {
    // Mustache: starts at center y = -3.15, curves upwards to y = -1.2 at ax = 4.8
    float mY = -3.15 + 0.08 * ax + 0.075 * ax * ax;
    float mDist = abs(y - mY);
    float mThick = smoothstep(5.0, 0.2, ax) * 0.36 + 0.08;
    float inMustache = smoothstep(mThick, mThick - 0.08, mDist) * smoothstep(5.0, 4.4, ax) * step(0.12, ax);

    // Chin Goatee: Soul patch below lip + vertical tapered strip on chin
    float inSoulPatch = smoothstep(0.35, 0.25, ax) * smoothstep(-5.6, -5.8, y) * smoothstep(-6.6, -6.4, y);
    float gWidth = mix(0.55, 0.18, clamp((y - (-7.0)) / (-2.8), 0.0, 1.0));
    float inChinBeard = smoothstep(gWidth, gWidth - 0.08, ax) * smoothstep(-6.8, -7.1, y) * smoothstep(-10.0, -9.6, y);
    float inGoatee = max(inSoulPatch, inChinBeard);

    // Arched Eyebrows: High on anatomical brow bone, sweeping above eye sockets
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

    // Blend features:
    col = mix(col, blushTone, inCheek);
    col = mix(col, lipTone, inLips);
    col = mix(col, darkFeature, max(max(inMustache, inGoatee), inBrow));
  }

  // Balanced Lighting
  vec3 keyLight = normalize(vec3(0.35, 0.75, 0.9));
  vec3 fillLight = normalize(vec3(-0.5, -0.2, 0.5));
  float diff1 = max(dot(norm, keyLight), 0.0);
  float diff2 = max(dot(norm, fillLight), 0.0);

  // Soft specular sheen on porcelain
  vec3 halfVec = normalize(keyLight + viewDir);
  float spec = pow(max(dot(norm, halfVec), 0.0), 32.0) * 0.25;

  col = col * (0.64 + 0.36 * diff1 + 0.15 * diff2) + vec3(spec);

  // Subtle silver fresnel rim
  float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 2.8);
  col += vec3(0.95, 0.96, 1.0) * fresnel * 0.3;

  gl_FragColor = vec4(col, 0.98 * uProgress);
}
`,g=new o.Plane(new o.Vector3(0,0,1),0),x=new o.Vector3;function S({position:e=[0,0,0],scale:t=1}){let r=(0,s.useRef)(null),i=(0,s.useRef)(null),a=(0,s.useRef)(null),c=(0,s.useRef)(null),{gl:y,raycaster:T,pointer:w,camera:b}=(0,u.useThree)(),M=(0,s.useRef)(0),B=(0,d.useAnonymousModel)(),U=(0,s.useMemo)(()=>({uTime:{value:0},uProgress:{value:1},uMouse:{value:new o.Vector3(99,99,0)},uHover:{value:0},uPixelRatio:{value:Math.min(y.getPixelRatio(),2)}}),[y]),E=(0,s.useMemo)(()=>({uTime:{value:0},uProgress:{value:1}}),[]);if((0,l.useFrame)((t,i)=>{let n=t.clock.elapsedTime,s=h.fx.introStart<0?0:Math.min(1,(performance.now()-h.fx.introStart)/1800);if(T.setFromCamera(w,b),r.current){g.constant=-r.current.getWorldPosition(x).z;let t=T.ray.intersectPlane(g,x),a=+!!t;M.current+=(a-M.current)*Math.min(1,6*i),t&&(r.current.worldToLocal(t),U.uMouse.value.lerp(t,Math.min(1,10*i))),U.uHover.value=M.current,U.uTime.value=n,U.uProgress.value=s,E.uTime.value=n,E.uProgress.value=s;let o=r.current,l=.28*h.fx.mouse.x+.03*Math.sin(.3*n),u=-(.14*h.fx.mouse.y)+.9*h.fx.scroll+.02*Math.cos(.4*n),c=1-Math.exp(-4.5*i);o.rotation.y+=(l-o.rotation.y)*c,o.rotation.x+=(u-o.rotation.x)*c,o.position.y=e[1]+.06*Math.sin(.7*n)-1.5*h.fx.scroll,o.position.x=e[0],o.position.z=e[2]-2.5*h.fx.scroll}}),!B)return null;let R=.155*t;return(0,n.jsxs)("group",{ref:r,position:e,scale:[R,R,R],children:[(0,n.jsx)("mesh",{geometry:B.geometry,children:(0,n.jsx)("shaderMaterial",{ref:a,vertexShader:v,fragmentShader:m,uniforms:E,transparent:!0,depthWrite:!0,side:o.DoubleSide})}),(0,n.jsx)("mesh",{geometry:B.geometry,scale:1.002,children:(0,n.jsx)("meshBasicMaterial",{ref:c,color:"#ffffff",wireframe:!0,transparent:!0,opacity:.04,depthWrite:!1,blending:o.AdditiveBlending})}),(0,n.jsx)("points",{geometry:B.particleGeometry,frustumCulled:!1,children:(0,n.jsx)("shaderMaterial",{ref:i,vertexShader:f,fragmentShader:p,uniforms:U,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending})})]})}let y=new o.Matrix4,T=new o.Quaternion,w=new o.Euler,b=new o.Vector3,M=new o.Vector3,B=[{radius:2.65,tilt:[Math.PI/2.4,0,.2],speed:.2,count:36,color:"#ffffff"},{radius:3.15,tilt:[Math.PI/1.7,.6,-.3],speed:-.15,count:48,color:"#d4d4d8"},{radius:3.7,tilt:[Math.PI/3,-.5,.9],speed:.1,count:60,color:"#a1a1aa"}];function U({ring:e}){let t=(0,s.useRef)(null),r=(0,s.useRef)(null),i=(0,s.useMemo)(()=>Array.from({length:e.count},()=>({a:Math.random()*Math.PI*2,s:.6+1.2*Math.random(),r:Math.random()})),[e.count]);return(0,l.useFrame)((n,s)=>{let a=n.clock.elapsedTime;t.current.rotation.z+=e.speed*s*.35;let o=r.current;for(let t=0;t<e.count;t++){let r=i[t],n=r.a+a*e.speed*r.s,s=e.radius+.015*Math.sin(2*a+t);b.set(Math.cos(n)*s,Math.sin(n)*s,0),w.set(0,0,n),T.setFromEuler(w);let l=.006+.01*r.r,u=.7+.3*Math.sin(4*a+1.7*t);M.set(2*l*u,l,l),y.compose(b,T,M),o.setMatrixAt(t,y)}o.instanceMatrix.needsUpdate=!0}),(0,n.jsxs)("group",{ref:t,rotation:e.tilt,children:[(0,n.jsxs)("mesh",{children:[(0,n.jsx)("torusGeometry",{args:[e.radius,.0025,4,220]}),(0,n.jsx)("meshBasicMaterial",{color:e.color,transparent:!0,opacity:.16,blending:o.AdditiveBlending,depthWrite:!1})]}),(0,n.jsxs)("mesh",{rotation:[0,0,.3],children:[(0,n.jsx)("torusGeometry",{args:[e.radius+.05,.0015,4,220]}),(0,n.jsx)("meshBasicMaterial",{color:e.color,transparent:!0,opacity:.07,blending:o.AdditiveBlending,depthWrite:!1})]}),(0,n.jsxs)("instancedMesh",{ref:r,args:[void 0,void 0,e.count],children:[(0,n.jsx)("boxGeometry",{args:[1,1,1]}),(0,n.jsx)("meshBasicMaterial",{color:e.color,transparent:!0,opacity:.35,blending:o.AdditiveBlending,depthWrite:!1})]})]})}function E({position:e=[0,0,0]}){let t=(0,s.useRef)(null),r=(0,s.useRef)(null),i=(0,s.useRef)(null);return(0,l.useFrame)((n,s)=>{let a=n.clock.elapsedTime,o=t.current;o.rotation.y+=(.25*h.fx.mouse.x-o.rotation.y)*Math.min(1,2*s)+.04*s,o.rotation.x+=(-(.16*h.fx.mouse.y)+.8*h.fx.scroll-o.rotation.x)*Math.min(1,2*s),o.position.y=e[1]-1.5*h.fx.scroll,o.position.z=e[2]-2.5*h.fx.scroll;let l=1-Math.pow(1-(h.fx.introStart<0?0:Math.min(1,(performance.now()-h.fx.introStart)/2200)),3);o.scale.setScalar(.2+.8*l),r.current.rotation.x=.06*a,r.current.rotation.y=.08*a,i.current.rotation.x=-(.04*a),i.current.rotation.z=.05*a}),(0,n.jsxs)("group",{ref:t,position:e,children:[B.map((e,t)=>(0,n.jsx)(U,{ring:e},t)),(0,n.jsxs)("mesh",{ref:r,children:[(0,n.jsx)("icosahedronGeometry",{args:[4.2,1]}),(0,n.jsx)("meshBasicMaterial",{color:"#ffffff",wireframe:!0,transparent:!0,opacity:.025,blending:o.AdditiveBlending,depthWrite:!1})]}),(0,n.jsxs)("mesh",{ref:i,children:[(0,n.jsx)("icosahedronGeometry",{args:[4.7,0]}),(0,n.jsx)("meshBasicMaterial",{color:"#a1a1aa",wireframe:!0,transparent:!0,opacity:.018,blending:o.AdditiveBlending,depthWrite:!1})]})]})}let R=new o.Matrix4,_=new o.Quaternion,A=new o.Vector3,D=new o.Vector3;function F({count:e=300}){let t=(0,s.useRef)(null),r=(0,s.useMemo)(()=>Array.from({length:e},()=>({x:(Math.random()-.5)*26,y:16*Math.random()-6,z:-2-12*Math.random(),len:.25+1.4*Math.random(),speed:1.2+3.5*Math.random(),w:.005+.01*Math.random()})),[e]),i=(0,s.useMemo)(()=>{let e=document.createElement("canvas");e.width=1,e.height=64;let t=e.getContext("2d"),r=t.createLinearGradient(0,0,0,64);r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.75,"rgba(240,240,245,0.35)"),r.addColorStop(1,"rgba(255,255,255,0.8)"),t.fillStyle=r,t.fillRect(0,0,1,64);let i=new o.CanvasTexture(e);return i.colorSpace=o.SRGBColorSpace,i},[]);return(0,l.useFrame)((i,n)=>{let s=t.current;for(let t=0;t<e;t++){let e=r[t];e.y-=e.speed*n,e.y<-8&&(e.y=8+4*Math.random(),e.x=(Math.random()-.5)*26),A.set(e.x,e.y-2*h.fx.scroll,e.z),D.set(e.w,e.len,1),R.compose(A,_,D),s.setMatrixAt(t,R)}s.instanceMatrix.needsUpdate=!0}),(0,n.jsxs)("instancedMesh",{ref:t,args:[void 0,void 0,e],frustumCulled:!1,children:[(0,n.jsx)("planeGeometry",{args:[1,1]}),(0,n.jsx)("meshBasicMaterial",{map:i,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending})]})}function C({count:e=500}){let t=(0,s.useRef)(null),{positions:r,sizes:i}=(0,s.useMemo)(()=>{let t=new Float32Array(3*e),r=new Float32Array(e);for(let i=0;i<e;i++)t[3*i]=(Math.random()-.5)*18,t[3*i+1]=(Math.random()-.5)*12,t[3*i+2]=(Math.random()-.5)*10,r[i]=Math.random();return{positions:t,sizes:r}},[e]),a=(0,s.useMemo)(()=>({uTime:{value:0},uPR:{value:1}}),[]);return(0,l.useFrame)(e=>{a.uTime.value=e.clock.elapsedTime,a.uPR.value=e.gl.getPixelRatio(),t.current.position.y=-(2*h.fx.scroll)}),(0,n.jsxs)("points",{ref:t,frustumCulled:!1,children:[(0,n.jsxs)("bufferGeometry",{children:[(0,n.jsx)("bufferAttribute",{attach:"attributes-position",args:[r,3]}),(0,n.jsx)("bufferAttribute",{attach:"attributes-aSize",args:[i,1]})]}),(0,n.jsx)("shaderMaterial",{transparent:!0,depthWrite:!1,blending:o.AdditiveBlending,uniforms:a,vertexShader:`
          uniform float uTime; uniform float uPR; attribute float aSize; varying float vA;
          void main(){
            vec3 p = position;
            p.y += sin(uTime * 0.3 + aSize * 20.0) * 0.4;
            p.x += cos(uTime * 0.2 + aSize * 13.0) * 0.4;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (0.8 + aSize * 2.0) * uPR * (8.0 / -mv.z);
            vA = 0.12 + 0.4 * (0.5 + 0.5 * sin(uTime * 2.0 + aSize * 50.0));
          }`,fragmentShader:`
          varying float vA;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(0.9, 0.92, 0.96, smoothstep(0.5, 0.0, d) * vA);
          }`})]})}function P(){return(P=Object.assign.bind()).apply(null,arguments)}var z=e.i(70950),z=z,I=o;let N=parseInt(o.REVISION.replace(/\D+/g,""));class k extends I.ShaderMaterial{constructor(e=new I.Vector2){super({uniforms:{inputBuffer:new I.Uniform(null),depthBuffer:new I.Uniform(null),resolution:new I.Uniform(new I.Vector2),texelSize:new I.Uniform(new I.Vector2),halfTexelSize:new I.Uniform(new I.Vector2),kernel:new I.Uniform(0),scale:new I.Uniform(1),cameraNear:new I.Uniform(0),cameraFar:new I.Uniform(1),minDepthThreshold:new I.Uniform(0),maxDepthThreshold:new I.Uniform(1),depthScale:new I.Uniform(0),depthToBlurRatioBias:new I.Uniform(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${N>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:I.NoBlending,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t),this.uniforms.halfTexelSize.value.set(e,t).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class G{constructor({gl:e,resolution:t,width:r=500,height:i=500,minDepthThreshold:n=0,maxDepthThreshold:s=1,depthScale:a=0,depthToBlurRatioBias:l=.25}){this.renderToScreen=!1,this.renderTargetA=new o.WebGLRenderTarget(t,t,{minFilter:o.LinearFilter,magFilter:o.LinearFilter,stencilBuffer:!1,depthBuffer:!1,type:o.HalfFloatType}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new k,this.convolutionMaterial.setTexelSize(1/r,1/i),this.convolutionMaterial.setResolution(new o.Vector2(r,i)),this.scene=new o.Scene,this.camera=new o.Camera,this.convolutionMaterial.uniforms.minDepthThreshold.value=n,this.convolutionMaterial.uniforms.maxDepthThreshold.value=s,this.convolutionMaterial.uniforms.depthScale.value=a,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=l,this.convolutionMaterial.defines.USE_DEPTH=a>0;const u=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),c=new Float32Array([0,0,2,0,0,2]),h=new o.BufferGeometry;h.setAttribute("position",new o.BufferAttribute(u,3)),h.setAttribute("uv",new o.BufferAttribute(c,2)),this.screen=new o.Mesh(h,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,t,r){let i,n,s,a=this.scene,o=this.camera,l=this.renderTargetA,u=this.renderTargetB,c=this.convolutionMaterial,h=c.uniforms;h.depthBuffer.value=t.depthTexture;let d=c.kernel,f=t;for(n=0,s=d.length-1;n<s;++n)i=(1&n)==0?l:u,h.kernel.value=d[n],h.inputBuffer.value=f.texture,e.setRenderTarget(i),e.render(a,o),f=i;h.kernel.value=d[n],h.inputBuffer.value=f.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(a,o)}}var O=o;class L extends O.MeshStandardMaterial{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var t;null!=(t=e.defines)&&t.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}let H=s.forwardRef(({mixBlur:e=0,mixStrength:t=1,resolution:r=256,blur:i=[0,0],minDepthThreshold:n=.9,maxDepthThreshold:a=1,depthScale:c=0,depthToBlurRatioBias:h=.25,mirror:d=0,distortion:f=1,mixContrast:p=1,distortionMap:v,reflectorOffset:m=0,...g},x)=>{(0,z.e)({MeshReflectorMaterialImpl:L});let S=(0,u.useThree)(({gl:e})=>e),y=(0,u.useThree)(({camera:e})=>e),T=(0,u.useThree)(({scene:e})=>e),w=(i=Array.isArray(i)?i:[i,i])[0]+i[1]>0,b=i[0],M=i[1],B=s.useRef(null);s.useImperativeHandle(x,()=>B.current,[]);let[U]=s.useState(()=>new o.Plane),[E]=s.useState(()=>new o.Vector3),[R]=s.useState(()=>new o.Vector3),[_]=s.useState(()=>new o.Vector3),[A]=s.useState(()=>new o.Matrix4),[D]=s.useState(()=>new o.Vector3(0,0,-1)),[F]=s.useState(()=>new o.Vector4),[C]=s.useState(()=>new o.Vector3),[I]=s.useState(()=>new o.Vector3),[N]=s.useState(()=>new o.Vector4),[k]=s.useState(()=>new o.Matrix4),[O]=s.useState(()=>new o.PerspectiveCamera),H=s.useCallback(()=>{var e;let t=B.current.parent||(null==(e=B.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t||(R.setFromMatrixPosition(t.matrixWorld),_.setFromMatrixPosition(y.matrixWorld),A.extractRotation(t.matrixWorld),E.set(0,0,1),E.applyMatrix4(A),R.addScaledVector(E,m),C.subVectors(R,_),C.dot(E)>0))return;C.reflect(E).negate(),C.add(R),A.extractRotation(y.matrixWorld),D.set(0,0,-1),D.applyMatrix4(A),D.add(_),I.subVectors(R,D),I.reflect(E).negate(),I.add(R),O.position.copy(C),O.up.set(0,1,0),O.up.applyMatrix4(A),O.up.reflect(E),O.lookAt(I),O.far=y.far,O.updateMatrixWorld(),O.projectionMatrix.copy(y.projectionMatrix),k.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),k.multiply(O.projectionMatrix),k.multiply(O.matrixWorldInverse),k.multiply(t.matrixWorld),U.setFromNormalAndCoplanarPoint(E,R),U.applyMatrix4(O.matrixWorldInverse),F.set(U.normal.x,U.normal.y,U.normal.z,U.constant);let r=O.projectionMatrix;N.x=(Math.sign(F.x)+r.elements[8])/r.elements[0],N.y=(Math.sign(F.y)+r.elements[9])/r.elements[5],N.z=-1,N.w=(1+r.elements[10])/r.elements[14],F.multiplyScalar(2/F.dot(N)),r.elements[2]=F.x,r.elements[6]=F.y,r.elements[10]=F.z+1,r.elements[14]=F.w},[y,m]),[W,V,j,$]=s.useMemo(()=>{let i={minFilter:o.LinearFilter,magFilter:o.LinearFilter,type:o.HalfFloatType},s=new o.WebGLRenderTarget(r,r,i);s.depthBuffer=!0,s.depthTexture=new o.DepthTexture(r,r),s.depthTexture.format=o.DepthFormat,s.depthTexture.type=o.UnsignedShortType;let l=new o.WebGLRenderTarget(r,r,i),u=new G({gl:S,resolution:r,width:b,height:M,minDepthThreshold:n,maxDepthThreshold:a,depthScale:c,depthToBlurRatioBias:h}),m={mirror:d,textureMatrix:k,mixBlur:e,tDiffuse:s.texture,tDepth:s.depthTexture,tDiffuseBlur:l.texture,hasBlur:w,mixStrength:t,minDepthThreshold:n,maxDepthThreshold:a,depthScale:c,depthToBlurRatioBias:h,distortion:f,distortionMap:v,mixContrast:p,"defines-USE_BLUR":w?"":void 0,"defines-USE_DEPTH":c>0?"":void 0,"defines-USE_DISTORTION":v?"":void 0};return[s,l,u,m]},[S,b,M,k,r,d,w,e,t,n,a,c,h,f,v,p]);return(0,l.useFrame)(()=>{var e;let t=B.current.parent||(null==(e=B.current)||null==(e=e.__r3f.parent)?void 0:e.object);if(!t)return;t.visible=!1;let r=S.xr.enabled,i=S.shadowMap.autoUpdate;H(),S.xr.enabled=!1,S.shadowMap.autoUpdate=!1,S.setRenderTarget(W),S.state.buffers.depth.setMask(!0),S.autoClear||S.clear(),S.render(T,O),w&&j.render(S,W,V),S.xr.enabled=r,S.shadowMap.autoUpdate=i,t.visible=!0,S.setRenderTarget(null)}),s.createElement("meshReflectorMaterialImpl",P({attach:"material",key:"key"+$["defines-USE_BLUR"]+$["defines-USE_DEPTH"]+$["defines-USE_DISTORTION"],ref:B},$,g))}),W=`
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vWorld;
float gridLine(vec2 p, float w){
  vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
  float l = min(g.x, g.y);
  return 1.0 - min(l / w, 1.0);
}
void main(){
  vec2 p = vWorld.xz;
  p.y += uTime * 0.8;               // slow forward drift
  float big = gridLine(p * 0.5, 1.2);
  float small = gridLine(p * 2.0, 0.8) * 0.35;
  float dist = length(vWorld.xz);
  float fade = smoothstep(22.0, 3.0, dist);
  // radar sweep
  float ring = smoothstep(0.35, 0.0, abs(fract(dist * 0.12 - uTime * 0.25) - 0.5));
  float a = (big + small) * fade * 0.4 + ring * fade * 0.06;
  gl_FragColor = vec4(uColor, a);
}
`,V=`
varying vec2 vUv; varying vec3 vWorld;
void main(){
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;function j({y:e=-2.6}){let t=(0,s.useMemo)(()=>({uTime:{value:0},uColor:{value:new o.Color("#d4d4d8")}}),[]),r=(0,s.useRef)(null),i=0===h.fx.quality;return(0,l.useFrame)(i=>{t.uTime.value=i.clock.elapsedTime,r.current.position.y=e-2*h.fx.scroll}),(0,n.jsxs)("group",{ref:r,position:[0,e,0],children:[!i&&(0,n.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.01,0],children:[(0,n.jsx)("planeGeometry",{args:[60,60]}),(0,n.jsx)(H,{blur:[400,120],resolution:1024,mixBlur:1,mixStrength:14,roughness:1,depthScale:1.1,minDepthThreshold:.4,maxDepthThreshold:1.4,color:"#07080a",metalness:.6,mirror:.55})]}),i&&(0,n.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.01,0],children:[(0,n.jsx)("planeGeometry",{args:[60,60]}),(0,n.jsx)("meshBasicMaterial",{color:"#07080a"})]}),(0,n.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],children:[(0,n.jsx)("planeGeometry",{args:[60,60]}),(0,n.jsx)("shaderMaterial",{vertexShader:V,fragmentShader:W,uniforms:t,transparent:!0,depthWrite:!1,blending:o.AdditiveBlending})]})]})}let $=new o.Vector3;function q(){let e=(0,s.useRef)(new o.Vector3(0,.2,7.4));return(0,l.useFrame)((t,r)=>{let i=t.clock.elapsedTime,n=1-Math.pow(1-(h.fx.introStart<0?0:Math.min(1,(performance.now()-h.fx.introStart)/3e3)),3);e.current.set(.45*h.fx.mouse.x+.05*Math.sin(.25*i),.2+.25*h.fx.mouse.y+.04*Math.cos(.31*i)-2.4*h.fx.scroll,7.4+(1-n)*6+3.5*h.fx.scroll);let s=1-Math.exp(-3.5*r);t.camera.position.lerp(e.current,s),$.set(0,-(2.4*h.fx.scroll),0),t.camera.lookAt($)}),null}var z=z,X=o,K=(t=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),r=new Float32Array([0,0,2,0,0,2]),(i=new X.BufferGeometry).setAttribute("position",new X.BufferAttribute(t,3)),i.setAttribute("uv",new X.BufferAttribute(r,2)),i),Q=class e{static get fullscreenGeometry(){return K}constructor(e="Pass",t=new X.Scene,r=new X.OrthographicCamera){this.name=e,this.renderer=null,this.scene=t,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;null!==t&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return null!==this.screen?this.screen.material:null}set fullscreenMaterial(t){let r=this.screen;null!==r?r.material=t:((r=new X.Mesh(e.fullscreenGeometry,t)).frustumCulled=!1,null===this.scene&&(this.scene=new X.Scene),this.scene.add(r),this.screen=r)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=X.BasicDepthPacking){}render(e,t,r,i,n){throw Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,r){}dispose(){for(let t of Object.keys(this)){let r=this[t];(r instanceof X.WebGLRenderTarget||r instanceof X.Material||r instanceof X.Texture||r instanceof e)&&this[t].dispose()}null!==this.fullscreenMaterial&&this.fullscreenMaterial.dispose()}},Z=class extends Q{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,r,i,n){let s=e.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},Y=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,J="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ee=class extends X.ShaderMaterial{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new X.Uniform(null),depthBuffer:new X.Uniform(null),channelWeights:new X.Uniform(null),opacity:new X.Uniform(1)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Y,vertexShader:J}),this.depthFunc=X.AlwaysDepth}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){let t=null!==e;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){let t=null!==e;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return void 0!==this.defines.COLOR_SPACE_CONVERSION}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){null!==e?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},et=class extends Q{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ee,this.needsSwap=!1,this.renderTarget=e,void 0===e&&(this.renderTarget=new X.WebGLRenderTarget(1,1,{minFilter:X.LinearFilter,magFilter:X.LinearFilter,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,r,i,n){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,r){void 0!==r&&(this.renderTarget.texture.type=r,r!==X.UnsignedByteType?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":null!==e&&e.outputColorSpace===X.SRGBColorSpace&&(this.renderTarget.texture.colorSpace=X.SRGBColorSpace))}},er=new X.Color,ei=class extends Q{constructor(e=!0,t=!0,r=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=r,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,r){this.color=e,this.depth=t,this.stencil=r}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,r,i,n){let s=this.overrideClearColor,a=this.overrideClearAlpha,o=e.getClearAlpha(),l=null!==s,u=a>=0;l?(e.getClearColor(er),e.setClearColor(s,u?a:o)):u&&e.setClearAlpha(a),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),l?e.setClearColor(er,o):u&&e.setClearAlpha(o)}},en=class extends Q{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new ei(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,r,i,n){let s=e.getContext(),a=e.state.buffers,o=this.scene,l=this.camera,u=this.clearPass,c=+!this.inverted;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.stencil.setFunc(s.ALWAYS,c,0xffffffff),a.stencil.setClear(1-c),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?u.render(e,null):(u.render(e,t),u.render(e,r))),this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),e.render(o,l),e.setRenderTarget(r)),e.render(o,l),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(s.EQUAL,1,0xffffffff),a.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.stencil.setLocked(!0)}},es=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){"u">typeof document&&void 0!==document.hidden&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return .001*this._delta}get fixedDelta(){return .001*this._fixedDelta}set fixedDelta(e){this._fixedDelta=1e3*e}get elapsed(){return .001*this._elapsed}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(void 0!==e?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},ea=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:r=!1,multisampling:i=0,frameBufferType:n=X.UnsignedByteType}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,r,n,i),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new et,this.depthRenderTarget=null,this.passes=[],this.timer=new es,this.autoRenderToScreen=!0,this.setRenderer(e)}get stableDepthTexture(){return null===this.depthRenderTarget?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(e){let t=null===this.renderer?e:function(e,t){let r=e.getContext();if(t<=0||"function"!=typeof r.renderbufferStorageMultisample)return 0;let i=Math.min(t,r.getParameter(r.MAX_SAMPLES));if(i<=0)return 0;let n=r.getParameter(r.RENDERBUFFER_BINDING),s=r.createRenderbuffer();try{return r.bindRenderbuffer(r.RENDERBUFFER,s),r.renderbufferStorageMultisample(r.RENDERBUFFER,i,r.RGBA8,1,1),i}catch(e){return 0}finally{r.bindRenderbuffer(r.RENDERBUFFER,n),r.deleteRenderbuffer(s)}}(this.renderer,e);this.multisampling!==t&&(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,null!==e){let t=e.getSize(new X.Vector2),r=e.getContext().getContextAttributes().alpha,i=this.inputBuffer.texture.type;i===X.UnsignedByteType&&e.outputColorSpace===X.SRGBColorSpace&&(this.inputBuffer.texture.colorSpace=X.SRGBColorSpace,this.outputBuffer.texture.colorSpace=X.SRGBColorSpace,this.inputBuffer.dispose(),this.outputBuffer.dispose());let n=this.multisampling;for(let s of(this.multisampling=n,e.autoClear=!1,this.setSize(t.width,t.height),this.passes))s.initialize(e,r,i)}}replaceRenderer(e,t=!0){let r=this.renderer,i=r.domElement.parentNode;return this.setRenderer(e),t&&null!==i&&(i.removeChild(r.domElement),i.appendChild(e.domElement)),r}createDepthTexture(){let e=new X.DepthTexture;e.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(e.format=X.DepthStencilFormat,e.type=X.UnsignedInt248Type):e.type=X.FloatType;let t=new X.DepthTexture;t.format=e.format,t.type=e.type,t.name="EffectComposer.OutputDepth";let r=new X.DepthTexture;r.format=e.format,r.type=e.type,r.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=e,this.outputBuffer.depthTexture=t,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:i,height:n}=this.inputBuffer;this.depthRenderTarget=new X.WebGLRenderTarget(i,n,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:r})}blitDepthBuffer(e){let t=this.renderer,r=this.depthRenderTarget,i=t.properties,n=t.getContext();t.setRenderTarget(r);let s=i.get(e).__webglFramebuffer,a=i.get(r).__webglFramebuffer,o=e.stencilBuffer?n.DEPTH_BUFFER_BIT|n.STENCIL_BUFFER_BIT:n.DEPTH_BUFFER_BIT;n.bindFramebuffer(n.READ_FRAMEBUFFER,s),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,a),n.blitFramebuffer(0,0,e.width,e.height,0,0,r.width,r.height,o,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),t.setRenderTarget(null)}deleteDepthTexture(){let e=this.stableDepthTexture;for(let t of this.passes)t.getDepthTexture()===e&&t.setDepthTexture(null);null!==this.depthRenderTarget&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),null!==this.inputBuffer.depthTexture&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),null!==this.outputBuffer.depthTexture&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(e,t,r,i){let n=this.renderer,s=null===n?new X.Vector2:n.getDrawingBufferSize(new X.Vector2),a=new X.WebGLRenderTarget(s.width,s.height,{minFilter:X.LinearFilter,magFilter:X.LinearFilter,samples:i,stencilBuffer:t,depthBuffer:e,type:r});return r===X.UnsignedByteType&&null!==n&&n.outputColorSpace===X.SRGBColorSpace&&(a.texture.colorSpace=X.SRGBColorSpace),a.texture.name="EffectComposer.Buffer",a.texture.generateMipmaps=!1,a}setMainScene(e){for(let t of this.passes)t.mainScene=e}setMainCamera(e){for(let t of this.passes)t.mainCamera=e}addPass(e,t){let r=this.passes,i=this.renderer,n=i.getDrawingBufferSize(new X.Vector2),s=i.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(e.renderer=i,e.setSize(n.width,n.height),e.initialize(i,s,a),this.autoRenderToScreen&&(r.length>0&&(r[r.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),void 0!==t?r.splice(t,0,e):r.push(e),this.autoRenderToScreen&&(r[r.length-1].renderToScreen=!0),e.needsDepthTexture||null!==this.depthRenderTarget)if(null===this.depthRenderTarget)for(let e of(this.createDepthTexture(),r))e.setDepthTexture(this.stableDepthTexture);else e.setDepthTexture(this.stableDepthTexture)}removePass(e){let t=this.passes,r=t.indexOf(e);if(-1!==r&&t.splice(r,1).length>0){let i=this.stableDepthTexture;null!==i&&(t.reduce((e,t)=>e||t.needsDepthTexture,!1)||(e.getDepthTexture()===i&&e.setDepthTexture(null),this.deleteDepthTexture())),this.autoRenderToScreen&&r===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){let e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){let t,r=this.renderer,i=this.copyPass,n=this.inputBuffer,s=this.outputBuffer,a=!1;for(let o of(void 0===e&&(this.timer.update(),e=this.timer.getDelta()),this.passes))if(o.enabled){if(o.render(r,n,s,e,a),o.needsDepthBlit&&null!==this.depthRenderTarget&&this.blitDepthBuffer(n),o.needsSwap){if(a){i.renderToScreen=o.renderToScreen;let t=r.getContext(),l=r.state.buffers.stencil;l.setFunc(t.NOTEQUAL,1,0xffffffff),i.render(r,n,s,e,a),l.setFunc(t.EQUAL,1,0xffffffff)}t=n,n=s,s=t}o instanceof en?a=!0:o instanceof Z&&(a=!1)}}setSize(e,t,r){let i=this.renderer,n=i.getSize(new X.Vector2);(void 0===e||void 0===t)&&(e=n.width,t=n.height),(n.width!==e||n.height!==t)&&i.setSize(e,t,r);let s=i.getDrawingBufferSize(new X.Vector2);for(let e of(this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),null!==this.depthRenderTarget&&this.depthRenderTarget.setSize(s.width,s.height),this.passes))e.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let e of this.passes)e.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],Q.fullscreenGeometry.dispose()}},eo={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},el=class{constructor(){this.shaderParts=new Map([[eo.FRAGMENT_HEAD,null],[eo.FRAGMENT_MAIN_UV,null],[eo.FRAGMENT_MAIN_IMAGE,null],[eo.VERTEX_HEAD,null],[eo.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=0,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=X.LinearSRGBColorSpace}},eu=!1,ec=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case X.DoubleSide:t=this.materialsFlatShadedDoubleSide;break;case X.BackSide:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded}else switch(e.material.side){case X.DoubleSide:t=this.materialsDoubleSide;break;case X.BackSide:t=this.materialsBackSide;break;default:t=this.materials}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof X.ShaderMaterial))return e.clone();let t=e.uniforms,r=new Map;for(let e in t){let i=t[e].value;i.isRenderTargetTexture&&(t[e].value=null,r.set(e,i))}let i=e.clone();for(let e of r)t[e[0]].value=e[1],i.uniforms[e[0]].value=e[1];return i}setMaterial(e){if(this.disposeMaterials(),this.material=e,null!==e){let t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(let r of t)r.uniforms=Object.assign({},e.uniforms),r.side=X.FrontSide;t[2].skinning=!0,this.materialsBackSide=t.map(t=>{let r=this.cloneMaterial(t);return r.uniforms=Object.assign({},e.uniforms),r.side=X.BackSide,r}),this.materialsDoubleSide=t.map(t=>{let r=this.cloneMaterial(t);return r.uniforms=Object.assign({},e.uniforms),r.side=X.DoubleSide,r}),this.materialsFlatShaded=t.map(t=>{let r=this.cloneMaterial(t);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r}),this.materialsFlatShadedBackSide=t.map(t=>{let r=this.cloneMaterial(t);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=X.BackSide,r}),this.materialsFlatShadedDoubleSide=t.map(t=>{let r=this.cloneMaterial(t);return r.uniforms=Object.assign({},e.uniforms),r.flatShading=!0,r.side=X.DoubleSide,r})}}render(e,t,r){let i=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,eu){let i=this.originalMaterials;for(let n of(this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,r),i))n[0].material=n[1];this.meshCount!==i.size&&i.clear()}else{let i=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,r),t.overrideMaterial=i}e.shadowMap.enabled=i}disposeMaterials(){if(null!==this.material)for(let e of this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide))e.dispose()}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return eu}static set workaroundEnabled(e){eu=e}},eh=class extends X.EventDispatcher{constructor(e=null,t=-1,r=-1,i=1){super(),null!==e&&this.addEventListener("change",()=>e.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new X.Vector2(1,1),this.preferredSize=new X.Vector2(t,r),this.target=this.preferredSize,this.s=i,this.effectiveSize=new X.Vector2,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let e=this.baseSize,t=this.preferredSize,r=this.effectiveSize,i=this.scale;-1!==t.width?r.width=t.width:-1!==t.height?r.width=Math.round(t.height*(e.width/Math.max(e.height,1))):r.width=Math.round(e.width*i),-1!==t.height?r.height=t.height:-1!==t.width?r.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):r.height=Math.round(e.height*i)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar(-1),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return -1}},ed=new Map([[0,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[1,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}"],[2,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[3,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[4,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[5,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[6,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[7,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[8,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[9,null],[10,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[11,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[12,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[13,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[14,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[15,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[16,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[17,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[18,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[19,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[20,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[21,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[22,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[23,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}"],[24,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[25,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[26,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[27,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[28,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[29,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[30,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}"],[31,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"],[32,"vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}"]]),ef=class extends X.EventDispatcher{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new X.Uniform(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return ed.get(this.blendFunction)}};X.CanvasTexture;var ep=class extends X.EventDispatcher{constructor(e,t,{attributes:r=0,blendFunction:i=23,defines:n=new Map,uniforms:s=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=r,this.fragmentShader=t,this.vertexShader=o,this.defines=n,this.uniforms=s,this.extensions=a,this.blendMode=new ef(i),this.blendMode.addEventListener("change",e=>this.setChanged()),this._inputColorSpace=X.LinearSRGBColorSpace,this._outputColorSpace=X.NoColorSpace}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=X.BasicDepthPacking){}update(e,t,r){}setSize(e,t){}initialize(e,t,r){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof X.WebGLRenderTarget||t instanceof X.Material||t instanceof X.Texture||t instanceof Q)&&this[e].dispose()}}},ev=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,em=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],eg=class extends X.ShaderMaterial{constructor(e=new X.Vector4){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new X.Uniform(null),texelSize:new X.Uniform(new X.Vector4),scale:new X.Uniform(1),kernel:new X.Uniform(0)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ev,vertexShader:"uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}"}),this.setTexelSize(e.x,e.y),this.kernelSize=2}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return em[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,.5*e,.5*t)}setSize(e,t){let r=1/e,i=1/t;this.uniforms.texelSize.value.set(r,i,.5*r,.5*i)}},ex=class extends Q{constructor({kernelSize:e=2,resolutionScale:t=.5,width:r=eh.AUTO_SIZE,height:i=eh.AUTO_SIZE,resolutionX:n=r,resolutionY:s=i}={}){super("KawaseBlurPass"),this.renderTargetA=new X.WebGLRenderTarget(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new eh(this,n,s,t);a.addEventListener("change",e=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new eg,this._blurMaterial.kernelSize=e,this.copyMaterial=new ee}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,i,n){let s=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,u=this.blurMaterial,c=u.kernelSequence,h=t;this.fullscreenMaterial=u;for(let t=0,r=c.length;t<r;++t){let r=(1&t)==0?o:l;u.kernel=c[t],u.inputBuffer=h.texture,e.setRenderTarget(r),e.render(s,a),h=r}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(s,a)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t);let i=r.width,n=r.height;this.renderTargetA.setSize(i,n),this.renderTargetB.setSize(i,n),this.blurMaterial.setSize(e,t)}initialize(e,t,r){void 0!==r&&(this.renderTargetA.texture.type=r,this.renderTargetB.texture.type=r,r!==X.UnsignedByteType?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):null!==e&&e.outputColorSpace===X.SRGBColorSpace&&(this.renderTargetA.texture.colorSpace=X.SRGBColorSpace,this.renderTargetB.texture.colorSpace=X.SRGBColorSpace))}static get AUTO_SIZE(){return eh.AUTO_SIZE}},eS=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,ey=class extends X.ShaderMaterial{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:X.REVISION.replace(/\D+/g,"")},uniforms:{inputBuffer:new X.Uniform(null),threshold:new X.Uniform(0),smoothing:new X.Uniform(1),range:new X.Uniform(null)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:eS,vertexShader:J}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return void 0!==this.defines.COLOR}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return null!==this.luminanceRange}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){null!==e?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},eT=class extends Q{constructor({renderTarget:e,luminanceRange:t,colorOutput:r,resolutionScale:i=1,width:n=eh.AUTO_SIZE,height:s=eh.AUTO_SIZE,resolutionX:a=n,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new ey(r,t),this.needsSwap=!1,this.renderTarget=e,void 0===this.renderTarget&&(this.renderTarget=new X.WebGLRenderTarget(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new eh(this,a,o,i);l.addEventListener("change",e=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,r,i,n){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height)}initialize(e,t,r){void 0!==r&&r!==X.UnsignedByteType&&(this.renderTarget.texture.type=r,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},ew=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,eb=class extends X.ShaderMaterial{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new X.Uniform(null),texelSize:new X.Uniform(new X.Vector2)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ew,vertexShader:"uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}"})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},eM=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,eB=class extends X.ShaderMaterial{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new X.Uniform(null),supportBuffer:new X.Uniform(null),texelSize:new X.Uniform(new X.Vector2),radius:new X.Uniform(.85)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:eM,vertexShader:"uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}"})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},eU=class extends Q{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new X.WebGLRenderTarget(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new eb,this.upsamplingMaterial=new eB,this.resolution=new X.Vector2}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){let t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let r=0;r<e;++r){let e=t.clone();e.texture.name="Downsampling.Mipmap"+r,this.downsamplingMipmaps.push(e)}this.upsamplingMipmaps.push(t);for(let r=1,i=e-1;r<i;++r){let e=t.clone();e.texture.name="Upsampling.Mipmap"+r,this.upsamplingMipmaps.push(e)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,r,i,n){let{scene:s,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:u,upsamplingMipmaps:c}=this,h=t;this.fullscreenMaterial=o;for(let t=0,r=u.length;t<r;++t){let r=u[t];o.setSize(h.width,h.height),o.inputBuffer=h.texture,e.setRenderTarget(r),e.render(s,a),h=r}this.fullscreenMaterial=l;for(let t=c.length-1;t>=0;--t){let r=c[t];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=u[t].texture,e.setRenderTarget(r),e.render(s,a),h=r}}setSize(e,t){let r=this.resolution;r.set(e,t);let i=r.width,n=r.height;for(let e=0,t=this.downsamplingMipmaps.length;e<t;++e)i=Math.round(.5*i),n=Math.round(.5*n),this.downsamplingMipmaps[e].setSize(i,n),e<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[e].setSize(i,n)}initialize(e,t,r){if(void 0!==r){let t=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let e of t)e.texture.type=r;if(r!==X.UnsignedByteType)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(null!==e&&e.outputColorSpace===X.SRGBColorSpace)for(let e of t)e.texture.colorSpace=X.SRGBColorSpace}}dispose(){for(let e of(super.dispose(),this.downsamplingMipmaps.concat(this.upsamplingMipmaps)))e.dispose()}},eE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,eR=class extends ep{constructor({blendFunction:e=28,luminanceThreshold:t=1,luminanceSmoothing:r=.03,mipmapBlur:i=!0,intensity:n=1,radius:s=.85,levels:a=8,kernelSize:o=3,resolutionScale:l=.5,width:u=eh.AUTO_SIZE,height:c=eh.AUTO_SIZE,resolutionX:h=u,resolutionY:d=c}={}){super("BloomEffect",eE,{blendFunction:e,uniforms:new Map([["map",new X.Uniform(null)],["intensity",new X.Uniform(n)]])}),this.renderTarget=new X.WebGLRenderTarget(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new ex({kernelSize:o}),this.luminancePass=new eT({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=r,this.mipmapBlurPass=new eU,this.mipmapBlurPass.enabled=i,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=i?this.mipmapBlurPass.texture:this.renderTarget.texture;const f=this.resolution=new eh(this,h,d,l);f.addEventListener("change",e=>this.setSize(f.baseWidth,f.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,r){let i=this.renderTarget,n=this.luminancePass;n.enabled?(n.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,n.renderTarget):this.blurPass.render(e,n.renderTarget,i)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,i)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height),this.blurPass.resolution.copy(r),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,r){this.blurPass.initialize(e,t,r),this.luminancePass.initialize(e,t,r),this.mipmapBlurPass.initialize(e,t,r),void 0!==r&&(this.renderTarget.texture.type=r,null!==e&&e.outputColorSpace===X.SRGBColorSpace&&(this.renderTarget.texture.colorSpace=X.SRGBColorSpace))}};X.ShaderMaterial;X.ShaderMaterial;X.ShaderMaterial,X.DataTexture;X.ShaderMaterial;var e_=class extends Q{constructor(e,t,r=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ei,this.overrideMaterialManager=null===r?null:new ec(r),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){let e=this.overrideMaterialManager;return null!==e?e.material:null}set overrideMaterial(e){let t=this.overrideMaterialManager;null!==e?null!==t?t.setMaterial(e):this.overrideMaterialManager=new ec(e):null!==t&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,r,i,n){let s=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,u=s.background,c=e.shadowMap.autoUpdate,h=this.renderToScreen?null:t;null!==o&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||null!==this.clearPass.overrideClearColor)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(h),null!==this.overrideMaterialManager?this.overrideMaterialManager.render(e,s,a):e.render(s,a),a.layers.mask=l,s.background=u,e.shadowMap.autoUpdate=c}};X.Data3DTexture,X.ShaderMaterial,X.ShaderMaterial;X.ShaderMaterial;X.ShaderMaterial;X.ShaderMaterial;X.ShaderMaterial;var eA=`#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
#ifdef DOWNSAMPLE_NORMALS
uniform lowp sampler2D normalBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[4];distances[0]=abs(c-samples[0]);distances[1]=abs(c-samples[1]);distances[2]=abs(c-samples[2]);distances[3]=abs(c-samples[3]);float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[4];d[0]=readDepth(vUv0);d[1]=readDepth(vUv1);d[2]=readDepth(vUv2);d[3]=readDepth(vUv3);int index=findBestDepth(d);
#ifdef DOWNSAMPLE_NORMALS
vec3 n[4];n[0]=texture2D(normalBuffer,vUv0).rgb;n[1]=texture2D(normalBuffer,vUv1).rgb;n[2]=texture2D(normalBuffer,vUv2).rgb;n[3]=texture2D(normalBuffer,vUv3).rgb;
#else
vec3 n[4];n[0]=vec3(0.0);n[1]=vec3(0.0);n[2]=vec3(0.0);n[3]=vec3(0.0);
#endif
gl_FragColor=vec4(n[index],d[index]);}`,eD=class extends X.ShaderMaterial{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new X.Uniform(null),normalBuffer:new X.Uniform(null),texelSize:new X.Uniform(new X.Vector2)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:eA,vertexShader:"uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}"})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=X.BasicDepthPacking){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,null!==e?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},eF=class extends Q{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:r=eh.AUTO_SIZE,height:i=eh.AUTO_SIZE,resolutionX:n=r,resolutionY:s=i}={}){super("DepthDownsamplingPass");const a=new eD;a.normalBuffer=e,this.fullscreenMaterial=a,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new X.WebGLRenderTarget(1,1,{minFilter:X.NearestFilter,magFilter:X.NearestFilter,depthBuffer:!1,type:X.FloatType}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const o=this.resolution=new eh(this,n,s,t);o.addEventListener("change",e=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=X.BasicDepthPacking){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,r,i,n){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,r){let i=e.getContext();if(!(i.getExtension("EXT_color_buffer_float")||i.getExtension("EXT_color_buffer_half_float")))throw Error("Rendering to float texture is not supported.")}},eC=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform vec4 maskParams;varying vec2 vUv;varying vec2 vUv2;varying vec2 vOffset;float linearGradientMask(const in float x){return smoothstep(maskParams.x,maskParams.y,x)-smoothstep(maskParams.w,maskParams.z,x);}void main(){vec2 dUv=vOffset*(1.0-linearGradientMask(vUv2.y));vec4 sum=texture2D(inputBuffer,vec2(vUv.x-dUv.x,vUv.y+dUv.y));sum+=texture2D(inputBuffer,vec2(vUv.x+dUv.x,vUv.y+dUv.y));sum+=texture2D(inputBuffer,vec2(vUv.x+dUv.x,vUv.y-dUv.y));sum+=texture2D(inputBuffer,vec2(vUv.x-dUv.x,vUv.y-dUv.y));gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,eP=`#include <packing>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
uniform lowp sampler2D luminanceBuffer0;uniform lowp sampler2D luminanceBuffer1;uniform float minLuminance;uniform float deltaTime;uniform float tau;varying vec2 vUv;void main(){float l0=unpackRGBAToFloat(texture2D(luminanceBuffer0,vUv));
#if __VERSION__ < 300
float l1=texture2DLodEXT(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#else
float l1=textureLod(luminanceBuffer1,vUv,MIP_LEVEL_1X1).r;
#endif
l0=max(minLuminance,l0);l1=max(minLuminance,l1);float adaptedLum=l0+(l1-l0)*(1.0-exp(-deltaTime*tau));gl_FragColor=(adaptedLum==1.0)?vec4(1.0):packFloatToRGBA(adaptedLum);}`,ez=class extends X.ShaderMaterial{constructor(){super({name:"AdaptiveLuminanceMaterial",defines:{MIP_LEVEL_1X1:"0.0"},uniforms:{luminanceBuffer0:new X.Uniform(null),luminanceBuffer1:new X.Uniform(null),minLuminance:new X.Uniform(.01),deltaTime:new X.Uniform(0),tau:new X.Uniform(1)},extensions:{shaderTextureLOD:!0},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:eP,vertexShader:J})}set luminanceBuffer0(e){this.uniforms.luminanceBuffer0.value=e}setLuminanceBuffer0(e){this.uniforms.luminanceBuffer0.value=e}set luminanceBuffer1(e){this.uniforms.luminanceBuffer1.value=e}setLuminanceBuffer1(e){this.uniforms.luminanceBuffer1.value=e}set mipLevel1x1(e){this.defines.MIP_LEVEL_1X1=e.toFixed(1),this.needsUpdate=!0}setMipLevel1x1(e){this.mipLevel1x1=e}set deltaTime(e){this.uniforms.deltaTime.value=e}setDeltaTime(e){this.uniforms.deltaTime.value=e}get minLuminance(){return this.uniforms.minLuminance.value}set minLuminance(e){this.uniforms.minLuminance.value=e}getMinLuminance(){return this.uniforms.minLuminance.value}setMinLuminance(e){this.uniforms.minLuminance.value=e}get adaptationRate(){return this.uniforms.tau.value}set adaptationRate(e){this.uniforms.tau.value=e}getAdaptationRate(){return this.uniforms.tau.value}setAdaptationRate(e){this.uniforms.tau.value=e}},eI=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,eN=class extends ep{constructor({blendFunction:e,eskil:t=!1,technique:r=1*!!t,offset:i=.5,darkness:n=.5}={}){super("VignetteEffect",eI,{blendFunction:e,defines:new Map([["VIGNETTE_TECHNIQUE",r.toFixed(0)]]),uniforms:new Map([["offset",new X.Uniform(i)],["darkness",new X.Uniform(n)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(e){this.technique!==e&&(this.defines.set("VIGNETTE_TECHNIQUE",e.toFixed(0)),this.setChanged())}get eskil(){return 1===this.technique}set eskil(e){this.technique=1*!!e}getTechnique(){return this.technique}setTechnique(e){this.technique=e}get offset(){return this.uniforms.get("offset").value}set offset(e){this.uniforms.get("offset").value=e}getOffset(){return this.offset}setOffset(e){this.offset=e}get darkness(){return this.uniforms.get("darkness").value}set darkness(e){this.uniforms.get("darkness").value=e}getDarkness(){return this.darkness}setDarkness(e){this.darkness=e}};X.Loader,X.Loader,X.Loader;X.ShaderMaterial;X.ShaderMaterial;var ek=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,eG=class extends X.ShaderMaterial{constructor(e,t,r,i,n=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:X.REVISION.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new X.Uniform(null),depthBuffer:new X.Uniform(null),resolution:new X.Uniform(new X.Vector2),texelSize:new X.Uniform(new X.Vector2),cameraNear:new X.Uniform(.3),cameraFar:new X.Uniform(1e3),aspect:new X.Uniform(1),time:new X.Uniform(0)},blending:X.NoBlending,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:n}),e&&this.setShaderParts(e),t&&this.setDefines(t),r&&this.setUniforms(r),this.copyCameraSettings(i)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=X.BasicDepthPacking){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=ek.replace(eo.FRAGMENT_HEAD,e.get(eo.FRAGMENT_HEAD)||"").replace(eo.FRAGMENT_MAIN_UV,e.get(eo.FRAGMENT_MAIN_UV)||"").replace(eo.FRAGMENT_MAIN_IMAGE,e.get(eo.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}".replace(eo.VERTEX_HEAD,e.get(eo.VERTEX_HEAD)||"").replace(eo.VERTEX_MAIN_SUPPORT,e.get(eo.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(let t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(let t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){for(let t of(this.extensions={},e))this.extensions[t]=!0;return this}get encodeOutput(){return void 0!==this.defines.ENCODE_OUTPUT}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof X.PerspectiveCamera?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){let r=this.uniforms;r.resolution.value.set(e,t),r.texelSize.value.set(1/e,1/t),r.aspect.value=e/t}static get Section(){return eo}};X.ShaderMaterial,X.REVISION.replace(/\D+/g,"");var eO=255/256;function eL(e,t,r){for(let i of t){let t="$1"+e+i.charAt(0).toUpperCase()+i.slice(1),n=RegExp("([^\\.])(\\b"+i+"\\b)","g");for(let e of r.entries())null!==e[1]&&r.set(e[0],e[1].replace(n,t))}}new Float32Array([255/256/0x1000000,255/256/65536,255/256/256,255/256]),new Float32Array([eO,eO/256,eO/65536,1/0x1000000]);var eH=class extends Q{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new eG(null,null,null,e),this.listener=e=>this.handleEvent(e),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=1/0,this.timeScale=1}set mainScene(e){for(let t of this.effects)t.mainScene=e}set mainCamera(e){for(let t of(this.fullscreenMaterial.copyCameraSettings(e),this.effects))t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){let t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(let e of this.effects)e.removeEventListener("change",this.listener);for(let t of(this.effects=e.sort((e,t)=>t.attributes-e.attributes),this.effects))t.addEventListener("change",this.listener)}updateMaterial(){let e=new el,t=0;for(let r of this.effects)if(9===r.blendMode.blendFunction)e.attributes|=1&r.getAttributes();else if((e.attributes&r.getAttributes()&2)!=0)throw Error(`Convolution effects cannot be merged (${r.name})`);else!function(e,t,r){let i=t.getFragmentShader(),n=t.getVertexShader(),s=void 0!==i&&/mainImage/.test(i),a=void 0!==i&&/mainUv/.test(i);if(r.attributes|=t.getAttributes(),void 0===i)throw Error(`Missing fragment shader (${t.name})`);if(a&&(2&r.attributes)!=0)throw Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(s||a){let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=r.shaderParts,u=l.get(eo.FRAGMENT_HEAD)||"",c=l.get(eo.FRAGMENT_MAIN_UV)||"",h=l.get(eo.FRAGMENT_MAIN_IMAGE)||"",d=l.get(eo.VERTEX_HEAD)||"",f=l.get(eo.VERTEX_MAIN_SUPPORT)||"",p=new Set,v=new Set;if(a&&(c+=`	${e}MainUv(UV);
`,r.uvTransformation=!0),null!==n&&/mainSupport/.test(n)){let t=/mainSupport *\([\w\s]*?uv\s*?\)/.test(n);for(let i of(f+=`	${e}MainSupport(`,f+=t?"vUv);\n":");\n",n.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g)))for(let e of i[1].split(/\s*,\s*/))r.varyings.add(e),p.add(e),v.add(e);for(let e of n.matchAll(o))v.add(e[1])}for(let e of i.matchAll(o))v.add(e[1]);for(let e of t.defines.keys())v.add(e.replace(/\([\w\s,]*\)/g,""));for(let e of t.uniforms.keys())v.add(e);v.delete("while"),v.delete("for"),v.delete("if"),t.uniforms.forEach((t,i)=>r.uniforms.set(e+i.charAt(0).toUpperCase()+i.slice(1),t)),t.defines.forEach((t,i)=>r.defines.set(e+i.charAt(0).toUpperCase()+i.slice(1),t));let m=new Map([["fragment",i],["vertex",n]]);eL(e,v,r.defines),eL(e,v,m),i=m.get("fragment"),n=m.get("vertex");let g=t.blendMode;if(r.blendModes.set(g.blendFunction,g),s){null!==t.inputColorSpace&&t.inputColorSpace!==r.colorSpace&&(h+=t.inputColorSpace===X.SRGBColorSpace?"color0 = sRGBTransferOETF(color0);\n	":"color0 = sRGBToLinear(color0);\n	"),t.outputColorSpace!==X.NoColorSpace?r.colorSpace=t.outputColorSpace:null!==t.inputColorSpace&&(r.colorSpace=t.inputColorSpace),h+=`${e}MainImage(color0, UV, `,(1&r.attributes)!=0&&/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/.test(i)&&(h+="depth, ",r.readDepth=!0),h+="color1);\n	";let n=e+"BlendOpacity";r.uniforms.set(n,g.opacity),h+=`color0 = blend${g.blendFunction}(color0, color1, ${n});

	`,u+=`uniform float ${n};

`}if(u+=i+"\n",null!==n&&(d+=n+"\n"),l.set(eo.FRAGMENT_HEAD,u),l.set(eo.FRAGMENT_MAIN_UV,c),l.set(eo.FRAGMENT_MAIN_IMAGE,h),l.set(eo.VERTEX_HEAD,d),l.set(eo.VERTEX_MAIN_SUPPORT,f),null!==t.extensions)for(let e of t.extensions)r.extensions.add(e)}else throw Error(`Could not find mainImage or mainUv function (${t.name})`)}("e"+t++,r,e);let r=e.shaderParts.get(eo.FRAGMENT_HEAD),i=e.shaderParts.get(eo.FRAGMENT_MAIN_IMAGE),n=e.shaderParts.get(eo.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let t of e.blendModes.values())r+=t.getShaderCode().replace(s,`blend${t.blendFunction}`)+"\n";for(let[t,s]of((1&e.attributes)!=0?(e.readDepth&&(i="float depth = readDepth(UV);\n\n	"+i),this.needsDepthTexture=null===this.getDepthTexture()):this.needsDepthTexture=!1,e.colorSpace===X.SRGBColorSpace&&(i+="color0 = sRGBToLinear(color0);\n	"),e.uvTransformation?(n="vec2 transformedUv = vUv;\n"+n,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(eo.FRAGMENT_HEAD,r),e.shaderParts.set(eo.FRAGMENT_MAIN_IMAGE,i),e.shaderParts.set(eo.FRAGMENT_MAIN_UV,n),e.shaderParts))null!==s&&e.shaderParts.set(t,s.trim().replace(/^#/,"\n#"));this.skipRendering=0===t,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=X.BasicDepthPacking){for(let r of(this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t,this.effects))r.setDepthTexture(e,t)}render(e,t,r,i,n){for(let r of this.effects)r.update(e,t,i);if(!this.skipRendering||this.renderToScreen){let n=this.fullscreenMaterial;n.inputBuffer=t.texture,n.time+=i*this.timeScale,e.setRenderTarget(this.renderToScreen?null:r),e.render(this.scene,this.camera)}}setSize(e,t){for(let r of(this.fullscreenMaterial.setSize(e,t),this.effects))r.setSize(e,t)}initialize(e,t,r){for(let i of(this.renderer=e,this.effects))i.initialize(e,t,r);this.updateMaterial(),void 0!==r&&r!==X.UnsignedByteType&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){for(let e of(super.dispose(),this.effects))e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){"change"===e.type&&this.recompile()}},eW=class extends Q{constructor(e,t,{renderTarget:r,resolutionScale:i=1,width:n=eh.AUTO_SIZE,height:s=eh.AUTO_SIZE,resolutionX:a=n,resolutionY:o=s}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new e_(e,t,new X.MeshNormalMaterial);const l=this.renderPass;l.ignoreBackground=!0,l.skipShadowMapUpdate=!0;const u=l.getClearPass();u.overrideClearColor=new X.Color(7829503),u.overrideClearAlpha=1,this.renderTarget=r,void 0===this.renderTarget&&(this.renderTarget=new X.WebGLRenderTarget(1,1,{minFilter:X.NearestFilter,magFilter:X.NearestFilter}),this.renderTarget.texture.name="NormalPass.Target");const c=this.resolution=new eh(this,a,o,i);c.addEventListener("change",e=>this.setSize(c.baseWidth,c.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,i,n){let s=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,s,s)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height)}};function eV(e,t,r,i){var n;return(n=e+(t-e)*.75)+(r+(i-r)*.75-n)*.875}function ej(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1]),new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1]),new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1]),new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1]),new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1]),new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1]),new Float32Array(2),new Float32Array(2),new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125]),new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4]),new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3]),eV(0,0,0,0),new Float32Array([0,0,0,0]),eV(0,0,0,1),new Float32Array([0,0,0,1]),eV(0,0,1,0),new Float32Array([0,0,1,0]),eV(0,0,1,1),new Float32Array([0,0,1,1]),eV(0,1,0,0),new Float32Array([0,1,0,0]),eV(0,1,0,1),new Float32Array([0,1,0,1]),eV(0,1,1,0),new Float32Array([0,1,1,0]),eV(0,1,1,1),new Float32Array([0,1,1,1]),eV(1,0,0,0),new Float32Array([1,0,0,0]),eV(1,0,0,1),new Float32Array([1,0,0,1]),eV(1,0,1,0),new Float32Array([1,0,1,0]),eV(1,0,1,1),new Float32Array([1,0,1,1]),eV(1,1,0,0),new Float32Array([1,1,0,0]),eV(1,1,0,1),new Float32Array([1,1,0,1]),eV(1,1,1,0),new Float32Array([1,1,1,0]),eV(1,1,1,1),new Float32Array([1,1,1,1]);new o.Vector2,new o.Vector2;function e$(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}var eq=function e(t,r,i){var n=this;e$(this,e),ej(this,"dot2",function(e,t){return n.x*e+n.y*t}),ej(this,"dot3",function(e,t,r){return n.x*e+n.y*t+n.z*r}),this.x=t,this.y=r,this.z=i},eX=[new eq(1,1,0),new eq(-1,1,0),new eq(1,-1,0),new eq(-1,-1,0),new eq(1,0,1),new eq(-1,0,1),new eq(1,0,-1),new eq(-1,0,-1),new eq(0,1,1),new eq(0,-1,1),new eq(0,1,-1),new eq(0,-1,-1)],eK=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],eQ=Array(512),eZ=Array(512),eY=0;(eY=Math.floor(eY))<256&&(eY|=eY<<8);for(var eJ,e0=0;e0<256;e0++)eJ=1&e0?eK[e0]^255&eY:eK[e0]^eY>>8&255,eQ[e0]=eQ[e0+256]=eJ,eZ[e0]=eZ[e0+256]=eX[eJ%12];function e1(e){var t=function(e){if("number"==typeof e)e=Math.abs(e);else if("string"==typeof e){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%0x7fffffff}return 0===e&&(e=311),e}(e);return function(){var e=48271*t%0x7fffffff;return t=e,e/0x7fffffff}}new function e(t){var r=this;e$(this,e),ej(this,"seed",0),ej(this,"init",function(e){r.seed=e,r.value=e1(e)}),ej(this,"value",e1(this.seed)),this.init(t)}(Math.random());var e2=o;new e2.OrthographicCamera(-1,1,1,-1,0,1);class e3 extends e2.BufferGeometry{constructor(){super(),this.setAttribute("position",new e2.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new e2.Float32BufferAttribute([0,2,0,0,2,0],2))}}function e4(e){return e&&e.__esModule?e.default:e}new e3,o.BufferGeometry;var e5={};e5=JSON.parse('{"architecture":"attention-v3-int8","formatVersion":3,"globalBias":[-0.32877659797668457,0.4370867609977722,-0.05251404270529747,1.3072023391723633,0.0477047860622406,0.24477416276931763,0.009111796505749226,-0.17459993064403534],"globalFeatureInverseStandardDeviation":[10.771836280822754,1.9548665285110474,1.612365484237671],"globalFeatureMean":[0.9198138117790222,-0.49808526039123535,0.03374629095196724],"globalWeights":[101,-4,7,-127,6,-11,3,1,0,-16,-7,8,-8,-1,7,-4,0,0,-12,-3,-13,1,0,2],"headBias":[-0.15895532071590424,0.007501596584916115,-0.47742825746536255,0.01632097363471985,-0.48355796933174133,-0.1052703931927681,-0.8414919376373291,-0.21046382188796997],"headWeights":[-45,-7,-45,-20,7,-13,120,-24,-15,-26,-19,1,27,-48,-4,-10,1,-5,-24,64,91,-1,-68,39,54,39,101,-40,-127,64,-41,-17,-23,-19,3,35,-2,33,3,9,-64,-32,30,42,-112,12,28,-11,15,2,-4,-7,7,-3,-5,1,76,48,-34,-67,103,-40,-26,1,58,-11,46,-41,5,-6,-17,-8,13,17,-35,45,27,-17,-28,7,-53,12,-51,6,-32,-5,58,-9,-28,-21,37,-12,1,20,2,2,11,7,-4,-9,2,-15,-1,-8,16,12,-27,-1,61,-5,-1,4,-7,-2,7,4,1,4,-2,4,-18,-16,28,6,-65,16,3,-3,-5,-2,0,-40,-21,-22,14,30,-21,49,15,-64,43,19,23,18,5,-15,21,21,30,17,-11,-6,22,-38,-20,97,-46,-5,-13,-59,26,-13,11,-2,-10,-8,2,-15,-17,-27,-9,26,7,-7,6,9,-32,5,-9,12,49,17,-1,24,20,35,14,-33,-50,-1,-4,-26,11,11,9,-80,30,9,36,6,-12,-4,-7,39,-10,-30,-49,1,-43,-20,-34,76,-36,-10,15,-8,43,31,38,-42,39,37,-7,7,8,16,28,-83,32,9,23,-13,39,119,23,-127,-24,8,-48,-29,-7,-33,-12,58,-24,-29,-19,12,-55,-90,0,126,26,42,54,22],"keyProjectionWeights":[0,-1,-1,1,1,1,1,1,-64,32,49,23,-25,4,27,-22,0,1,-1,-1,-1,1,1,0,-34,38,64,88,13,-53,-41,58,-7,-4,79,-41,27,26,14,2,-2,1,1,1,-1,-1,1,1,1,-1,-1,-1,-1,-1,1,1,4,-3,126,42,-40,-116,35,20],"name":"residual-attention-v3-50m-qat-int8-epoch-25-zo-278w","outputBias":-0.0005526235327124596,"outputWeights":[11,11,14,-27,9,-22,127,6],"quantization":{"scales":{"globalWeight":0.021090541950849095,"headWeight":0.04935851140909355,"keyWeight":0.1733924937791441,"outputWeight":0.0030087142047955295,"tapInputWeight":0.1096231754049479,"tapOutputWeight":0.017949438644286102,"valueWeight":0.013986751242596301},"scheme":"symmetric-int8-per-tensor","zeroPoint":0},"summaryQueries":[0.0038647791370749474,0.09565000981092453,0.002756686182692647,-0.08183622360229492,-0.15209506452083588,-0.0006105066277086735,0.0010439646430313587,-0.03020688332617283,0.005065929610282183,0.14488759636878967,0.003160916268825531,-0.0855727270245552,-0.3123375475406647,0.00039022407145239413,0.0037786494940519333,0.1451321840286255,-0.002009483054280281,0.0597594790160656,0.0045239729806780815,-0.08765853196382523,-0.13884992897510529,-0.0021647117100656033,0.003985927440226078,0.09727758169174194,0.007170629221946001,0.0786278173327446,0.004103775601834059,-0.1198369711637497,-0.2925199568271637,-0.002055276418104768,0.0030450925696641207,0.14401987195014954],"supportedDenoiseSamples":[4,8,16],"tapFeatureInverseStandardDeviation":[2.283243417739868,0.8810898065567017,0.8210930228233337,3.752316474914551,3.6375720500946045,2.670454978942871,10.249449729919434,0.12639354169368744,100],"tapFeatureMean":[0.010318092070519924,0.01364430133253336,0.13411010801792145,-0.004725644364953041,0.10053129494190216,0.8384788632392883,0.9203217625617981,1.7139031887054443,1],"tapInputBias":[0.4780646860599518,-0.45214661955833435,0.289407879114151,0.34804567694664,-0.1320028454065323,0.17722633481025696,0.011480014771223068,-0.26692497730255127],"tapInputWeights":[0,1,7,0,-1,-7,0,31,-2,-1,14,-126,0,0,-1,2,26,-2,0,66,-73,0,0,0,-12,22,-3,0,-76,-90,0,-1,-7,-3,58,-1,0,2,6,0,0,3,4,-40,0,0,3,-13,0,0,1,-7,-13,0,0,-7,10,0,-2,-7,0,-39,-2,0,-13,-19,0,-2,20,-1,3,-1],"tapOutputBias":[-0.3867710530757904,0.1349504142999649,0.35706064105033875,-0.5938405394554138,-0.031154220923781395,1.4079623222351074,-1.9221038818359375,0.6029739379882812],"tapOutputWeights":[18,-4,47,19,74,-94,-21,-9,73,-59,88,-10,-3,71,-7,24,20,74,24,-31,-12,-10,-15,-45,-126,2,-4,27,-5,24,35,-11,-4,9,-8,26,-10,27,26,-20,17,-50,5,-35,0,-5,12,-71,89,-58,22,-83,-115,7,-16,-89,89,22,1,-20,-22,-25,-26,44],"valueProjectionWeights":[-16,-6,40,-17,84,-76,59,51,-10,-2,-10,-1,-23,74,-70,23,-5,4,4,-7,-77,127,20,-48,-36,4,-17,-12,-4,10,29,-27,-2,11,-47,-50,-54,-3,14,11,-23,-1,109,31,4,-100,-33,-36,-19,0,-8,20,-35,-24,79,2,44,2,5,7,22,-70,-67,-35]}');let e8=[["tapInputWeight","tapInputWeights",8,9],["tapOutputWeight","tapOutputWeights",8,8],["globalWeight","globalWeights",8,3],["keyWeight","keyProjectionWeights",8,8],["valueWeight","valueProjectionWeights",8,8],["headWeight","headWeights",8,32],["outputWeight","outputWeights",1,8]],e6=e=>{let t=e4(e5).quantization?.scales?.[e];if(!(t>0)||!Number.isFinite(t))throw Error(`The bundled N8AO neural model has no valid ${e} scale.`);return t};if("attention-v3-int8"!==e4(e5).architecture||3!==e4(e5).formatVersion||e4(e5).quantization?.scheme!=="symmetric-int8-per-tensor"||e4(e5).quantization?.zeroPoint!==0||e4(e5).supportedDenoiseSamples?.join(",")!=="4,8,16"||e8.some(([,e,t,r])=>e4(e5)[e]?.length!==t*r||e4(e5)[e].some(e=>!Number.isInteger(e)||e<-127||e>127)))throw Error("The bundled N8AO neural denoise model has an unsupported layout.");let e7=e=>{if(!Number.isFinite(e))throw Error("The bundled N8AO neural model contains a non-finite value.");if(Object.is(e,-0))return"0.0";let t=Number(e).toString();return/[.eE]/.test(t)?t:`${t}.0`},e9=["x","y","z","w"],te=e=>[...e9.map(t=>`${e}.lo.${t}`),...e9.map(t=>`${e}.hi.${t}`)],tt=e=>e.filter(Boolean).join(" + ")||"0.0",tr=(e,t,r,i,n,s)=>{let a=i.map((i,n)=>{var s;return s=e[t*r+n],0===s?null:1===s?i:-1===s?`(-${i})`:s<0?`(-${e7(-s)} * ${i})`:`${e7(s)} * ${i}`});return`${e7(n)} * (${tt(a)}) + ${e7(s[t])}`},ti=(e,t="        ")=>`vec4(
${e.map(e=>`${t}    ${e}`).join(",\n")}
${t})`,tn=({functionName:e,scaleName:t,weights:r,bias:i,width:n=8,relu:s=!1})=>{let a=te("inputToken"),o=e6(t),l=Array.from({length:8},(e,t)=>tr(r,t,n,a,o,i)),u=ti(l.slice(0,4)),c=ti(l.slice(4)),h=e=>s?`max(${e}, vec4(0.0))`:e;return`
    NeuralToken neural${e[0].toUpperCase()}${e.slice(1)}(NeuralToken inputToken) {
        return NeuralToken(
            ${h(u)},
            ${h(c)}
        );
    }
`},ts=(e,t,r,i,n,s,a,o={})=>Array.from({length:n},(n,l)=>{let u=t[l];for(let t=0;t<s;t++){let n=e[l*s+t]*a;u-=n*i[t]*r[t],Object.hasOwn(o,t)&&(u+=n*i[t]*o[t])}return u}),ta=e6("tapInputWeight"),to=ts(e4(e5).tapInputWeights,e4(e5).tapInputBias,e4(e5).tapFeatureMean,e4(e5).tapFeatureInverseStandardDeviation,8,9,ta,{8:1}),tl=te("scaledInput"),tu=Array.from({length:8},(e,t)=>tr(e4(e5).tapInputWeights,t,9,tl,ta,to)),tc=`
    NeuralToken neuralTapInput(NeuralToken raw) {
        NeuralToken scaledInput = NeuralToken(
            raw.lo * ${ti(e4(e5).tapFeatureInverseStandardDeviation.slice(0,4),"            ")},
            raw.hi * ${ti(e4(e5).tapFeatureInverseStandardDeviation.slice(4,8),"            ")}
        );
        return NeuralToken(
            max(${ti(tu.slice(0,4))}, vec4(0.0)),
            max(${ti(tu.slice(4))}, vec4(0.0))
        );
    }
`,th=e6("globalWeight"),td=ts(e4(e5).globalWeights,e4(e5).globalBias,e4(e5).globalFeatureMean,e4(e5).globalFeatureInverseStandardDeviation,8,3,th),tf=e9.slice(0,3).map(e=>`scaledInput.${e}`),tp=Array.from({length:8},(e,t)=>tr(e4(e5).globalWeights,t,3,tf,th,td)),tv=`
    NeuralToken neuralEncodeGlobal(vec4 raw) {
        vec3 scaledInput = raw.xyz * vec3(
            ${e4(e5).globalFeatureInverseStandardDeviation.map(e7).join(", ")}
        );
        return NeuralToken(
            max(${ti(tp.slice(0,4))}, vec4(0.0)),
            max(${ti(tp.slice(4))}, vec4(0.0))
        );
    }
`,tm=te("key"),tg=Array.from({length:4},(e,t)=>tt(tm.map((e,r)=>{var i;return i=e4(e5).summaryQueries[8*t+r],0===i?null:`${e7(i)} * ${e}`}))),tx=`
    vec4 neuralQueryScores(NeuralToken key) {
        return ${ti(tg)};
    }
`,tS=[];for(let e=0;e<4;e++)tS.push(...e9.map(t=>`runningSummaryLo[${e}].${t}`),...e9.map(t=>`runningSummaryHi[${e}].${t}`));let ty=e6("headWeight"),tT=Array.from({length:8},(e,t)=>tr(e4(e5).headWeights,t,32,tS,ty,e4(e5).headBias)),tw=`
    NeuralToken neuralHead(
        vec4 runningSummaryLo[4],
        vec4 runningSummaryHi[4]
    ) {
        return NeuralToken(
            max(${ti(tT.slice(0,4))}, vec4(0.0)),
            max(${ti(tT.slice(4))}, vec4(0.0))
        );
    }
`,tb=tr(e4(e5).outputWeights,0,8,te("head"),e6("outputWeight"),[e4(e5).outputBias]),tM=`
    float neuralOutput(NeuralToken head) {
        return ${tb};
    }
`;[tc,tn({functionName:"tapOutput",scaleName:"tapOutputWeight",weights:e4(e5).tapOutputWeights,bias:e4(e5).tapOutputBias,relu:!0}),tv,tn({functionName:"keyProject",scaleName:"keyWeight",weights:e4(e5).keyProjectionWeights,bias:Array(8).fill(0)}),tn({functionName:"valueProject",scaleName:"valueWeight",weights:e4(e5).valueProjectionWeights,bias:Array(8).fill(0)}),tx,tw,tM].join("\n"),e8.reduce((e,[,t])=>e+e4(e5)[t].length,0),e8.reduce((e,[,t])=>e+e4(e5)[t].filter(e=>0!==e).length,0),parseInt(o.REVISION.replace(/\D+/g,"")),o.WebGLRenderTarget;var tB=new WeakMap,tU=0,tE=["blendMode-blendFunction","blendMode-opacity-value"];function tR(e){return function({blendFunction:t,opacity:r,ref:i,...a}){let o=tB.get(e);if(!o){let t=`@react-three/postprocessing/${e.name}-${tU++}`;(0,z.e)({[t]:e}),tB.set(e,o=t)}let l=(0,u.useThree)(e=>e.camera),c=(0,s.useRef)(null),h=(0,s.useCallback)(e=>{if(c.current=e,"function"!=typeof i){i&&(i.current=e);return}let t=i(e);if("function"==typeof t)return()=>{c.current=null,t()}},[c,i]);return!function(e,t,r,i=function(e,t){let r=e;for(let e of t.split("-")){if(null==r)return;r=r[e]}return r},n=function(e,t,r){let i=t.split("-"),n=e;for(let e=0;e<i.length-1;e++){if(null==n)return;n=n[i[e]]}null!=n&&(n[i[i.length-1]]=r)}){let a=(0,s.useRef)(null),o=(0,u.useThree)(e=>e.invalidate);(0,s.useLayoutEffect)(()=>{let s="object"==typeof e&&null!=e&&"current"in e?e.current:e;if(!s)return;a.current?.instance!==s&&(a.current={instance:s,defaults:new Map,applied:new Map});let{defaults:l,applied:u}=a.current,c=!1;for(let e of r){if(!l.has(e)){let t=i(s,e);l.set(e,t),u.set(e,t)}let r=void 0!==t[e]?t[e]:l.get(e);Object.is(u.get(e),r)||(n(s,e,r),u.set(e,r),c=!0)}c&&o()})}(c,{"blendMode-blendFunction":t,"blendMode-opacity-value":r},tE),(0,n.jsx)(o,{ref:h,camera:l,...a})}}var t_=(0,s.createContext)(null),tA=e=>(2&e.getAttributes())==2;function tD(e){let t=new WeakMap;return{acquire(r,i){let n=t.get(r);n?(n.count++,n.forcedValue=i):t.set(r,{count:1,original:r[e],forcedValue:i})},release(r){let i=t.get(r);i&&--i.count<=0&&(r[e]===i.forcedValue&&(r[e]=i.original),t.delete(r))}}}var tF=tD("autoClear"),tC=tD("toneMapping"),tP=new o.Vector2,tz=(e,t)=>new e_(e,t),tI=new WeakSet,tN=new WeakSet;function tk(e){tI.has(e)&&(e instanceof eH&&e.setEffects([]),Q.prototype.dispose.call(e))}var tG=(0,s.memo)(function({children:e,camera:t,scene:r,resolutionScale:i,enabled:a=!0,renderPriority:c=1,autoClear:h=!0,autoRenderToScreen:d=!0,depthBuffer:f,enableNormalPass:p,stencilBuffer:v,multisampling:m=8,frameBufferType:g=o.HalfFloatType,renderPass:x=tz,mergeMode:S="auto",ref:y}){let{gl:T,scene:w,camera:b}=(0,u.useThree)(),M=r||w,B=t||b;T.getSize(tP);let[U,E]=(0,s.useState)(null),[,R]=(0,s.useReducer)(e=>e+1,0);(0,s.useEffect)(()=>{tF.acquire(T,!1);let e=new ea(T,{depthBuffer:f,stencilBuffer:v,multisampling:m,frameBufferType:g});e.autoRenderToScreen=d,e.addPass(x(M,B));let t=null,r=null;return p&&((t=new eW(M,B)).enabled=!1,e.addPass(t),void 0!==i&&((r=new eF({normalBuffer:t.texture,resolutionScale:i})).enabled=!1,e.addPass(r))),e.setSize(tP.width,tP.height),E({composer:e,normalPass:t,downSamplingPass:r}),()=>{for(let t of e.passes)tk(t);e.dispose(),tF.release(T)}},[B,T,f,v,m,g,d,x,M,p,i]);let _=(0,s.useRef)({width:-1,height:-1});(0,l.useFrame)((e,t)=>{if(!a||!U)return;let{composer:r}=U;T.getSize(tP),(tP.width!==_.current.width||tP.height!==_.current.height)&&(r.setSize(tP.width,tP.height),_.current.width=tP.width,_.current.height=tP.height);let i=T.autoClear;T.autoClear=h,v&&!h&&T.clearStencil(),r.render(t),T.autoClear=i},a?c:0);let A=(0,s.useRef)(null),D=(0,s.useRef)([]),[F,C]=(0,s.useState)(0);(0,s.useLayoutEffect)(()=>{var e,t;let r,i;if(!U)return;let n=(e=A.current,t=e=>e instanceof ep||e instanceof Q,(r=e.__r3f)?r.children.map(e=>e.object).filter(t):[]);i=D.current,!(n.length===i.length&&n.every((e,t)=>e===i[t]))&&(D.current=n,1)&&C(e=>e+1)}),(0,s.useLayoutEffect)(()=>{if(!U)return;let{composer:e,normalPass:t,downSamplingPass:r}=U,i=function(e,t,r){let i=[];for(let n=0;n<e.length;n++){let s=e[n];if(s instanceof ep){let a=[s],o=tA(s);if("none"!==r){let t;for(;(t=e[n+1])instanceof ep;){let e=tA(t);if("auto"===r&&o&&e)break;a.push(t),o||=e,n++}}let l=new eH(t,...a);tI.add(l),i.push(l)}else s instanceof Q&&i.push(s)}return i}(D.current,B,S);if(i.some(e=>tN.has(e))){let e=new et;tI.add(e),i.push(e)}for(let t of i)e.addPass(t);return i.length&&(t&&(t.enabled=!0),r&&(r.enabled=!0)),()=>{for(let t of i)e.removePass(t),tk(t);t&&(t.enabled=!1),r&&(r.enabled=!1)}},[U,F,B,S]),(0,s.useEffect)(()=>(tC.acquire(T,o.NoToneMapping),T.toneMapping=o.NoToneMapping,()=>{tC.release(T)}),[T]);let P=(0,s.useMemo)(()=>U?{composer:U.composer,normalPass:U.normalPass,downSamplingPass:U.downSamplingPass,resolutionScale:i,camera:B,scene:M,requestRebuild:R,autoClear:h}:null,[U,i,B,M,R,h]);return((0,s.useImperativeHandle)(y,()=>U?.composer,[U]),P)?(0,n.jsx)(t_.Provider,{value:P,children:(0,n.jsx)("group",{ref:A,children:e})}):null}),tO=tR(eR);function tL({blendFunction:e=0,luminanceThreshold:t,luminanceSmoothing:r,mipmapBlur:i,radius:a,levels:o,resolutionScale:l,resolutionX:u,resolutionY:c,...h}){let d=(0,s.useMemo)(()=>[{luminanceThreshold:t,luminanceSmoothing:r,mipmapBlur:i,radius:a,levels:o,resolutionScale:l,resolutionX:u,resolutionY:c}],[t,r,i,a,o,l,u,c]);return(0,n.jsx)(tO,{blendFunction:e,args:d,...h})}var tH=tR(eN);function tW(){let e=0===h.fx.quality;return(0,n.jsxs)(tG,{multisampling:0,enableNormalPass:!1,children:[(0,n.jsx)(tL,{mipmapBlur:!0,intensity:e?.35:.55,luminanceThreshold:.82,luminanceSmoothing:.2,radius:.65}),(0,n.jsx)(tH,{eskil:!1,offset:.15,darkness:.9})]})}e.s(["default",0,function(){let[e,t]=(0,s.useState)(!0),[r,i]=(0,s.useState)(!0),[o]=(0,s.useState)(()=>{let e=window.innerWidth<768||void 0!==navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4||/Android|iPhone|iPad/i.test(navigator.userAgent);return h.fx.quality=+!e,e});(0,s.useEffect)(()=>{let e=e=>{h.fx.mouse.x=e.clientX/window.innerWidth*2-1,h.fx.mouse.y=-(e.clientY/window.innerHeight*2-1)},r=()=>{let e=window.innerHeight;h.fx.scroll=Math.min(1,Math.max(0,window.scrollY/e)),t(window.scrollY<1.3*e)},n=()=>i(window.innerWidth/window.innerHeight>1.05);return r(),n(),window.addEventListener("pointermove",e,{passive:!0}),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("pointermove",e),window.removeEventListener("scroll",r),window.removeEventListener("resize",n)}},[]);let l=1.85*!!r;return(0,n.jsxs)(a.Canvas,{className:"hero-canvas",frameloop:e?"always":"never",dpr:[1,1.6],camera:{position:[0,.2,13],fov:42,near:.1,far:60},gl:{antialias:!0,powerPreference:"high-performance",alpha:!1,stencil:!1},style:{position:"absolute",inset:0},children:[(0,n.jsx)("color",{attach:"background",args:["#050506"]}),(0,n.jsx)("fog",{attach:"fog",args:["#050506",12,30]}),(0,n.jsx)("ambientLight",{intensity:.5}),(0,n.jsx)("directionalLight",{position:[l+3,4,6],intensity:1.1,color:"#ffffff"}),(0,n.jsx)("directionalLight",{position:[-4,-2,4],intensity:.4,color:"#94a3b8"}),(0,n.jsx)("pointLight",{position:[l,2,4],intensity:3.5,color:"#ffffff",distance:12}),(0,n.jsx)(q,{}),(0,n.jsx)(S,{position:[l,.15,0],scale:r?.95:.78}),(0,n.jsx)(E,{position:[l,.15,0]}),(0,n.jsx)(F,{count:o?40:80}),(0,n.jsx)(C,{count:o?80:160}),(0,n.jsx)(j,{y:-2.7}),(0,n.jsx)(tW,{})]})}],1624)},47730,function(e){e.n(e.i(1624))}]);