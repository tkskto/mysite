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
                
                {{noise3d}}
                
                void main(void){
                    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    float freq = snoise(vec3(uv.x, uv.y, time * 0.1));
                    float f = 0.1 / abs(length(uv) * freq) - 0.5;
                    
                    float r = (uv.x + 1.0) * f * 0.456673;
                    float g = (uv.y + 1.0) * f * 0.676443;
                    float b = length(uv) * f * 0.213124;
                    
                    outColor = vec4(vec3(r, g, b), 1.0);
                }
            `.trim().replace('{{noise3d}}', ShaderLib.noise3d));

        this.compile();
    }
}
