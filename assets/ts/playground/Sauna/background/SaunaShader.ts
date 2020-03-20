export const SaunaVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const SaunaFS = `
uniform vec2 resolution;

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 st = gl_FragCoord.xy / resolution;
    vec3 top = vec3(0.52, 0.53, 0.57);
    vec3 bottom = vec3(0.80, 0.39, 0.25);
    vec3 grad = mix(top, bottom, smoothstep(1.1, 0.4, st.y));
    vec3 skyColor = vec3(step(0.0, st.y) * grad) + mix(grad, vec3(0.0), p.y);
    
    float l = length(p);
    
    gl_FragColor = vec4(skyColor - vec3(l), 1.0);
}
`.trim();
