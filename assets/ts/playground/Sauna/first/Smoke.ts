import * as THREE from 'three';

function rand (min, max) {
    return min + Math.random() * (max - min);
}

export default class Smoke {
    private _texture: THREE.Texture;
    private _geometry: THREE.PlaneBufferGeometry;
    private _material: THREE.MeshBasicMaterial;
    private _smokes: THREE.Group;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load(require('~/assets/img/playground/sauna/smoke.png'));
    }

    public generate = () => {
        this._smokes = new THREE.Group();
        this._geometry = new THREE.PlaneBufferGeometry(10, 10);
        this._material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: this._texture,
            transparent: true,
            blending: THREE.NormalBlending,
            depthTest: false,
            opacity: 0.1,
            side: THREE.DoubleSide
        });

        for (let i = 0; i < 50; i++) {
            const smoke = new THREE.Mesh(this._geometry, this._material);

            smoke.position.set(
                rand(-3, 3),
                20,
                rand(-0.5, 0.5),
            );

            // @ts-ignore
            smoke.velocity = 0;
            // @ts-ignore
            smoke.accel = 0.001 * Math.random();

            smoke.rotation.z = Math.random() * Math.PI;

            this._smokes.add(smoke);
        }

        this._stage.add(this._smokes);
        this._ready = true;
    };

    public update = () => {
        this._smokes.children.forEach((mesh) => {
            // @ts-ignore
            if (mesh.velocity < 1) {
                // @ts-ignore
                mesh.velocity += mesh.accel;
            }
            // @ts-ignore
            mesh.position.y += mesh.velocity;

            if (mesh.position.y > 40) {
                // @ts-ignore
                mesh.velocity = 0;
                mesh.position.y = 20;
            }
        });
    };

    get ready(): boolean {
        return this._ready;
    }
}
