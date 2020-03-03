export const SunVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const SunFS = `
uniform vec2 resolution;
uniform float time;

}

void main(void){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 st = gl_FragCoord.xy / resolution;
    
    // blue
    // vec3 top = vec3(0.0, 0.05, 0.16);
    // vec3 bottom = vec3(0.5, 0.98, 0.99);
    // red
    vec3 top = vec3(0.52, 0.53, 0.57);
    vec3 bottom = vec3(0.80, 0.39, 0.25);
    vec3 grad = mix(top, bottom, smoothstep(1.1, 0.4, st.y));
    vec3 skyColor = vec3(step(0.0, st.y) * grad) + mix(grad, vec3(0.0), p.y);

    vec2 psun = p;
    psun.x -= 1.0 * resolution.x / max(resolution.x, resolution.y);
    psun.y -= 0.3;
    
    vec2 np = gl_FragCoord.xy;
    float nx = np.x * 0.002;
    float ny = np.y * 0.002;
    float nz = time * 0.5;
    float n = snoise(vec3(nx, ny, nz));
    n = (1.0 + n) * 0.02;

    float lsun = 1.0 - length(vec2(psun.x + n, psun.y)) * 1.5;
    vec3 sun = vec3(smoothstep(0.5, 0.7, lsun) * lsun);
    
    vec3 color = skyColor;

    gl_FragColor = vec4(color, 1.0);
}
`.trim();
