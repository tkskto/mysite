import Shader from '../gl/Shader';

export default class HazyBackground extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
            #version 300 es
            layout (location = 0) in vec3 position;
            uniform mat4 mvpMatrix;
            void main(void){
                gl_Position = mvpMatrix * vec4(position, 1.0);
            }
        `.trim(),
            `
            #version 300 es
            precision highp float;
            uniform float time;
            out vec4 outColor;
            
            float speed = 0.1;
            float tex = 0.001;
            float yugami = 0.3;
            vec3 color = vec3(0.2, 0.117647, 0.1098);
                        
            void main(void){
                vec2 p = gl_FragCoord.xy * tex;
                float offset = time * speed;
                
                for(float i = 1.0; i < 5.0; i++){
                    p.x += yugami / i * sin(i * 5.0 * p.y + offset);
                    p.y += yugami / i * cos(i * 5.0 * p.x + offset);
                }
                
                float r = cos(p.x + p.y + 1.0) * 0.1;
                float g = sin(p.x + p.y + 1.0) * 0.1;
                float b = (sin(p.x + p.y) + cos(p.x + p.y)) * 0.3;
                
                vec3 color = color + vec3(r,g,b);
                outColor = vec4(color, 0.1);
            }
        `.trim());

        this.compile();
    }
}
