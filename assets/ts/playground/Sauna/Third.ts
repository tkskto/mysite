import * as THREE from 'three';
import Tree from '~/assets/ts/playground/Sauna/third/Tree';

export default class First {
    private _stage: THREE.Scene;
    private _ready = false;
    private _tree: Tree;

    constructor(private _camera: THREE.PerspectiveCamera, private _renderer: THREE.WebGLRenderer, _width, _height) {
        this._stage = new THREE.Scene();

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
