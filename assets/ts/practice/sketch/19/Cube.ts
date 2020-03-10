import * as THREE from 'three';

export default class Cube {
    private _group: THREE.Group = new THREE.Group();
    private _ready: boolean = false;
    private _geometry: THREE.BoxBufferGeometry;
    private _material: THREE.MeshBasicMaterial;
    private _mesh: THREE.Mesh;
    private _stop: boolean = false;

    constructor(private _stage: THREE.Scene, private _width:number, private _height: number) {}

    public generate = (target: THREE.WebGLRenderTarget) => {
        const height = this._height / this._width * 800;
        this._geometry = new THREE.BoxBufferGeometry(800, height, 1000);
        this._material = new THREE.MeshBasicMaterial({
            map: target.texture,
            side: THREE.DoubleSide,
            color: 0xffffff,
            depthTest: false
        });

        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.position.set(0, 0, 500);
        this._mesh.renderOrder = -1;

        this._group.add(this._mesh);
        this._stage.add(this._group);
        this._ready = true;
    };

    private make = (z) => {
        const mesh = new THREE.Mesh(this._geometry, this._material);
        mesh.position.set(0, 0, z);

        this._group.add(mesh);

        setTimeout(() => {
            if (!this._stop) {
                this.make(z - 500);
            }
        }, 100);
    };

    public stop = () => {
        this._stop = true;
        this._stage.remove(this._group);
    };

    public last = () => {
        setTimeout(() => {
            this.make(0);
        }, 100);
    };

    get ready(): boolean {
        return this._ready;
    }
}
