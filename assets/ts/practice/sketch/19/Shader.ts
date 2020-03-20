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
                
                in vec4 vColor;
                out vec4 outColor;
                
                #define S(a,b,t) smoothstep(a,b,t)
                
                float taperBox(vec2 p, float wb, float wt, float yb, float yt, float blur) {
                    float n = S(-blur, blur, p.y-yb);
                    n *= S(blur, -blur, p.y-yt);
                    
                    p.x = abs(p.x);
                    
                    float w = mix(wb, wt, (p.y-yb) / (yt-yb));
                    n *= S(blur, -blur, p.x-w);
                    
                    return n;
                }
                
                vec4 Tree (vec2 uv, vec3 col, float blur) {
                    float n = taperBox(uv, 0.03, 0.03, 0.0, 0.25, blur);
                    n += taperBox(uv, 0.2, 0.1, 0.25, 0.5, blur);
                    n += taperBox(uv, 0.15, 0.05, 0.5, 0.75, blur);
                    n += taperBox(uv, 0.1, 0.0, 0.75, 1.0, blur);
                    
                    float shadow = taperBox(uv-vec2(0.2, 0.0), 0.1, 0.5, 0.15, 0.25, blur);
                    shadow += taperBox(uv-vec2(0.25, 0.0), 0.1, 0.5, 0.45, 0.5, blur);
                    shadow += taperBox(uv-vec2(0.25, 0.0), 0.1, 0.5, 0.7, 0.75, blur);
                    col -= shadow * 0.7;
                    
                    return vec4(col, n);
                }
                
                float getHeight(float x) {
                    return sin(x*0.423) + sin(x)*0.3;
                }
                
                vec4 Layer(vec2 uv, float blur) {
                    vec4 color = vec4(0.0);
                    float id = floor(uv.x);
                    float n = fract(sin(id*234.12)*5463.3)*2.0-1.0;
                    float x = n * 0.3;
                    float y = getHeight(uv.x);
                    
                    float ground = S(blur, -blur, uv.y + y);
                    color += ground;
                    
                    y = getHeight(id+0.5 + x);
                    
                    uv.x = fract(uv.x)-0.5;
                    
                    vec4 tree = Tree((uv - vec2(x,-y)) * vec2(1.0,1.0 + n * 0.2), vec3(1.0), blur);
                    
                    vec4 col = mix(color, tree, tree.a);
                    col.a = max(ground, tree.a);
                    
                    return col;
                }
                
                float hash21(vec2 p) {
                    p = fract(p*vec2(234.45, 765.34));
                    p += dot(p, p+vec2(547.123));
                    return fract(p.x*p.y);
                }
                
                void main() {
                    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y) - 0.5;

                    
                    float t = time * 0.3;
                    
                    float twinkle = dot(length(uv+vec2(sin(t))), length(cos(uv*vec2(22.0,6.7)-vec2(t*3.0))));
                    twinkle = sin(twinkle * 10.0)*0.5+0.5;
                    float star = pow(hash21(uv), 200.0) * twinkle;
                    vec4 color = vec4(vec3(star), 1.0);
                    
                    float moon = S(0.01, -0.01, length(uv-vec2(0.6,0.35)) - 0.15);
                    moon *= S(-0.01, 0.05, length(uv-vec2(0.65, 0.4)) - 0.15);
                    color += moon;

                    vec4 layer;

                    for (float i = 0.0; i<1.0; i+=1.0/10.0) {
                        float scale = mix(30.0, 1.0, i);
                        float blur = mix(0.1, 0.025, i); 
                        layer = Layer(uv*scale+vec2(time+i*100.0,i*3.0), blur);
                        layer.rgb *= (1.0 - i) * vec3(0.9, 0.9, 1.0);

                        color = mix(color, layer, layer.a);
                    }
                    
                    layer = Layer(uv+vec2(time,0.0), 0.1);
                    layer.rgb *= 0.1;
                    color = mix(color, layer, layer.a);
                    
                    outColor = color;
                }
            `.trim());

        this.compile();
    }
}
