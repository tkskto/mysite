import { Shader } from '../../module/Shader';

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
                
                const vec2 reps = vec2(10.0, 10.0);
                
                void main(void){
                    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    // lengthのもとになる原点を複製するイメージ fractは小数点だけとってくるやつ
                    // vec2 repeat = vec2(fract(p.x * reps.x), fract(p.y * reps.y)) - vec2(0.5);
                    vec2 repeat = fract(p * reps) - vec2(0.5);
                    
                    float f = 0.1 / abs(fract(length(repeat * sin(time)) * 10.0) - 0.5);
                    vec3 color = vColor.xyz * f;
                    
                    outColor = vec4(color, 1.0);
                }
            `.trim());

        this.compile();
    }
}
