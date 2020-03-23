import * as THREE from 'three';
import TweenMax, {Power2} from 'gsap';

export default class Base {
    private _renderer: THREE.WebGLRenderer;
    private _stage: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _width: number;
    private _height: number;

    constructor(_canvas: HTMLCanvasElement, _width: number, _height: number) {
        const ratio = window.devicePixelRatio;
        this._width = _width * ratio;
        this._height = _height * ratio;

        this._renderer = new THREE.WebGLRenderer({
            canvas: _canvas,
            antialias: true
        });
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        this._renderer.setSize(_width, _height);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0x000000);

        this._stage = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(60, _width / _height, 0.1, 200);
        this._camera.position.set(0, 20, 100);
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    public start = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._camera.position, 3, {
                y: 3,
                z: 26,
                ease: Power2.easeInOut,
                onComplete: () => {
                    resolve();
                }
            });
        });
    };

    get height(): number {
        return this._height;
    }
    get width(): number {
        return this._width;
    }
    get camera(): THREE.PerspectiveCamera {
        return this._camera;
    }
    get renderer(): THREE.WebGLRenderer {
        return this._renderer;
    }
    get stage(): THREE.Scene {
        return this._stage;
    }
}
