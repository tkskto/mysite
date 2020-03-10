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

vec3 halo(vec2 fragment, float radius) {
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

void main() {
    vec2 fragPos = gl_FragCoord.xy / resolution.xy;
    vec2 uv = gl_FragCoord.xy / resolution.yy-vec2(.9,.5);
    vec3 colorize = vec3(.2);
    
    if (scene == 0.0) {
        fragPos = (fragPos - 0.5) * 2.0 * sin(time);
    } else {
        fragPos = (fragPos - 0.5) * 2.0;
    }

    fragPos.x *= resolution.x / resolution.y;

    vec3 color = vec3(0.0134, 0.052, 0.1);
    color += halo(fragPos, RADIUS);

    float co = cos(time * SPEED);
    float si = sin(time * SPEED);
    vec2 rot = mat2(co,si,-si,co) * fragPos;

    color += max(luma(color) - 1.0, 0.0);
    
    // dot
    // vec3 color = vec3(0.0134, 0.052, 0.1);
    if (scene == 0.0 || scene == 1.0 || scene == 2.0) {
        for (float i = .0; i< 1.0; i+=.05) {
            colorize[int(i * 5.0)] += texture(audio, vec2(i,0.0)).y * pow(i+.5,.9);
        }
    
        colorize = normalize(colorize);
        float boost = texture(audio,vec2(.0)).x;
        float power = pow(boost,2.0);
    
        vec2 buv = uv*(1.0+power*power*power);
        buv += vec2(pow(power,12.0)*.1,time*.05);
    
        vec2 blocks = mod(buv, vec2(.1))-vec2(.05);
        vec2 blocksid = sin((buv - mod(buv,vec2(.1)))*412.07);
    
        float blockint = texture(audio, blocksid,-48.0).y;
        float oint = blockint = - texture(audio,vec2(blockint-.02,.0)).x+2.0*texture(audio,vec2(blockint,.0)).x - texture(audio,vec2(blockint+.02,.0)).x;
        blockint = 1.0;
        color += 2.0 * blockint * max(.0, min(1.0, (oint * 0.05 - max(abs(blocks.x),abs(blocks.y))) * 100.0)) * colorize;
    }
    
    gl_FragColor = vec4(color, 1.0);
}`.trim();
