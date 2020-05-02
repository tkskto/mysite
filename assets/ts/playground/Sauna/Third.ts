import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
} from 'three'
import Tree from '~/assets/ts/playground/Sauna/third/Tree';

export default class First {
    private _stage: Scene;
    private _ready = false;
    private _tree: Tree;

    constructor(private _camera: PerspectiveCamera, private _renderer: WebGLRenderer, _width, _height) {
        this._stage = new Scene();

        this._tree = new Tree(this._stage, _width, _height);
        this._tree.generate();

        // this._stage.position.y -= 100;

        this._ready = true;
    }

    public update(time: number): void {
        this._tree.update(time);
        this._renderer.render(this._stage, this._camera);
    }

    get ready(): boolean {
        return this._ready;
    }
}
