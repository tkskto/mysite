import {
    DoubleSide,
    Mesh,
    MeshPhongMaterial,
    MirroredRepeatWrapping,
    NearestFilter,
    PlaneGeometry,
    Scene,
    Texture,
    TextureLoader
} from 'three'

export default class Floor {
    private _texture: Texture;

    constructor(private _stage: Scene) {}

    public generate = async (): Promise<void> => {
        this._texture = new TextureLoader().load(await require('~/assets/img/playground/sauna/floor.jpg'));
        this._texture.magFilter = NearestFilter;
        this._texture.minFilter = NearestFilter;
        this._texture.wrapS = MirroredRepeatWrapping;
        this._texture.wrapT = MirroredRepeatWrapping;
        this._texture.repeat.set(3, 3);

        const geometry = new PlaneGeometry(200, 200);
        const material = new MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xfafaa0,
            emissive: 0x0,
            shininess: 20,
            map: this._texture,
            side: DoubleSide,
            // wireframe: true
        });
        const mesh = new Mesh(geometry, material);
        mesh.rotateX(Math.PI * 0.5);
        mesh.receiveShadow = true;

        this._stage.add(mesh);
    }
}
