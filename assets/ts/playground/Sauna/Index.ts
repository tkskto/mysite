import * as THREE from 'three';
import First from '~/assets/ts/playground/Sauna/First';
import Second from '~/assets/ts/playground/Sauna/Second';
import Third from '~/assets/ts/playground/Sauna/Third';
import BackGround from '~/assets/ts/playground/Sauna/background/BackGround';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class Sauna {
    private _renderer: THREE.WebGLRenderer;
    private _stage: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _first: First;
    private _second: Second;
    private _third: Third;
    private _background: BackGround;
    private _time: number = 0;
    private _controls: OrbitControls;
    private _scrollY = 0;

    constructor(private _canvas: HTMLCanvasElement, private _width: number, private _height: number) {
        const ratio = window.devicePixelRatio;
        const width = _width * ratio;
        const height = _height * ratio;

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

        this._camera = new THREE.PerspectiveCamera(60, _width/_height, 0.1, 200);
        this._camera.position.set(15, 15, 55);
        this._camera.lookAt(new THREE.Vector3(15, 15, 0));

        this._background = new BackGround(this._stage, width, height);
        // this._background.generate();

        this._first = new First(this._camera, this._renderer, width, height);
        // this._second = new Second(this._camera, this._renderer, width, height);
        // this._third = new Third(this._camera, this._renderer, width, height);

        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        this._controls.update();

        // helper
        // const axisHelper = new THREE.AxesHelper(1000);
        // this._stage.add(axisHelper);

        this._canvas.addEventListener('mousewheel', this.onScroll.bind(this));

        this.update();
    }

    private onScroll(e) {
        e.preventDefault();
        this._camera.position.y -= (e.deltaY * 0.01);
    }

    private update = () => {
        requestAnimationFrame(this.update);

        // this._camera.lookAt(new Vector3(0, 0, 0));

        this.animate();

        this._time += 0.01;
    };

    private animate = () => {
        this._renderer.autoClear = true;

        this._renderer.render(this._stage, this._camera);

        this._renderer.autoClear = false;

        if (this._first.ready) {
            this._first.update();
        }

        // if (this._second.ready) {
        //     this._second.update(this._time);
        // }

        // if (this._third.ready) {
        //     this._third.update(this._time);
        // }
    }
}
