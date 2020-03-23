export const pVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const pFS = `
vec2 hr = vec2(1.0, sqrt(3.0));
uniform float time;
uniform vec2 resolution;
uniform float decay;

vec4 hg (vec2 uv, float d) {
    uv *= d;
    vec2 ga = mod(uv, hr) - hr * 0.5;
    vec2 gb = mod(uv - hr * 0.5, hr) - hr * 0.5;
    vec2 guv = dot(ga,ga) < dot(gb,gb) ? ga : gb;
    vec2 gid = uv - guv;
    
    vec2 gg = abs(guv);
    guv.y = 0.5 - max(gg.x, dot(gg, normalize(hr)));
    return vec4(guv, gid);
}

vec2 hid;

float dm (vec2 uv) {
    vec4 hs = hg(uv, 10.0);
    hid = hs.zw;
    return smoothstep(0.012, 0.015, hs.y) * sin(length(hid) - time);
}

float od (vec3 p, float d) {
    return dot(p, normalize(sign(p))) -d;
}

float room (vec3 p) {
    return od(p, 7.0);
}

float water (vec3 p) {
    p.y += 2.0;
    p.y += dm(p.xz) * 0.2;
    return abs(p.y)-0.5;
}

float SDF(vec3 p) {
    return min(room(p), water(p));
}

void main() {
    vec2 uv = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.y);
    uv -= 0.5;
    uv /= vec2(resolution.y / resolution.x, 1.0);
    
    vec3 color = vec3(0.0);
    color = vec3(dm(uv)) * decay;
    gl_FragColor = vec4(color, 1.0);
}`.trim();
