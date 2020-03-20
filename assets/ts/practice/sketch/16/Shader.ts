import Shader from '../../../common/gl/Shader';
import ShaderLib from '../common/ShaderLibs';

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
                in vec4 vColor;
                uniform vec2 resolution;
                uniform float time;
                out vec4 outColor;
                
                float random(in float x) {
                    return fract(sin(x) * 1e4);
                }
                
                float random(in vec2 st) {
                    return fract(sin(dot(st.xy, vec2(12.9898, 78.233)) * 43758.5453123));
                }
                
                float randomSerie(float x, float freq, float time) {
                    return step(0.77, random(floor(x * freq) - floor(time)));
                }
                
                {{noise3d}}
                
                void main(void){
                    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    // uv.x += 2.0;
                    float freq = snoise(vec3(uv.x, uv.y, time * 0.01)) + abs(atan(time) * 0.1);
                    float t = 60.0 + time * (1.0 - freq) * 30.0;
                    
                    t *= mix(-1.0, 1.0, step(0.5, uv.x)) * mix(-1.0, 1.0, step(0.5, uv.y));
                    // freq += random(floor(uv.y)) + random(floor(uv.x)) * 0.5;
                    
                    vec3 color = vec3(
                        randomSerie(uv.x, freq * 20.0, time + 0.05),
                        randomSerie(uv.x, freq * 20.0, time),
                        randomSerie(uv.x, freq * 20.0, time - 0.05)
                    );
                    
                    outColor = vec4(color, 1.0);
                }
            `.trim().replace('{{noise3d}}', ShaderLib.noise3d));

        this.compile();
    }
}
