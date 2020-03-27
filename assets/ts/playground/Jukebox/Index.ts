import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import Base from './Base';
import Controller from './VJ/Controller';
import Housing from './case/Housing';
import UI from './switch/UI';

export default class JukeBox {
    private _timer: number;
    private _time = 0;
    private _isPlaying = false;
    private _clickFlg = false;
    private _mouse: THREE.Vector2;

    private _base: Base;
    private _controller: Controller;
    private _controls: OrbitControls;
    private _housing: Housing;
    private _ui: UI;

    private _changeFlg = false;

    constructor(private _canvas: HTMLCanvasElement, private _width, private _height) {
        this._base = new Base(_canvas, _width, _height);
    }

    public setup = (): Promise<void> => {
        this._mouse = new THREE.Vector2(0, 0);
        this._canvas.addEventListener('click', this.onClick);

        return new Promise(resolve => {
            this._controls = new OrbitControls(this._base.camera, this._base.renderer.domElement);
            this._controls.minDistance = 25;
            this._controls.maxDistance = 50;
            this._controls.minPolarAngle = Math.PI * 0.4;
            this._controls.maxPolarAngle = Math.PI * 0.6;
            this._controls.minAzimuthAngle = Math.PI * -0.1;
            this._controls.maxAzimuthAngle = Math.PI * 0.1;
            this._controls.update();

            this._controller = new Controller(this._base.stage, this._base.renderer, this._base.width, this._base.height);

            this._ui = new UI(this._base.stage, this._base.camera, this._base.renderer, this._base.width, this._base.height);
            this._ui.generate();

            this._housing = new Housing(this._base.camera, this._base.renderer);
            this._housing.load().then(() => {
                this._housing.generate();
                resolve();
            });
        });
    };

    private onClickCallback = (_case: number) => {
        if (_case === 1) {
            this._controller.changeMaterial(1);
        } else if (_case === 2) {
            this._controller.changeMaterial(-1);
        } else if (_case === 3) {
            this._controller.changeMusic(1);
            this._changeFlg = true;
        } else if (_case === 4) {
            this._controller.changeMusic(-1);
            this._changeFlg = true;
        }

        setTimeout(() => {
            this._clickFlg = false;
        }, 500);
    };

    private onClick = (e) => {
        if (this._clickFlg) {
            return;
        }

        this._clickFlg = true;
        const x = (e.clientX / this._width) * 2 - 1;
        const y = (e.clientY / this._height) * 2 - 1;

        this._mouse.x = x;
        this._mouse.y = -y;

        const intersect = this._ui.click(this._mouse);

        if (intersect === 0) {
            this._clickFlg = false;
            return;
        }

        this.onClickCallback(intersect);
    };

    private onPlayMusic = async () => {
        if (this._controller.isPlaying && !this._changeFlg) {
            this._controller.pause();
        } else {
            await this._controller.play(this._changeFlg);
            this._ui.setSongName();
            this._changeFlg = false;
        }
    };

    public setMusicData = (data) => {
        return new Promise((resolve) => {
            this._controller.setMusicData(data);
            resolve();
        });
    };

    public start = async () => {
        this.update();

        await this._base.start();

        window.addEventListener('playMusic', this.onPlayMusic);
    };

    private update = () => {
        this.animate();

        this._base.camera.lookAt(0, -1, 0);

        this._timer = requestAnimationFrame(this.update);
        this._time += 0.01;
    };

    private animate = () => {
        this._controls.update();

        if (this._ui.ready) {
            this._ui.update();
        }

        this._base.renderer.clearDepth();
        this._base.renderer.clearColor();

        if (this._controller.ready) {
            this._controller.update(this._time);
        }

        this._base.renderer.autoClear = false;

        if (this._housing.ready) {
            this._housing.update();
        }

        this._base.renderer.render(this._base.stage, this._base.camera);
    }
}
