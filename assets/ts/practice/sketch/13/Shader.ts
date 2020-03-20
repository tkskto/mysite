import Shader from '../../../common/gl/Shader';

export default class Default extends Shader {
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
                uniform vec2 resolution;
                uniform float time;
                uniform float fft;
                in vec4 vColor;
                layout (location = 0) out vec4 outColor;

                void main(void){
                    vec2 uv = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.y);
                    uv -= 0.5;
                    uv /= vec2(resolution.y / resolution.x, 1.0);
                    
                    outColor = vec4(vec3(0.0), 1.0);
                    
                    for (float i = 0.0; i < 8.0; i++) {
                        float r = i * 0.1;
                        vec2 center = vec2(cos(time), sin(time)) * r;
                        float dist = length(uv - center);
                        
                        float brightness = 1.0 / pow(dist * fft, 2.0);
                        vec3 col = vColor.rgb * brightness;
                        outColor.rgb += col;
                    }
                }
            `.trim());

        this.compile();
    }
}
