import * as SimplexNoise from 'simplex-noise';
import {Mesh, MeshStandardMaterial, Scene, SphereGeometry, Texture, TextureLoader} from 'three'

function rand (min, max): number {
    return min + Math.random() * (max - min);
}

export default class Stone {
    private _texture: Texture;

    constructor(private _stage: Scene) {}

    public generate = async (): Promise<void> => {
        this._texture = new TextureLoader().load(await require('~/assets/img/playground/sauna/stone.jpg'));

        const simplex = new SimplexNoise();
        const geometry = new SphereGeometry(1, 32, 32);
        const material = new MeshStandardMaterial({
            color: 0xffffff,
            map: this._texture,
        });

        geometry.vertices.forEach((v) => {
            v.x += simplex.noise2D(v.y, v.z) * 0.1;
            v.y += simplex.noise2D(v.z, v.x) * 0.1;
            v.z += simplex.noise2D(v.x, v.y) * 0.1;
        });

        for (let i = 0; i < 300; i++) {
            const mesh = new Mesh(geometry, material);

            mesh.position.set(
                rand(-3.5, 3.5),
                rand(1, 22),
                rand(-3.5, 3.5)
            );

            this._stage.add(mesh);
        }
    };
}
