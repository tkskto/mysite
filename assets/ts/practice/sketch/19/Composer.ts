import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

export default class Composer {
    private _composer: EffectComposer;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _camera: THREE.PerspectiveCamera) {
        this._composer = new EffectComposer(this._renderer);
    }

    public setComposer = () => {
        let renderPass = new RenderPass(this._stage, this._camera);
        let effectGlitch = new GlitchPass();

        this._composer.addPass(renderPass);
        this._composer.addPass(effectGlitch);
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
