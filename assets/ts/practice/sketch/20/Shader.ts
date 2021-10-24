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
                #define PI 3.141592653589793
                #define PI2 PI * 2.
                precision highp float;
                
                uniform vec2 resolution;
                uniform float time;

                out vec4 outColor;
                
                void main() {
                    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

                    vec3 color = vec3(0.0);

                    float speed = time;
                    float count = 10.0;
                    float c = 0.03;

                    float r = fract(length(uv) * 40.0 * sin(time * 0.2));

                    float theta = PI + atan(uv.y, uv.x);
                    
                    float pr = c * sqrt(time);
                    float ptheta = time * PI * (137.5/180.0);
                    
                    float mr = sin(mod(r + pr, PI2));
                    float mtheta = mod(theta + ptheta, PI * (137.5/180.0));

                    float rr = mr;
                    float gg = 1.0 - mr;
                    float bb = mtheta/(PI*(137.5/180.0));
                    color += vec3(rr, gg, bb);

                    // vec2 polar = vec2(r, theta);
                    // color += vec3(theta / PI2, 0.0, r * time);
                    
                    
                    // for (float i = 0.0; i < count; i+=0.1) {
                    //     float a = i * PI*(137.5/180.0) * speed;
                    //     float r = 0.5 * sqrt(i);
                    //     float x = r * cos(a);
                    //     float y = r * sin(a);
                    //
                    //     vec2 circleCoords = 0.5 * vec2(x, y);
                    //     float circle = distance(uv, circleCoords);
                    //     circle = step(0.01, circle);
                    //
                    //     color += 1.0 - circle;
                    // }
                    
                    outColor = vec4(color, 1.0);
                }
            `.trim());

        this.compile();
    }
}
