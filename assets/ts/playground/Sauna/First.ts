import * as THREE from 'three';
import Stove from '~/assets/ts/playground/Sauna/Stove';
import Stone from '~/assets/ts/playground/Sauna/Stone';
import * as Cannon from 'cannon';

const time = 1/60;

export default class First {
    private _stage: THREE.Scene;
    private _world: Cannon.World;
    private _stove: Stove;
    private _stone: Stone;
    private _ready: boolean = false;

    constructor(private _camera: THREE.PerspectiveCamera, private _renderer: THREE.WebGLRenderer, _width, _height) {
        this._stage = new THREE.Scene();

        this._world = new Cannon.World();
        this._world.gravity.set(0,-9.8,0);
        // this._world.gravity.set(0,0,-9.8);

        this._stove = new Stove(this._stage, this._renderer, this._world, _width, _height);
        this._stove.generate();

        this._stone = new Stone(this._stage, this._world);
        this._stone.generate();

        this._ready = true;
    }

    public update() {
        this._world.step(time);
        this._stone.update();
        this._stove.update();
        this._renderer.render(this._stage, this._camera);
    }

    get ready(): boolean {
        return this._ready;
    }
}
