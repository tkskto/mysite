import Shader from '../../../common/gl/Shader';

export default class Default extends Shader {
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
                
                #define TWO_PI 6.28318530718
                
                float heart(in vec2 p, in float r) {
                  float y = (p.y * 1.2 - abs(p.x) * sqrt((20.0 - abs(p.x)) / 50.0));
                  return p.x * p.x + y * y - r;
                }
               
                void main(void){
                    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    float l = 1.0 - step(0.5, heart(p, pow(sin(time * TWO_PI + p.y * 0.25) * 0.5, 4.0) + 0.1));
                    
                    outColor = vec4(vec3(1.0, 0.2, 0.2) * l, 1.0);
                }
            `.trim());

        this.compile();
    }
}
