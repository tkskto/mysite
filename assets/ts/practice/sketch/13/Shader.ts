import { Shader } from '../../../common/gl/Shader';

export class Default extends Shader {
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
                
                void main(void){
                    vec2 uv = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.y);
                    uv -= 0.5;
                    uv /= vec2(resolution.y / resolution.x, 1.0);
                    
                    float glow = atan(uv.y, uv.x) * time * 0.5;
                    
                    for (float i = 0.0; i < 10.0; i++) {
                        float a = sin(glow * 10.0);
                        float r = mod(i * 1.3 + time * 0.3, 0.7);
                        vec2 center = vec2(cos(a), sin(a)) * r;
                        
                        outColor += vec4(vec3(fract(uv.x - center.x), fract(uv.y - center.y), 1.0), 1.0) * 0.1; 
                    }
                }
            `.trim());

        this.compile();
    }
}
