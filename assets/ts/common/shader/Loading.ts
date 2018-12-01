import { Shader } from '../gl/Shader';

export class Loading extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
            #version 300 es
            layout (location = 0) in vec3 position;
            uniform mat4 mvpMatrix;
            void main(void){
                gl_Position  = mvpMatrix * vec4(position, 1.0);
            }
        `.trim(),
        `
            #version 300 es
            precision highp float;
            uniform float time; // time
            uniform vec2  resolution; // resolution
            out vec4 outColor;
            
            const float CIRCLE_NUM = 6.0;
            
            void main(void){
                vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                float alpha = 1.0;
        
                for(float i = 0.0; i < CIRCLE_NUM; i++){
                    float j = i + 5.0;
                    vec2 q = p + vec2(cos(time * j), sin(time * j)) * 0.5;
                    alpha -= 1.0 - 0.25 / length(q);
                }
                outColor = vec4(vec3(0.0), alpha);;
            }
        `.trim());

        this.compile();
    }
}
