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

#define BEATMOVE 1

const float FREQ_RANGE = 1024.0;
const float PI = 3.1415;
const float RADIUS = 0.6;
const float BRIGHTNESS = 0.2;
const float SPEED = 0.2;

//convert HSV to RGB
vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float getfrequency(float x) {
    return texture(audio, vec2(floor(x * FREQ_RANGE + 1.0) / FREQ_RANGE, 0.0)).x + 0.06;
}

float getfrequency_smooth(float x) {
    float index = floor(x * FREQ_RANGE) / FREQ_RANGE;
    float next = floor(x * FREQ_RANGE + 1.0) / FREQ_RANGE;
    return mix(getfrequency(index), getfrequency(next), smoothstep(0.0, 1.0, fract(x * FREQ_RANGE)));
}

float getfrequency_blend(float x) {
    return mix(getfrequency(x), getfrequency_smooth(x), 0.5);
}

vec3 doHalo(vec2 fragment, float radius) {
    float dist = length(fragment);
    float ring = 1.0 / (abs(dist - radius) + 0.005);
    
    float b = dist < radius ? BRIGHTNESS * 0.6 : BRIGHTNESS;
    
    vec3 col = vec3(0.0);
    
    float angle = atan(fragment.x, fragment.y);
    col += hsv2rgb( vec3( ( angle + time * 0.25 ) / (PI * 2.0), 0.6, 0.5 ) ) * ring * b;
    
    float frequency = max(getfrequency(abs(angle / PI)) - 0.02, 0.0);
    col *= frequency * 0.5;
    
    // Black halo
    col *= smoothstep(radius * 0.86, radius, dist);
    
    return col;
}

vec3 doLine(vec2 fragment, float radius, float x) {
    vec3 col = hsv2rgb(vec3(x * 0.23 + time * 0.12, 1.0, 1.0));
    
    float freq = abs(fragment.x * 0.5);
    
    col *= (1.0 / abs(fragment.y)) * BRIGHTNESS * getfrequency(freq);
    col = col * smoothstep(radius, radius * 1.8, abs(fragment.x));
    
    return col;
}


void main() {
    vec2 fragPos = gl_FragCoord.xy / resolution.xy;
    
    if (scene == 0.0) {
        fragPos = (fragPos - 0.5) * 2.0 * sin(time);
    } else if (scene == 1.0) {
        fragPos = (fragPos - 0.5) * 2.0;
    }
    
    fragPos.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0134, 0.052, 0.1);
    color += doHalo(fragPos, RADIUS);

    float c = cos(time * SPEED);
    float s = sin(time * SPEED);
    vec2 rot = mat2(c,s,-s,c) * fragPos;
    
    color += max(luma(color) - 1.0, 0.0);
    
    gl_FragColor = vec4(color, 1.0);
}`.trim();
