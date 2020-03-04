import * as THREE from 'three';
import TweenMax from "gsap";

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class Line {
    private _cubes: THREE.Group;
    private _material: THREE.MeshBasicMaterial;
    private _texture: THREE.Texture;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene, private _camera: THREE.PerspectiveCamera) {
        this._texture = new THREE.TextureLoader().load('/assets/img/line.png');
    }

    public generate = () => {
        this._cubes = new THREE.Group();
        this._material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.3, 0.6, 0.7),
            blending: THREE.CustomBlending,
            transparent: true,
            map: this._texture
        });

        for (let i = 0; i < 2000; i++) {
            const geometry = new THREE.BoxGeometry(1, 1, rand(100, 200), 1, 1, 1);
            const mesh = new THREE.Mesh(geometry, this._material);

            mesh.position.set(rand(-10, 10) * 100, rand(-300, 300), rand(200, 500));

            this._cubes.add(mesh);
        }

        this._material.opacity = 0;
        this._stage.add(this._cubes);
        this._ready = true;
    };

    public start = () => {
        this._material.opacity = 1;
        if (this._cubes) {
            this._cubes.position.z = 600;

            // @ts-ignore
            TweenMax.to(this._cubes.position, 12, {
                z: -1000,
            });

            // @ts-ignore
            TweenMax.to(this._material, 10, {
                opacity: 0,
                onComplete: () => {
                    this._stage.remove(this._cubes);
                    this._ready = false;
                }
            });
        }
    };

    public remove = () => {
        this._stage.remove(this._cubes);
    }
}
