import Shader from '../../../common/gl/Shader';
import ShaderLib from '../common/ShaderLibs';

export default class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
                #version 300 es
                layout (location = 0) in vec3 position;
                layout (location = 1) in vec4 color;
                uniform mat4 mvpMatrix;
                out vec4 vColor;
                void main(void){
                    vColor = color;
                    gl_Position  = mvpMatrix * vec4(position, 1.0);
                }
            `.trim(),
            `
                #version 300 es
                precision highp float;
                in vec4 vColor;
                uniform vec2 resolution;
                uniform float time;
                out vec4 outColor;
                
                float iPlane (in vec3 ro, in vec3 rd) {
                    return -ro.y / rd.y;
                }
                vec3 nPlane (in vec3 pos) {
                    return vec3(0.0, 1.0, 0.0);
                }
                
                float iSphere (in vec3 ro, in vec3 rd, in vec4 sph) {
                    vec3 oc = ro - sph.xyz;
                    float r = 1.0;
                    float b = 2.0 * dot(oc, rd);
                    float c = dot(oc, oc) - sph.w * sph.w;
                    float h = b * b - 4.0*c;
                    if (h < 0.0) return -1.0;
                    float t = (-b - sqrt(h)) / 2.0;
                    return t;
                }
                vec3 nSphere (in vec3 pos, in vec4 sph) {
                    return (pos - sph.xyz) / sph.w;
                }
                
                vec4 sph1 = vec4(0.0, 1.0, 0.0, 1.0);
                float intersect(in vec3 ro, in vec3 rd, out float resT) {
                    float id = -1.0;
                    resT = 1000.0;
                    float tSphere = iSphere( ro, rd, sph1 );
                    float tPlane = iPlane(ro, rd);
                    
                    if (tSphere > 0.0 ) {
                        id = 1.0;
                        resT = tSphere;
                    }
                    if (tPlane > 0.0 && tPlane < resT) {
                        id = 2.0;
                        resT = tPlane;
                    }
                    return id;
                }
                
                void main(void){
                    vec3 light = normalize(vec3(0.57703));
                    vec2 uv = gl_FragCoord.xy / resolution.xy;
                    
                    sph1.x += cos(time);
                    sph1.z += sin(time);
                    
                    vec3 ro = vec3(0.0, 1.0, 3.0);
                    vec3 rd = normalize(vec3((-1.0 + 2.0*uv) * vec2(1.9, 1.0), -1.0));
                    
                    float t;
                    float id = intersect(ro, rd, t);
                    
                    vec3 color = vec3(0.9);
                    
                    if (id > 0.5 && id < 1.5) {
                        vec3 pos = ro + t * rd;
                        vec3 nSph = nSphere( pos, sph1 );
                        float diff = clamp(dot(nSph, light), 0.0, 1.0);
                        float amb = 0.5 + 0.5 * nSph.y;
                        color = vec3(0.3, 0.6, 0.7) * diff + amb*vec3(0.5, 0.6, 0.7);
                    }
                    
                    if (id > 1.5) {
                        vec3 pos = ro + t * rd;
                        vec3 nPla = nPlane( pos );
                        float diff = clamp(dot(nPla, light), 0.0, 1.0);
                        float amb = smoothstep(0.0, sph1.w, length(pos.xz - sph1.xz));
                        color = vec3(amb * amb);
                    }
                    
                    color = sqrt(color);
                    
                    outColor = vec4(color, 1.0);
                }
            `.trim());

        this.compile();
    }
}
