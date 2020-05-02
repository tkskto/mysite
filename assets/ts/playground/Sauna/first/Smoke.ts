import AnimateMesh from '~/assets/ts/common/gl/AnimateMesh';
import {
    DoubleSide,
    Group,
    Mesh,
    MeshBasicMaterial,
    NormalBlending,
    PlaneBufferGeometry,
    Scene,
    Texture,
    TextureLoader
} from 'three'

function rand (min, max): number {
    return min + Math.random() * (max - min);
}

export default class Smoke {
    private _texture: Texture;
    private _geometry: PlaneBufferGeometry;
    private _material: MeshBasicMaterial;
    private _meshArr: AnimateMesh[] = [];
    private _smokes: Group;
    private _ready = false;

    constructor(private _stage: Scene) {}

    public generate = async (): Promise<void> => {
        this._texture = new TextureLoader().load(await require('~/assets/img/playground/sauna/smoke.png'));
        this._smokes = new Group();
        this._geometry = new PlaneBufferGeometry(10, 10);
        this._material = new MeshBasicMaterial({
            color: 0xffffff,
            map: this._texture,
            transparent: true,
            blending: NormalBlending,
            depthTest: false,
            opacity: 0.1,
            side: DoubleSide
        });

        for (let i = 0; i < 50; i++) {
            const smoke = new AnimateMesh(new Mesh(this._geometry, this._material), 0, 0.001 * Math.random());

            smoke.mesh.position.set(
                rand(-3, 3),
                20,
                rand(-0.5, 0.5),
            );

            smoke.mesh.rotation.z = Math.random() * Math.PI;

            this._meshArr.push(smoke);
            this._smokes.add(smoke.mesh);
        }

        this._stage.add(this._smokes);
        this._ready = true;
    };

    public update = (): void => {
        this._meshArr.forEach((item) => {
            item.animate();

            if (item.mesh.position.y > 40) {
                item.reset();
                item.mesh.position.y = 20;
            }
        });
    };

    get ready(): boolean {
        return this._ready;
    }
}
