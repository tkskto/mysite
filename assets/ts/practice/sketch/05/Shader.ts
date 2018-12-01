import { Shader } from '../../../common/gl/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
                #version 300 es
                layout (location = 0) in vec3 position;
                layout (location = 1) in vec4 color;
                out vec4 vColor;
                uniform   mat4 mvpMatrix;
                
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
                
                float smoothBorder(in float weight, in vec2 st) {
                    vec2 lb = smoothstep(vec2(0.1), vec2(0.1 * sin(time) + 0.2), st);
                    vec2 tr = smoothstep(vec2(0.1), vec2(0.1 * sin(time) + 0.2), 1.0 - st);
                    return lb.x * lb.y * tr.x * tr.y;
                }
               
                float clearBorder(in float weight, in vec2 st) {
                    vec2 lb = step(vec2(0.1), st);
                    vec2 tr = step(vec2(0.1), 1.0 - st);
                    return lb.x * lb.y * tr.x * tr.y;
                }
               
                void main(void){
                    vec2 st = gl_FragCoord.xy / resolution.xy;
                  
                    float color = smoothBorder(0.1, st);
                    
                    outColor = vec4(vec3(color), 1.0);
                }
            `.trim());

        this.compile();
    }
}
