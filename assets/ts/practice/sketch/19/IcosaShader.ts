export const IcosaVS = `
uniform vec3 customColor;
uniform sampler2D tAudioData;
varying vec3 vNormal;

#include <morphtarget_pars_vertex>

void main() {
    vNormal = normal;
    
    #include <begin_vertex>
    #include <morphtarget_vertex>
    
    vec4 pos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
    
    gl_Position = pos;
}`.trim();

export const IcosaFS = `
varying vec3 vNormal;
void main() {
    vec3 light = normalize(vec3(0.57703));
    float diff = clamp(dot(vNormal, light), 0.0, 1.0);
    float amb = 0.8 + 0.5 * vNormal.y;
    vec3 color = vec3(0.3, 0.6, 0.7) * diff + amb * vec3(0.5, 0.6, 0.7);
    gl_FragColor = vec4(color, 1.0);
}`.trim();
