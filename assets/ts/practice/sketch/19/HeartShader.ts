export const CircleVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const CircleFS = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D audio;
uniform float scene;

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / resolution.y;
    
    vec3 color = vec3(0.0);
    float radius = 0.25;
    
    uv.x *= 0.7;
    uv.y -= sqrt(abs(uv.x))*0.5;
    uv.y += 0.1;
    float distance = length(uv);
    
    float c = smoothstep(r, r, d);
    color = vec3(c);
    
    gl_FragColor = vec4(color, 1.0);
}`.trim();
