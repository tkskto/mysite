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
                
                #define TWO_PI 6.28318530718
                
                vec3 hsb2rgb( in vec3 c ){
                    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
                    rgb = rgb*rgb*(3.0-2.0*rgb);
                    return c.z * mix( vec3(1.0), rgb, c.y);
                }
               
                void main(void){
                    vec2 st = gl_FragCoord.xy/resolution;
                    vec3 color = vec3(0.0);
                
                    vec2 toCenter = vec2(0.5)-st;
                    float angle = atan(toCenter.y,toCenter.x) + atan(cos(time * 2.0), sin(time * 2.0));
                    float radius = length(toCenter)*2.0;
                
                    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));
                
                    outColor = vec4(color,1.0);
                }
            `.trim());

        this.compile();
    }
}
