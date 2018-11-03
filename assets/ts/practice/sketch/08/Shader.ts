import { Shader } from '../../module/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
                #version 300 es
                layout (location = 0) in vec3 position;
                layout (location = 1) in vec4 color;
                layout (location = 2) in vec3 normal;
                layout (location = 3) in vec2 uv;
                
                out vec4 vColor;
                out vec3 vNormal;
                out vec2 vUv;
                
                uniform   mat4 mvpMatrix;
                
                void main(void){
                    vColor = color;
                    vNormal = normal;
                    vUv = uv;
                    gl_Position  = mvpMatrix * vec4(position, 1.0);
                }
            `.trim(),
            `
                #version 300 es
                precision highp float;
                
                in vec4 vColor;
                in vec3 vNormal;
                in vec2 vUv;
                
                uniform vec2 resolution;
                uniform float time;
                uniform sampler2D tex;
                
                out vec4 outColor;
               
                void main(void){
                    vec2 p = gl_FragCoord.xy / resolution.xy;
                    vec2 st = vUv;
                    
                    float left = fract(time * 0.01);                  
                    st.x += step(left, p.x) * (left - st.x);
                    
                    outColor = texture(tex, st);
                }
            `.trim());

        this.compile();
    }
}
