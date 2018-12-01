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
            out vec4 outColor;
            
            void main(void){
                outColor = vColor;
            }
        `.trim());

        this.compile();
    }
}
