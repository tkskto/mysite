export const IcosaVS = `
uniform sampler2D audio;
varying vec3 vNormal;
varying mat4 vMatrix;

const float FREQ_RANGE = 412.0;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float getfrequency(float x) {
    return texture(audio, vec2(floor(x * FREQ_RANGE + 1.0) / FREQ_RANGE, 0.0)).x + 0.06;
}

#include <morphtarget_pars_vertex>

void main() {
    vNormal = normal;
    
    #include <begin_vertex>
    #include <morphtarget_vertex>
    
    // float freq = getfrequency(abs(position.x * FREQ_RANGE));
    transformed += normal * texture(audio, uv.xy / FREQ_RANGE * float(gl_VertexID)).xyz * 6.0;
    
    vec4 pos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
    
    gl_Position = pos;
}`.trim();

export const IcosaFS = `
varying vec3 vNormal;
varying mat4 vMatrix;
void main() {
    vec4 light = vec4(normalize(vec3(0.57703)), 1.0);
    light = light * vMatrix;
    float diff = clamp(dot(vNormal, light.xyz), 0.1, 1.0);
    float amb = 0.8 + 0.5 * vNormal.y;
    vec3 color = vec3(0.3, 0.6, 0.7);
    color = color * diff + color * amb + color * 0.5;
    gl_FragColor = vec4(color, 1.0);
}`.trim();
