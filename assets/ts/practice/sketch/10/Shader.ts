import { Shader } from '../../module/Shader';

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
                uniform vec2 mouse;
                
                out vec4 outColor;
                
                #define PI 3.14159265358979323846
                
                float box(vec2 _st, vec2 _size, float _smoothEdges) {
                    _size = vec2(0.5) - _size * 0.5;
                    vec2 aa = vec2(_smoothEdges*0.5);
                    vec2 uv = smoothstep(_size, _size + aa, _st);
                    uv *= smoothstep(_size, _size + aa, vec2(1.0) - _st);
                    return uv.x * uv.y;
                }
                
                vec2 rotate2D(in vec2 _st, in float _angle){
                    _st -= 0.5;
                    _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
                    _st += 0.5;
                    return _st;
                }
                
                vec2 offset(vec2 _st, vec2 _offset){
                    vec2 uv;
                
                    if(_st.x > _offset.x){
                        uv.x = _st.x - _offset.x;
                    } else {
                        uv.x = _st.x + _offset.x;
                    }
                
                    if(_st.y > _offset.y){
                        uv.y = _st.y - _offset.y;
                    } else {
                        uv.y = _st.y + _offset.y;
                    }
                
                    return uv;
                }
                
                vec2 tile(in vec2 _st, float num) {
                    _st *= num;
                    return fract(_st);
                }
               
                void main(void){
                    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    vec2 mp = (vec2(mouse.x, resolution.y - mouse.y) * 2.0 - resolution) / min(resolution.x, resolution.y);
                    vec2 st = pos;
                
                    st = tile(st, 10.0);
                
                    vec2 offsetSt = offset(st,vec2(0.5));
              
                    st = rotate2D(st, PI * 0.25);
                    float size = 1.0 - smoothstep(0.0, 1.0, sqrt(pow(pos.x - mp.x, 2.0) + pow(mp.y - pos.y, 2.0)));
                    vec3 color = vec3(box(offsetSt, vec2(0.95), 0.05) - box(st, vec2(0.3 + size), 0.1) + 2. * box(st, vec2(0.2 + size), 0.01));
                    
                    outColor = vec4(color, 1.0);
                }
            `.trim());

        this.compile();
    }
}
