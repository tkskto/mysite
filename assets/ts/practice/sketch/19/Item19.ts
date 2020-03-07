import { Sketch } from '../common/Sketch';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TweenMax, {Expo} from 'gsap';
import {AppConfig} from '~/assets/ts/practice/Config';

import Text from './Text';
import IcosaHedron from './IcosaHedron';
import Rain from './Rain';
import Background from './Background';
import Line from './Line';
import Composer from './Composer';
import Particle from './Particle';
import Smoke from './Smoke';
import {LensFlare} from './LensFlare';

export class Item19 extends Sketch {
    private _time = 0;
    private _width = 0;
    private _height = 0;
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.PerspectiveCamera;
    private _stage: THREE.Scene;
    private _mediaElement: HTMLAudioElement;
    private _analyser: THREE.AudioAnalyser;
    // private _controls;

    private _text: Text;
    private _icosaHedron: IcosaHedron;
    private _rain: Rain;
    private _line: Line;
    private _background: Background;
    private _composer: Composer;
    private _star: Particle;
    private _smoke: Smoke;
    private _scene: number = 0;
    private _lensFrare: LensFlare;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        document.body.classList.add(`id-${this._id}`);
        const ratio = window.devicePixelRatio;
        const canvasSize = this._store.getters['Common/canvasSize'];
        this._width = canvasSize.width;
        this._height = canvasSize.height;
        this._store.commit('Practice/SET_VS_TEXT', 'This is threejs example and there is no own GLSL.');
        this._store.commit('Practice/SET_FS_TEXT', 'This is threejs example and there is no own GLSL.');

        const context: WebGL2RenderingContext = this._canvas.getContext( 'webgl2', { antialias: true, alpha: true } ) as WebGL2RenderingContext;
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            context: context
        });
        this._renderer.setSize(canvasSize.width / ratio, canvasSize.height / ratio);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0x000000);

        this._stage = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(45, canvasSize.width/canvasSize.height, 0.1, 2000);
        this._camera.position.set(0, 0, 1000);
        this._camera.lookAt(new THREE.Vector3(0, 0, -1));

        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        const amb = new THREE.AmbientLight(0xffffff, 0.2);
        this._stage.add(light, amb);

        this._text = new Text(this._stage);
        this._text.generate();
        this._icosaHedron = new IcosaHedron(this._stage);
        this._smoke = new Smoke(this._stage);

        this._line = new Line(this._stage, this._camera);
        this._line.generate();

        this._rain = new Rain(this._stage);
        this._rain.generate();

        this._composer = new Composer(this._stage, this._renderer, this._camera);
        this._star = new Particle(this._stage);
        this._lensFrare = new LensFlare(this._stage);

        // this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        // this._controls.update();

        this._store.commit('Practice/SET_MUSIC_MODE', true);
        this._store.watch(AppConfig.ON_MUSIC_STATE_CHANGED, this.onMusicStateChanged);

        this._renderer.render(this._stage, this._camera);
    };

    private onMusicStateChanged = ():void => {
        if (this._store.getters['Practice/musicPlayState']) {
            this.readyToMusic();
        } else {
            this._mediaElement.pause();
            this.pause();
        }
    };

    private readyToMusic = (): void => {
        const listener = new THREE.AudioListener();
        const audio = new THREE.Audio( listener );
        this._mediaElement = new Audio( '/assets/audio/music.mp3' );
        this._mediaElement.loop = false;
        this._mediaElement.play();
        audio.setMediaElementSource( this._mediaElement );

        this._analyser = new THREE.AudioAnalyser( audio, 1024 );
        this._background = new Background(this._stage, this._analyser, this._width, this._height);
        this._background.generate();
        this._smoke.generate();

        // @ts-ignore
        TweenMax.to(this._camera.position, 40, {
            z: 600,
            ease: Expo.easeInOut,
        });

        this._smoke.start();

        // シーン1 サウナ
        setTimeout(() => {
            this._text.remove();
            this._icosaHedron.generate();

            setTimeout(() => {
                this._icosaHedron.move(this._scene);
                this._scene++;
                this._background.show();
                this._smoke.remove();
                // this._star.generate();
            }, 2000);
        }, 20000);

        // シーン2 水風呂
        setTimeout(() => {
            // this._text.changeText(this._scene);
            this._background.changeMaterial(this._scene);
            this._line.start();

            setTimeout(() => {
                this._icosaHedron.move(this._scene);
                this._rain.start();
                this._scene++;
            }, 8000);
        }, 40850);

        // シーン3 外気よく
        setTimeout(() => {
            // this._star.start();
            this._background.changeMaterial(this._scene);
            this._line.remove();
            this._rain.remove();
        }, 80000);

        // シーン4 ととのい
        setTimeout(() => {
            // this._star.remove();
            this._background.changeMaterial(this._scene);
            this._scene++;
            // this._composer.setComposer();
        }, 120000);

        // ラスト
        setTimeout(() => {
            this._background.changeMaterial(this._scene);
            this._lensFrare.generate();
            this._icosaHedron.last();

            setTimeout(() => {
                this._lensFrare.setSunFlare();
            }, 7500);
        }, 132000);

        this.play();
    };

    public dispose = (): void => {
        this.pause();

        this._mediaElement.pause();
        this._mediaElement.remove();

        if (this._renderer) {
            this._stage.dispose();
            this._renderer.dispose();
        }
    };

    public update = () => {
        this.animate();
        // this._controls.update();

        if (this._icosaHedron.ready) {
            this._camera.lookAt(this._icosaHedron.mesh.position);
        }

        this._timer = requestAnimationFrame(this.update);
        this._time += 0.01;
    };

    public animate = () => {
        this._analyser.getFrequencyData();
        const average: number = this._analyser.getAverageFrequency();

        if (this._smoke.ready) {
            this._smoke.update();
        }

        if (this._star.ready) {
            this._star.update();
        }

        if (this._rain.ready) {
            this._rain.update(average);
        }

        if (this._text.ready) {
            this._text.update();
        }

        if (this._background.ready) {
            this._background.update(this._time);
        }

        if (this._icosaHedron.ready) {
            this._icosaHedron.update(average);
        }

        if (this._composer.ready) {
            this._composer.render();
        } else {
            this._renderer.render(this._stage, this._camera);
        }
    }
}
