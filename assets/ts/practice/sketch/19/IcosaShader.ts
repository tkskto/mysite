export const IcosaVS = `
uniform vec3 customColor;
uniform sampler2D tAudioData;
varying vec3 vNormal;
varying mat4 vMatrix;

#include <morphtarget_pars_vertex>

void main() {
    vNormal = normal;
    
    #include <begin_vertex>
    #include <morphtarget_vertex>
    
    vMatrix = modelViewMatrix;
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
