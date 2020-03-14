import { Sketch } from '../common/Sketch';
import * as THREE from "three";
import {AppConfig} from '~/assets/ts/practice/Config';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import Text from './Text';
import IcosaHedron from './IcosaHedron';
import Rain from './Rain';
import Background from './Background';
import Line from './Line';
import Composer from './Composer';
import Smoke from './Smoke';
import {LensFlare} from './LensFlare';
import Sphere from './Spehre';
import Cube from './Cube';
import TweenMax, {Expo, Power2} from 'gsap';

export class Item19 extends Sketch {
    private _time = 0;
    private _width = 0;
    private _height = 0;
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.PerspectiveCamera;
    private _light: THREE.DirectionalLight;
    private _stage: THREE.Scene;
    private _mediaElement: HTMLAudioElement;
    private _analyser: THREE.AudioAnalyser;
    // private _controls: OrbitControls;

    private _text: Text;
    private _icosaHedron: IcosaHedron;
    private _rain: Rain;
    private _line: Line;
    private _background: Background;
    private _composer: Composer;
    private _smoke: Smoke;
    private _sphere: Sphere;
    private _cube: Cube;
    private _scene: number = 0;
    private _lensFlare: LensFlare;
    private _mouse: THREE.Vector2 = new THREE.Vector2(0.0, 0.0);

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
        this._camera.position.set(0, 0, 800);

        this._light = new THREE.DirectionalLight(0xffffff, 0.6);
        const amb = new THREE.AmbientLight(0xffffff, 0.4);
        this._stage.add(this._light, amb);
        this._cube = new Cube(this._stage, this._width, this._height);

        this._text = new Text(this._stage);
        this._text.generate();
        this._sphere = new Sphere(this._stage);
        this._sphere.generate();
        this._smoke = new Smoke(this._stage);

        this._line = new Line(this._stage, this._camera);
        this._line.generate();

        this._rain = new Rain(this._stage);
        this._rain.generate();

        this._composer = new Composer(this._stage, this._renderer, this._camera);
        // this._star = new Particle(this._stage);
        // this._star.generate();
        this._lensFlare = new LensFlare(this._stage);

        // this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        // this._controls.update();

        this._store.commit('Practice/SET_MUSIC_MODE', true);
        this._store.watch(AppConfig.ON_MUSIC_STATE_CHANGED, this.onMusicStateChanged);

        this._renderer.render(this._stage, this._camera);
    };

    private onMouseMove = (e): void => {
        this._camera.position.x = (e.pageX - this._width * 0.25) * 0.05;
        this._camera.position.y = (e.pageY - this._height * 0.25) * 0.05;

        this._mouse.x = (e.pageX - this._width * 0.25) / (this._width * 0.25);
        this._mouse.y = (e.pageY - this._height * 0.25) / (this._height * 0.25);
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

        this._camera.lookAt(this._sphere.sphere.position);
        this._analyser = new THREE.AudioAnalyser( audio, 1024 );
        this._icosaHedron = new IcosaHedron(this._stage, this._analyser, this._width, this._height);
        this._background = new Background(this._renderer, this._analyser, this._width, this._height);
        this._background.generate();
        this._icosaHedron.generate(this._camera.position.z);
        this._smoke.generate();

        this._smoke.start();
        this._text.start();
        this._sphere.start();

        // シーン1 サウナ
        setTimeout(() => {
            this._canvas.addEventListener('mousemove', this.onMouseMove);
            this._cube.generate(this._background.renderTarget);

            this._text.remove();
            this._smoke.remove();
            this._sphere.remove();

            this._icosaHedron.start();
            this._icosaHedron.changeColor(this._scene);

            this._scene++;
            this._background.show();
        }, 12200);

        setTimeout(() => {
            this._line.start();
        }, 38000);

        // シーン2 水風呂
        setTimeout(() => {
            this._background.changeMaterial(this._scene);

            setTimeout(() => {
                // @ts-ignore
                TweenMax.to(this._camera.position, 5, {
                    z: 600,
                    ease: Power2.easeInOut
                });
            }, 4000);

            setTimeout(() => {
                this._icosaHedron.changeColor(this._scene);
                this._rain.start();
                this._scene++;
            }, 8000);
        }, 40700);

        setTimeout(() => {
            this._rain.remove();
        }, 75000);

        // シーン3 外気よく
        setTimeout(() => {
            // @ts-ignore
            TweenMax.to(this._camera.position, 5, {
                z: 800,
                ease: Power2.easeInOut
            });

            this._background.changeMaterial(this._scene);
            this._scene++;
            this._line.remove();
        }, 81600);

        // ラスト
        setTimeout(() => {
            this._composer.setComposer();
            this._lensFlare.generate();
            this._icosaHedron.last();
            this._background.changeMaterial(this._scene);

            setTimeout(() => {
                this._cube.last();
            }, 3600);

            // @ts-ignore
            TweenMax.to(this._camera.position, 10.3, {
                z: -9200,
                ease: Expo.easeInOut
            });

            setTimeout(() => {
                this._composer.reset();
            }, 3000);

            setTimeout(() => {
                this._cube.stop();
                this._background.remove();
            }, 7500);

            setTimeout(() => {
                this._lensFlare.setSunFlare();
                this._cube.stop();

                setTimeout(() => {
                    this.pause();
                }, 2500);
            }, 7800);
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

        if (this._icosaHedron.ready) {
            this._camera.lookAt(this._icosaHedron.mesh.position);
        }

        this._timer = requestAnimationFrame(this.update);
        this._time += 0.01;

        this._light.position.x = 500 * Math.cos(this._time);
        this._light.position.y = 500 * Math.sin(this._time);
        this._light.position.z = 500 * Math.sin(this._time);
    };

    public animate = () => {
        this._analyser.getFrequencyData();
        const average: number = this._analyser.getAverageFrequency();

        if (this._smoke.ready) {
            this._smoke.update();
        }

        if (this._rain.ready) {
            this._rain.update(average);
        }

        if (this._background.ready) {
            const decay = this._rain.slow ? 0.1 : 1;
            this._background.update(this._time, decay, this._mouse);
        }

        if (this._icosaHedron.move) {
            this._icosaHedron.update(average);
        }

        if (this._composer.ready) {
            this._composer.render();
        } else {
            this._renderer.render(this._stage, this._camera);
        }
    }
}