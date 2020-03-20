import * as THREE from 'three';
import * as Cannon from 'cannon';

const VS = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`.trim();

const FS = `
uniform vec2 resolution;
#define PI 3.14159265359
#define ZOOM 30.0
#define WEIGHT 6.0

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
    private _group: THREE.Group;
    private _mesh: THREE.Mesh;
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderTarget: THREE.WebGLRenderTarget;
    private _body: Cannon.Body;

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _world: Cannon.World, width, height) {
        this._uniform = {
            resolution: {
                value: new THREE.Vector2(width, height)
            },
        };

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 15);
        this._camera.position.set(0, 0, 10);

        this._renderTarget = new THREE.WebGLRenderTarget(width, height, {
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping
        });
    }

    public generate = () => {
        this._group = new THREE.Group();

        // texture
        const plane = new THREE.PlaneGeometry(2, 2, 1, 1);
        const pmaterial = new THREE.ShaderMaterial({
            vertexShader: VS,
            fragmentShader: FS,
            uniforms: this._uniform
        });

        const mesh = new THREE.Mesh(plane, pmaterial);
        mesh.renderOrder = -1;
        this._camera.lookAt(mesh.position);
        this._scene.add(mesh);

        // stove
        const geometry = new THREE.CylinderGeometry(6, 6, 20, 32, 1, true);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: this._renderTarget.texture,
            side: THREE.DoubleSide,
            depthTest: false,
        });
        this._mesh = new THREE.Mesh(geometry, material);
        // this._mesh.rotation.y -= Math.PI * 0.5;

        this._body = new Cannon.Body({
            mass: 0,
            position: new Cannon.Vec3(0, 10, 0),
            shape: new Cannon.Cylinder(1,1, 1, 32)
        });
        // this._body.quaternion.setFromAxisAngle(new Cannon.Vec3(1, 0, 0), -Math.PI / 2);

        // bottom
        const cgeometry = new THREE.CircleGeometry(6, 32);
        const cmaterial = new THREE.MeshBasicMaterial({
            color: 0x999999,
            side: THREE.DoubleSide,
        });
        const bottom = new THREE.Mesh(cgeometry, cmaterial);
        bottom.rotation.x = Math.PI * 0.5;
        bottom.position.y = -10;

        const bottomBody = new Cannon.Body({
            mass: 0,
            position: new Cannon.Vec3(0, 0.5, 0),
            shape: new Cannon.Plane(0.1,0.1)
        });
        bottomBody.quaternion.setFromAxisAngle(new Cannon.Vec3(1, 0, 0), -Math.PI / 2);

        this._group.position.y = 10;
        this._group.add(bottom);
        this._group.add(this._mesh);

        this._world.addBody(this._body);
        this._world.addBody(bottomBody);
        this._stage.add(this._group);
    };

    public update = () => {
        this._renderer.setRenderTarget(this._renderTarget);
        this._renderer.render(this._scene, this._camera);
        this._renderer.setRenderTarget(null);

        this._mesh.position.copy(this._body.position);
        // this._mesh.quaternion.copy(this._body.quaternion);
    }
}
