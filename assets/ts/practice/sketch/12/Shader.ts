import { Shader } from '../../../common/gl/Shader';

export class Default extends Shader {
    constructor(_gl: WebGLRenderingContext) {
        super(_gl,
            `
                #version 300 es
                layout (location = 0) in vec3 position;
                layout (location = 1) in vec4 color;
                layout (location = 2) in vec3 normal;
                layout (location = 3) in vec2 uv;
               
                uniform mat4 mvpMatrix;
                
                out vec3 vPos;
                out vec3 vNormal;
                out vec4 vColor;
                out vec2 vUv;
                
                void main(void){
                    vec4 pos = mvpMatrix * vec4(position, 1.0);
                    vPos = pos.xyz;
                    vNormal = normal;
                    vColor = color;
                    vUv = uv;
                    gl_Position = pos;
                }
            `.trim(),
            `
                #version 300 es
                precision highp float;
                
                in vec3 vPos;
                in vec3 vNormal;
                in vec4 vColor;
                
                uniform mat4 mMatrix;
                uniform mat4 invMatrix;
                uniform vec3 lightPosition;
                uniform vec3 cameraPosition;
                uniform vec4 ambientColor;
                
                out vec4 outColor;
              
                void main(void){
                    vec3 lightVec = lightPosition - vPos;
                    vec3 invLight = normalize(mMatrix * invMatrix * vec4(lightVec, 0.0)).xyz;
                    vec3 invEye = normalize(invMatrix * vec4(cameraPosition, 0.0)).xyz;
                    vec3 halfLE = normalize(invLight + invEye);
                    float diffuse = clamp(dot(vNormal, invLight), 0.0, 1.0) + 0.2;
                    float specular = pow(clamp(dot(vNormal, halfLE), 0.0, 1.0), 50.0);
                    outColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) + ambientColor;
                }
            `.trim());

        this.compile();
    }
}
