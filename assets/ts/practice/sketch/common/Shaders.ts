import { Shader } from '../../module/Shader';

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
                
                #define HALF_PI 1.57079632679
                #define PI 3.14159265359
                #define TWO_PI 6.28318530718
                
                void main(void){
                    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y); // 正規化
                    vec2 st = gl_FragCoord.xy - (resolution.xy / 2.0);
                    
                    outColor = vec4(vec3(1.0), 1.0);
                }
            `.trim());

        this.compile();
    }
}
