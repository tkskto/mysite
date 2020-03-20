import * as THREE from 'three';
import Stove from '~/assets/ts/playground/Sauna/first/Stove';
import Stone from '~/assets/ts/playground/Sauna/first/Stone';
import Floor from '~/assets/ts/playground/Sauna/first/Floor';
import Smoke from '~/assets/ts/playground/Sauna/first/Smoke';
import Bulb from '~/assets/ts/playground/Sauna/first/Bulb';
import TV from '~/assets/ts/playground/Sauna/first/TV';

export default class First {
    private _stage: THREE.Scene;
    private _stove: Stove;
    private _stone: Stone;
    private _floor: Floor;
    private _smoke: Smoke;
    private _bulb: Bulb;
    private _tv: TV;
    private _ready: boolean = false;

    constructor(private _camera: THREE.PerspectiveCamera, private _renderer: THREE.WebGLRenderer, _width, _height) {
        this._stage = new THREE.Scene();
        this._stage.frustumCulled = false;

        this._stove = new Stove(this._stage, this._renderer, _width, _height);
        this._stove.generate();

        this._stone = new Stone(this._stage);
        this._stone.generate();

        this._floor = new Floor(this._stage);
        this._floor.generate();

        this._smoke = new Smoke(this._stage);
        this._smoke.generate();

        this._bulb = new Bulb(this._stage);
        this._bulb.generate();

        this._tv = new TV(this._stage);

        this._ready = true;
    }

    public update() {
        this._stove.update();
        // this._water.update();
        this._smoke.update();
        this._renderer.render(this._stage, this._camera);
    }

    get ready(): boolean {
        return this._ready;
    }
}
