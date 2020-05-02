import {
    CircleGeometry,
    ClampToEdgeWrapping,
    CylinderGeometry,
    DoubleSide,
    Group,
    Mesh,
    MeshLambertMaterial,
    NearestFilter,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    Vector2,
    WebGLRenderer,
    WebGLRenderTarget
} from 'three'

const VS = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`.trim();

const FS = `
uniform vec2 resolution;
#define PI 3.14159265359
#define ZOOM 30.0
#define WEIGHT 2.0

float border(in vec2 st) {
    vec2 lb = smoothstep(vec2(0.01), vec2(0.011), st);
    vec2 tr = smoothstep(vec2(0.01), vec2(0.011), 1.0 - st);
    return lb.x * lb.y * tr.x * tr.y;
}

void main() { 
    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec2 uv = ZOOM * PI * gl_FragCoord.xy/resolution.xy * vec2(resolution.x/resolution.y, 1.);
    float d = sin(uv.x)+cos(uv.y);
    
    float w = abs(d*WEIGHT);
    w *= border(st);
    
    gl_FragColor = vec4(0.5 - vec3(w), 1.0 - w);
}
`.trim();

export default class Stove {
    private _uniform: {};
    private _group: Group;
    private _mesh: Mesh;
    private _scene: Scene;
    private _camera: PerspectiveCamera;
    private _renderTarget: WebGLRenderTarget;

    constructor(private _stage: Scene, private _renderer: WebGLRenderer, width, height) {
        this._uniform = {
            resolution: {
                value: new Vector2(width, height)
            },
        };

        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, width/height, 0.1, 15);
        this._camera.position.set(0, 0, 10);

        this._renderTarget = new WebGLRenderTarget(width, height, {
            magFilter: NearestFilter,
            minFilter: NearestFilter,
            wrapS: ClampToEdgeWrapping,
            wrapT: ClampToEdgeWrapping
        });
    }

    public generate = (): void => {
        this._group = new Group();

        // texture
        const plane = new PlaneGeometry(2, 2, 1, 1);
        const pmaterial = new ShaderMaterial({
            vertexShader: VS,
            fragmentShader: FS,
            uniforms: this._uniform
        });

        const mesh = new Mesh(plane, pmaterial);
        mesh.renderOrder = -1;
        this._camera.lookAt(mesh.position);
        this._scene.add(mesh);

        // stove
        const geometry = new CylinderGeometry(6, 6, 20, 32, 1, true);
        const material = new MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0x111111,
            transparent: true,
            map: this._renderTarget.texture,
            side: DoubleSide,
            depthTest: true,
        });
        this._mesh = new Mesh(geometry, material);
        this._mesh.castShadow = true;
        // this._mesh.rotation.y -= Math.PI * 0.5;

        // bottom
        const cgeometry = new CircleGeometry(6, 32);
        const cmaterial = new MeshLambertMaterial({
            color: 0x999999,
            side: DoubleSide,
        });
        const bottom = new Mesh(cgeometry, cmaterial);
        bottom.rotation.x = Math.PI * 0.5;
        bottom.position.y = -10;

        this._group.position.y = 10;
        this._group.add(bottom);
        this._group.add(this._mesh);

        this._stage.add(this._group);
    };

    public update = (): void => {
        this._renderer.setRenderTarget(this._renderTarget);
        this._renderer.render(this._scene, this._camera);
        this._renderer.setRenderTarget(null);
    }
}
