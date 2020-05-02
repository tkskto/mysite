import {
    WebGLRenderer,
    Scene,
    DirectionalLight,
    AmbientLight,
    PerspectiveCamera,
} from 'three'
import Pool from '~/assets/ts/playground/Sauna/second/Pool';

export default class Second {
    private _stage: Scene;
    private _pool: Pool;
    private _ready = false;

    constructor(private _camera: PerspectiveCamera, private _renderer: WebGLRenderer) {
        this._stage = new Scene();

        const light = new DirectionalLight(0xffffff, 1.0);
        this._stage.add(light);

        const amb = new AmbientLight(0xdddddd, 0.5);
        this._stage.add(amb);

        this._pool = new Pool(this._stage);
        this._pool.generate(15, 10, light);

        this._ready = true;
    }

    public update(time): void {
        this._pool.update(time);
        this._renderer.render(this._stage, this._camera);
    }

    get ready(): boolean {
        return this._ready;
    }
}
