import * as THREE from 'three';

const VS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

const FS = `
uniform vec2 resolution;
uniform float time;

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
    return sin(x*0.423) - sin(x);
}

vec4 Layer(vec2 uv, float blur) {
    vec4 color = vec4(0.0);
    float id = floor(uv.x);
    float n = fract(sin(id)*5463.3)-1.0;
    float x = n;
    float y = getHeight(id + x);

    vec4 tree = Tree(uv - vec2(x,-y), vec3(1.0), blur);
    vec4 col = mix(color, tree, tree.a);
    
    return col;
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y) - 0.5;
    
    float blur = 0.005;
    float t = time * 0.3;
    
    vec4 color = vec4(0.0);
    vec4 layer;
    
    layer = Layer(uv+vec2(0.5, 0.5), 0.001);
    layer += Layer(uv+vec2(-0.5, 0.5), 0.001);
    layer += Layer(uv * 0.5 + vec2(0.5, 0.5), 0.001);
    layer += Layer(uv * 0.5 + vec2(-1.0, 0.5), 0.001);
    color = mix(color, layer, layer.a);
    
    gl_FragColor = color;
}
`.trim();

export default class Tree {
    private _mesh: THREE.Mesh;
    private _uniform: {
        resolution: {
            value: THREE.Vector2;
        };
        time: {
            value: number;
        };
    };

    constructor(private _stage: THREE.Scene, width, height) {
        this._uniform = {
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            time: {
                value: 0,
            }
        };
    }

    public generate = (): void => {
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: VS,
            fragmentShader: FS,
            uniforms: this._uniform
        });
        this._mesh = new THREE.Mesh(geometry, material);

        this._stage.add(this._mesh);
    };

    public update = (time): void => {
        this._uniform.time.value = time;
    }
}
