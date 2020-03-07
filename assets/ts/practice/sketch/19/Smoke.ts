import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Smoke {
    private _texture: THREE.Texture;
    private _geometry: THREE.PlaneBufferGeometry;
    private _material: THREE.MeshBasicMaterial;
    private _smokes: THREE.Group;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load('/assets/img/smoke.png');
    }

    public generate = () => {
        this._smokes = new THREE.Group();
        this._geometry = new THREE.PlaneBufferGeometry(1000, 1000);
        this._material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: this._texture,
            transparent: true,
            blending: THREE.NormalBlending,
            depthTest: false,
            opacity: 0
        });

        for (let i = 0; i < 100; i++) {
            const smoke = new THREE.Mesh(this._geometry, this._material);

            smoke.position.set(
                Math.random() * 2000 - 500,
                Math.random() * -500 - 600,
                Math.random() * 100 - 100,
            );

            smoke.rotation.z = Math.random() * 360;

            // @ts-ignore
            smoke.velocity = 0;
            // @ts-ignore
            smoke.accel = 0.005 * Math.random();

            this._smokes.add(smoke);
        }

        this._smokes.position.z = 80;

        this._stage.add(this._smokes);
    };

    public start = () => {
        // @ts-ignore
        TweenMax.to(this._material, 1.0, {
            opacity: 0.6
        });

        this._ready = true;
    };

    public update = () => {
        this._smokes.children.forEach((mesh) => {
            // @ts-ignore
            mesh.velocity += mesh.accel;
            // @ts-ignore
            mesh.position.y += mesh.velocity;

            if (mesh.position.y > 520) {
                mesh.position.y = -520;
                // @ts-ignore
                mesh.velocity = 0;
            }
        });
    };

    public remove = () => {
        this._stage.remove(this._smokes);
        this._ready = false;
    };

    get ready(): boolean {
        return this._ready;
    }
}
