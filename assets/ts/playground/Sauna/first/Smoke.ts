import * as THREE from 'three';

function rand (min, max): number {
    return min + Math.random() * (max - min);
}

export default class Smoke {
    private _texture: THREE.Texture;
    private _geometry: THREE.PlaneBufferGeometry;
    private _material: THREE.MeshBasicMaterial;
    private _smokes: THREE.Group;
    private _ready = false;

    constructor(private _stage: THREE.Scene) {}

    public generate = async (): Promise<void> => {
        this._texture = new THREE.TextureLoader().load(await require('~/assets/img/playground/sauna/smoke.png'));
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

            smoke.velocity = 0;
            smoke.accel = 0.001 * Math.random();

            smoke.rotation.z = Math.random() * Math.PI;

            this._smokes.add(smoke);
        }

        this._stage.add(this._smokes);
        this._ready = true;
    };

    public update = (): void => {
        this._smokes.children.forEach((mesh) => {
            if (mesh.velocity < 1) {
                mesh.velocity += mesh.accel;
            }

            mesh.position.y += mesh.velocity;

            if (mesh.position.y > 40) {
                mesh.velocity = 0;
                mesh.position.y = 20;
            }
        });
    };

    get ready(): boolean {
        return this._ready;
    }
}
