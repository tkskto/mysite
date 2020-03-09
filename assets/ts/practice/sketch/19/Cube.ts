import * as THREE from 'three';

export default class Cube {
    private _ready: boolean = false;
    private _mesh: THREE.Mesh;

    constructor(private _stage: THREE.Scene, private _width:number, private _height: number) {}

    public generate = (target: THREE.WebGLRenderTarget) => {
        const height = this._height / this._width * 800;
        const geometry = new THREE.BoxBufferGeometry(800, height, 600);
        const material = new THREE.MeshBasicMaterial({
            map: target.texture,
            side: THREE.DoubleSide,
            color: 0xffffff,
            depthTest: false,
            wireframe: false
        });

        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(0, 0, 500);
        this._mesh.renderOrder = -1;

        this._stage.add(this._mesh);
        this._ready = true;
    };

    get ready(): boolean {
        return this._ready;
    }
}
