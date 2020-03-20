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
                uniform sampler2D fft;
                in vec4 vColor;
                layout (location = 0) out vec4 outColor;
                
                void main(void){
                    vec2 uv = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.y);
                    uv -= 0.5;
                    uv /= vec2(resolution.y / resolution.x, 1.0);
                    
                    outColor = vec4(vec3(0.0), 1.0);
                    
                    float globalR = length(uv);
                    float globalA = atan(uv.y, uv.x);
                    
                    for (float i = 0.0; i < 20.0; i++) {
                        float f1 = mod(i * 345.2134 - 345.0, 0.28);
                        float f2 = mod(i * 45.2134 - 35.0, 0.29);
                        
                        float fft1 = texture(fft, vec2(f1, 0.0)).x;
                        float fft2 = texture(fft, vec2(f2, 0.0)).x;
                        
                        float r = mod(i * 345.2134, 0.7);
                        float a = fft1 - fft2;
                        a *= 10.0;
                        
                        a = a + 0.1 * sin(globalA * 8.0 + globalR * 10.0);
                        
                        vec2 center = vec2(cos(a), sin(a)) * r;
                        
                        float dist = length(uv - center);
                        
                        float brightness = 1.0 / pow(0.001 + dist * 100.0, 1.3);
                        brightness *= 1.0 + 0.9 * sin(length(center) * 7.01 - f1 * f2);
                        
                        vec3 col = vec3(1.0 * sin(time), 0.5, 0.1) * brightness * fft1 * 2.0;
                        col += vec3(0.04, 0.4, 0.7) * brightness * fft2 * 2.0;
                        outColor.rgb += col;           
                    }
                    outColor.rgb = pow(outColor.rgb, vec3(1.0/0.4));
                }
            `.trim());

        this.compile();
    }
}
