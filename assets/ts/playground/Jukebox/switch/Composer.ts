import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';

export default class Composer {
    private _composer: EffectComposer;
    private _ready = false;
    private _width;
    private _height;

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _camera: THREE.PerspectiveCamera, _width, _height) {
        this._composer = new EffectComposer(this._renderer);
        this._width = _width;
        this._height = _height;
    }

    public setComposer = () => {
        const renderPass = new RenderPass(this._stage, this._camera);
        const pixelPass = new DotScreenPass(new THREE.Vector2(0, 0), 0, 1);

        this._composer.addPass(renderPass);
        this._composer.addPass(pixelPass);

        this._ready = true;
    };

    public render = () => {
        this._composer.render();
    };

    public reset = () => {
        this._composer.reset();
        this._ready = false;
    };

    get ready(): boolean {
        return this._ready;
    }
}
