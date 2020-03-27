import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
// import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';

export default class Composer {
    private _composer: EffectComposer;
    private _renderTarget: THREE.WebGLRenderTarget;
    private _ready = false;

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _camera: THREE.PerspectiveCamera) {
        this._stage.frustumCulled = false;
        this._renderTarget = new THREE.WebGLRenderTarget(512, 512, {
            magFilter: THREE.LinearFilter,
            minFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping
        });
        this._composer = new EffectComposer(this._renderer, this._renderTarget);
    }

    public setComposer = () => {
        const renderPass = new RenderPass(this._stage, this._camera);
        renderPass.clearColor = new THREE.Color( 0, 0, 0 );
        renderPass.clearAlpha = 0;

        var effectFilm = new FilmPass( 0, 0, 10 );
        var effect = new ShaderPass( DotScreenShader );
        effect.uniforms[ 'scale' ].value = 1;

        effect.renderToScreen = false;

        this._composer.addPass(renderPass);
        this._composer.addPass(effectFilm);

        this._ready = true;
    };

    public render = () => {
        this._composer.render(0.01);
    };

    public reset = () => {
        this._composer.reset();
        this._ready = false;
    };

    get texture(): THREE.Texture {
        return this._renderTarget.texture;
    }

    get ready(): boolean {
        return this._ready;
    }
}
