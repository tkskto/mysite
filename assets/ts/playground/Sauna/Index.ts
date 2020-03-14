import * as THREE from 'three';
import First from '~/assets/ts/playground/Sauna/First';
import BackGround from '~/assets/ts/playground/Sauna/BackGround';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class Sauna {
    private _renderer: THREE.WebGLRenderer;
    private _stage: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _first: First;
    private _background: BackGround;
    private _time: number = 0;
    private _controls: OrbitControls;

    constructor(private _canvas: HTMLCanvasElement, private _width: number, private _height: number) {
        const ratio = window.devicePixelRatio;

        this._renderer = new THREE.WebGLRenderer({
            canvas: _canvas
        });

        this._renderer.setSize(_width, _height);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0xffffff);

        this._stage = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(60, _width/_height, 0.1, 200);
        this._camera.position.set(0, 30, 30);
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));

        const light = new THREE.DirectionalLight(0xffffff, 1.0);
        // this._stage.add(light);

        this._background = new BackGround(this._stage, _width, _height);
        this._background.generate();

        this._first = new First(this._camera, this._renderer, _width, _height);

        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        this._controls.update();

        // helper
        const gridHelper = new THREE.GridHelper(1000, 20) // size, step
        this._stage.add(gridHelper);
        const axisHelper = new THREE.AxesHelper(1000);
        this._stage.add(axisHelper);

        this.update();
    }

    private update = () => {
        requestAnimationFrame(this.update);

        this.animate();
    };

    private animate = () => {
        this._renderer.autoClear = true;

        this._renderer.render(this._stage, this._camera);

        this._renderer.autoClear = false;

        if (this._first.ready) {
            this._first.update();
        }
    }
}
