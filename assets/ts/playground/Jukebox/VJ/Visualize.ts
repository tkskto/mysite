import * as THREE from 'three';

export default class Visualize {
    private _group: THREE.Group = new THREE.Group();
    private _ready = false;
    private _stop = false;

    constructor(private _stage: THREE.Scene, private _width: number, private _height: number) {}

    public generate = (target: THREE.WebGLRenderTarget) => {
        const material = new THREE.MeshBasicMaterial({
            map: target.texture,
            side: THREE.DoubleSide,
            color: 0xffffff,
            depthTest: true,
        });

        const cgeometry = new THREE.CircleGeometry(10, 64, 0, Math.PI);
        const back = new THREE.Mesh(cgeometry, material);
        back.position.set(0, -2, 2);

        const cygeometry = new THREE.CylinderGeometry(9, 9, 12, 64, 64, true, Math.PI * 0.5, Math.PI);
        const outside = new THREE.Mesh(cygeometry, material);
        outside.rotation.x = Math.PI * 0.5;
        outside.position.set(0, -2, 8);

        this._group.add(back, outside);
        this._stage.add(this._group);
        this._ready = true;
    };

    public stop = () => {
        this._stop = true;
        this._stage.remove(this._group);
    };

    get ready(): boolean {
        return this._ready;
    }

    get position(): THREE.Vector3 {
        return this._group.position;
    }
}
