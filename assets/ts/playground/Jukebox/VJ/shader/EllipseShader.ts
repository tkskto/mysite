export const EllipseVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const EllipseFS = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D audio;
uniform float decay;

float amp(float freq) {
    return texture2D(audio, vec2(freq / 512.0)).x;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    float ratio = resolution.y / resolution.x;
    float c = 1.0;
    
    for (int i=0; i<100; i++) {
        float a = 6.0 * amp(float(i)) * amp(float(i)) * amp(float(i)) * amp(float(i)) + 2.0;
        vec2 center = 0.5 + 0.03 * vec2(sin(float(i)), cos(float(i))*ratio);
        vec2 vec = (uv - center) * vec2(1.0, ratio) * a * 1.1 *sin(float(i) / 40.0);
        c -= 0.19 * step(0.491, length(vec)) * step(0.5, 1.0-length(vec));
    }
    
    vec3 color = vec3(0.35, 0.85713, 0.553123)+c;
    
    gl_FragColor = vec4(color*decay, 1.0);
}`.trim();
