import { Shader } from '../../module/Shader';

export class Default extends Shader {
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
                
                const float rad = 0.3; //白い円の半径
                const ivec2 reps = ivec2(20, 20);
                float sharpness = 5.0;
                
                void main(void){
                    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    float t = atan(p.y, p.x) + time;
                    float x = sin(t * 10.0);
                    float y = length(p) + sin(time);
                    float z = length(p) + cos(time);
                    
                    vec2 repeat = vec2(fract(p.x * float(reps.x)), fract(p.y * float(reps.y)));
                    vec2 distFromMid = repeat - vec2(0.5);
                    float dist = length(distFromMid);
                    
                    float circ = (rad - dist) * sharpness;
                    float alpha = 1.0 - circ;
                    
                    outColor = vec4(vec3(x, y, z), alpha);
                }
            `.trim());

        this.compile();
    }
}
