import Shader from '../../../common/gl/Shader';

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
                    vec4 pos = mvpMatrix * vec4(position, 1.0);
                    vColor = color;
                    gl_Position = pos;
                }
            `.trim(),
            `
                #version 300 es
                #extension GL_OES_standard_derivatives : enable
                precision highp float;
                
                uniform vec2 resolution;
                uniform float time;
                
                layout (location = 0) out vec4 outColor;
              
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  
                float sphere(vec3 pos, float size) {
                    return length(pos) - size;
                }
                
                vec3 getNormal(vec3 pos, float size) {
                    float ep = 0.0001;
                    return normalize(vec3(
                        sphere(pos, size) - sphere(vec3(pos.x - ep, pos.y, pos.z), size),
                        sphere(pos, size) - sphere(vec3(pos.x, pos.y - ep, pos.z), size),
                        sphere(pos, size) - sphere(vec3(pos.x, pos.y, pos.z - ep), size)
                    ));
                }

                void main(void){
                    vec2 uv = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.y);
                    uv -= 0.5;
                    uv /= vec2(resolution.y / resolution.x, 1.0);
                    
                    vec3 col = vec3(0.0);
                    vec3 cPos = vec3(0.0, 0.0, 10.0);
                    vec3 ray = normalize(vec3(uv, 0.0) - cPos);
                    vec3 current = cPos;
                    
                    float size = 0.5;
                    
                    lightDir.x += cos(time);
                    lightDir.y += sin(time);
                    lightDir.z += atan(time) * 0.1;
                    
                    for (int i = 0; i < 16; i++) {
                        float d = sphere(current, size);
                        if (d < 0.0001) {
                            vec3 normal = getNormal(current, size);
                            float diff = dot(normal, lightDir);
                            col = vec3(diff) + vec3(0.3);
                            break;
                        }
                        current += ray * d;
                    }
                    
                    outColor = vec4(col, 1.0);
                }
            `.trim());

        this.compile();
    }
}
