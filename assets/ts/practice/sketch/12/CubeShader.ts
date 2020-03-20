import Shader from '../../../common/gl/Shader';

export default class CubeShader extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
                #version 300 es
                layout (location = 0) in vec3 position;
                layout (location = 1) in vec4 color;
                layout (location = 2) in vec3 normal;
                layout (location = 3) in vec2 uv;
               
                uniform mat4 mvpMatrix;
                uniform mat4 invMatrix;
                uniform vec3 lightDirection;
                
                out vec2 vUv;
                out vec4 vColor;
                
                void main(void){
                    vUv = uv;
                    vec3  invLight = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
                    float diffuse  = clamp(dot(normal, invLight), 0.1, 1.0);
                    vColor = color * vec4(vec3(diffuse), 1.0);
                    gl_Position  = mvpMatrix * vec4(position, 1.0);
                }
            `.trim(),
            `
                #version 300 es
                precision highp float;
                
                in vec4 vColor;
                uniform vec2 resolution;
                
                out vec4 outColor;
              
                void main(void){
                    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
                    
                    outColor = vec4(vColor.rgb, 1.0);
                }
            `.trim());

        this.compile();
    }
}
