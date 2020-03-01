import { FFT } from '../../../common/audio/FFT';
import { Sketch } from '../common/Sketch';
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TweenMax, {Expo} from 'gsap';
import {IcosaVS, IcosaFS} from './IcosaShader';
import {pVS, pFS} from './PlaneShader';
import {AppConfig} from '~/assets/ts/practice/Config';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export class Item19 extends Sketch {

    private _time = 0;
    private _width = 0;
    private _height = 0;
    private _renderer;
    private _camera;
    private _stage;
    private _text: THREE.Mesh;
    private _audioContext: FFT;
    private _outSideMat: THREE.MeshBasicMaterial;
    private _mediaElement: HTMLAudioElement;
    private _analyser: THREE.AudioAnalyser;
    private _material: THREE.ShaderMaterial;
    private _audioUniforms: {tAudioData: {}};
    private _planeUniforms: {time: {}, resolution: {}};
    private _controls;
    private _icosas: THREE.Group;

    private _composer: EffectComposer;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        const ratio = window.devicePixelRatio;
        const canvasSize = this._store.getters['Common/canvasSize'];
        this._width = canvasSize.width;
        this._height = canvasSize.height;
        this._store.commit('Practice/SET_VS_TEXT', 'This is threejs example and there is no own GLSL.');
        this._store.commit('Practice/SET_FS_TEXT', 'This is threejs example and there is no own GLSL.');

        const context: WebGL2RenderingContext = this._canvas.getContext( 'webgl2', { alpha: false } ) as WebGL2RenderingContext;
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            context: context
        });
        this._renderer.setSize(canvasSize.width / ratio, canvasSize.height / ratio);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0x000000);

        this._stage = new THREE.Scene();
        // this._stage.fog = new THREE.FogExp2(0x000000, 0.0008);

        this._camera = new THREE.PerspectiveCamera(45, canvasSize.width/canvasSize.height, 0.1, 2000);
        this._camera.position.set(0, 0, 1000);
        this._camera.lookAt(new THREE.Vector3(0, 0, -1));

        const light = new THREE.DirectionalLight(0xffffff, 1.0);
        this._stage.add(light);

        const outSide = new THREE.SphereGeometry(1000, 32, 32);
        this._outSideMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            depthTest: false
        });
        const sphere = new THREE.Mesh(outSide, this._outSideMat);
        sphere.renderOrder = -2;
        this._stage.add(sphere);

        var loader = new THREE.FontLoader();
        loader.load( '/assets/font/helvetiker_regular.typeface.json',  ( font ) => {
            const geometry = new THREE.TextGeometry( 'T I M E', {
                font: font,
                size: 10,
                height: 5,
                bevelEnabled: false
            });

            const materials = [
                new THREE.MeshBasicMaterial( { color: 0xffffff} )
            ];

            this._text = new THREE.Mesh(geometry, materials);
            this._text.position.set(-20, -5, 900);

            this._stage.add(this._text);
        });

        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        this._controls.update();

        this._store.commit('Practice/SET_MUSIC_MODE', true);
        this._store.watch(AppConfig.ON_MUSIC_STATE_CHANGED, this.onMusicStateChanged);

        this._renderer.render(this._stage, this._camera);
    };

    private setComposer = ():void => {
        this._composer = new EffectComposer(this._renderer);
        let renderPass = new RenderPass(this._stage, this._camera);
        let effectGlitch = new GlitchPass(0.01);

        this._composer.addPass(renderPass);
        this._composer.addPass(effectGlitch);
    };

    private onMusicStateChanged = ():void => {
        if (this._store.getters['Practice/musicPlayState']) {
            this.readyToMusic();
        } else {
            this._mediaElement.pause();
            this.pause();
        }
    };

    private randomCameraMove = (): void => {
        // @ts-ignore
        TweenMax.to(this._camera.position, 10, {
            x: rand(-50, 50),
            z: rand(-50, 50),
            ease: Expo.easeInOut,
            onComplete: this.randomCameraMove
        });
    };

    private generateIcosahedron = () => {
        let geometry = new THREE.IcosahedronGeometry(10, 0);
        this._material = new THREE.ShaderMaterial({
            vertexShader: IcosaVS,
            fragmentShader: IcosaFS,
            morphTargets: true,
            uniforms: this._audioUniforms,
        });

        for ( let i = 0; i < 12; i ++ ) {
            const vertices: THREE.Vector3[] = [];
            for ( let v = 0; v < geometry.vertices.length; v ++ ) {
                vertices.push( geometry.vertices[ v ].clone() );

                if ( v === i ) {
                    vertices[ vertices.length - 1 ].x *= 2;
                    vertices[ vertices.length - 1 ].y *= 2;
                    vertices[ vertices.length - 1 ].z *= 2;
                }
            }
            geometry.morphTargets.push( { name: "target" + i, vertices: vertices } );
        }

        // @ts-ignore
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );

        const mesh = new THREE.Mesh(geometry, this._material);
        this._icosas.add(mesh);
    };

    private readyToMusic = (): void => {
        const listener = new THREE.AudioListener();
        const audio = new THREE.Audio( listener );
        this._mediaElement = new Audio( '/assets/audio/music.mp3' );
        this._mediaElement.loop = false;
        this._mediaElement.play();
        audio.setMediaElementSource( this._mediaElement );

        this._analyser = new THREE.AudioAnalyser( audio, 128 );
        this._audioUniforms = {
            tAudioData: { value: new THREE.DataTexture( this._analyser.data, 128 / 2, 1, THREE.LuminanceFormat ) }
        };

        this._mediaElement.play();
        this.play();

        // @ts-ignore
        TweenMax.to(this._camera.position, 25, {
            z: 40,
            ease: Expo.easeInOut,
            // onComplete: this.randomCameraMove
        });

        setTimeout(() => {
            this.setComposer();
        }, 4000);

        setTimeout(() => {
            this._icosas = new THREE.Group();

            this._stage.remove(this._text);
            this.generateIcosahedron();

            this._composer.reset();
            // @ts-ignore
            this._composer = null;

            this._stage.add(this._icosas);
            this._outSideMat.color = new THREE.Color(0xffffff);
        }, 9500);

        setTimeout(() => {
            this.generatePlane();
        }, 30000);
    };

    private generatePlane = () => {
        this._planeUniforms = {
            time: {
                value: this._time,
            },
            resolution: {
                value: new THREE.Vector2(this._width, this._height)
            },
        };
        const plane = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: pVS,
            fragmentShader: pFS,
            uniforms: this._planeUniforms,
            depthTest: false,
        });
        const mesh = new THREE.Mesh(plane, material);
        mesh.renderOrder = -1;
        mesh.position.z = -50;

        this._stage.add(mesh);
    };

    public dispose = (): void => {
        this.pause();

        this._audioContext.pause();

        if (this._renderer) {
            this._stage.dispose();
            this._renderer.dispose();
        }
    };

    private moprh = (average: number) => {
        if (this._icosas) {
            this._icosas.children.forEach((mesh, index) => {
                for (let i = 0; i < 12; i++) {
                    // @ts-ignore
                    mesh.morphTargetInfluences[i] = average * 0.002;
                }

                mesh.rotation.x += rand(0.001, 0.01);
                mesh.rotation.y += rand(0.001, 0.01);
            });
        }
    };

    public update = () => {
        this.animate();
        this._controls.update();

        this._timer = requestAnimationFrame(this.update);
        this._time += 0.01;

        if (this._planeUniforms) {
            // @ts-ignore
            this._planeUniforms.time.value = this._time;
        }
    };

    public animate = () => {
        this._analyser.getFrequencyData();
        this.moprh(this._analyser.getAverageFrequency());

        // @ts-ignore
        this._audioUniforms.tAudioData.value.needsUpdate = true;

        if (this._composer) {
            this._composer.render();
        } else {
            this._renderer.render(this._stage, this._camera);
        }
    };
}
