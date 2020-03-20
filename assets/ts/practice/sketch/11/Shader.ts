import Shader from '../../../common/gl/Shader';

export default class Default extends Shader {
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
                uniform sampler2D tex1;
                uniform sampler2D tex2;
                uniform vec2 mouse;
                
                out vec4 outColor;
                
                float box(vec2 _st, vec2 _size, float _smoothEdges) {
                    _size = vec2(0.5) - _size * 0.5;
                    vec2 aa = vec2(_smoothEdges*0.5);
                    vec2 uv = smoothstep(_size, _size + aa, _st);
                    uv *= smoothstep(_size, _size + aa, vec2(1.0) - _st);
                    return uv.x * uv.y;
                }
                
                vec2 tile(in vec2 _st, vec2 num) {
                    _st *= num;
                    return fract(_st);
                }
              
                void main(void){
                    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    vec4 texColor1 = texture(tex1, vUv);
                    vec4 texColor2 = texture(tex2, vUv);
                    float mouseLen = length(mouse / resolution) * 2.0;
                    vec2 texPos = tile(pos, vec2(1.0) * mouseLen);
                    
                    float x = min(1.0, step(0.5, texPos.x)) * 0.5;
                    float y = min(1.0, step(0.5, 1.0 - texPos.y)) * 0.5;
                    float num = step(1.0, 1.0 - (x + y)) + step(1.0, (x + y)); // 0.0か1.0なら1.0に
                    vec4 color = texColor1 * num + texColor2 * (1.0 - num);
                    float border = box(tile(pos, vec2(2.0) * mouseLen), vec2(0.98), 0.075);
                    
                    color.rgb -= (1.0 - border);
                    
                    outColor = vec4(color.rgb, 1.0);
                }
            `.trim());

        this.compile();
    }
}
