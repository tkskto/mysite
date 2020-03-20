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
                
                #define HALF_PI 1.57079632679
                #define PI 3.14159265359
                #define TWO_PI 6.28318530718
                
                void main(void){
                    vec2 st = gl_FragCoord.xy - (resolution.xy / 2.0);
                  
                    vec2 polar;
                    polar.y = length(st);
                    polar.y /= resolution.x / 2.0;
                    polar.y = 1.0 - polar.y;
                    
                    polar.x = atan(st.y, st.x);
                    polar.x = polar.x / TWO_PI + 0.5;
             
                    float swirl = fract(polar.x * 10.0 + polar.y + time);
                    
                    outColor = vec4(vec3(swirl), 1.0);
                }
            `.trim());

        this.compile();
    }
}
