import { AdditiveBlending, Color, Vector3 } from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

// Crisp crescent on the lit edge of the sphere.
const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float edge = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 3.2);
    float lit = smoothstep(-0.25, 0.85, dot(n, normalize(uLight)));
    vec3 c = uColor * edge * lit * 1.7;
    gl_FragColor = vec4(c, clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0));
  }
`

// Soft atmosphere on a larger back-faced shell; brighter on the lit side.
const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float d = max(dot(-n, normalize(vView)), 0.0);
    float glow = pow(d, 2.5) * 6.5;
    float lit = mix(0.3, 1.0, smoothstep(-0.4, 0.8, dot(n, normalize(uLight))));
    vec3 c = uColor * glow * lit;
    gl_FragColor = vec4(c, clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0));
  }
`

/** Key light direction in view space, matching the upper-left light in the static SVG. */
const lightDir = new Vector3(-0.55, 0.6, 0.58).normalize()

const shared = {
  vertexShader,
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,
  toneMapped: false,
}

export const rimMaterialParams = {
  ...shared,
  fragmentShader: rimFragment,
  uniforms: { uColor: { value: new Color('#cfc4ff') }, uLight: { value: lightDir } },
}

export const atmosphereMaterialParams = {
  ...shared,
  fragmentShader: atmosphereFragment,
  uniforms: { uColor: { value: new Color('#6a4dff') }, uLight: { value: lightDir } },
}
