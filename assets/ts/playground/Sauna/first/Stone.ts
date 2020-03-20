import * as THREE from 'three';
import * as SimplexNoise from 'simplex-noise';

function rand (min, max) {
    return min + Math.random() * (max - min);
}

export default class Stone {
    private _texture: THREE.Texture;

    constructor(private _stage: THREE.Scene, width, height) {
        this._texture = new THREE.TextureLoader().load('/assets/img/stone.jpg');
    }

    public generate = () => {
        const simplex = new SimplexNoise();
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: this._texture,
        });

        geometry.vertices.forEach((v) => {
            v.x += simplex.noise2D(v.y, v.z) * 0.1;
            v.y += simplex.noise2D(v.z, v.x) * 0.1;
            v.z += simplex.noise2D(v.x, v.y) * 0.1;
        });

        for (let i = 0; i < 300; i++) {
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(
                rand(-3.5, 3.5),
                rand(1, 22),
                rand(-3.5, 3.5)
            );

            this._stage.add(mesh);
        }
    };
}
