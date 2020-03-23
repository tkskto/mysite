import * as THREE from 'three';
import {pFS, pVS} from './shader/PlaneShader';
import {SunFS, SunVS} from './shader/SunShader';
import {MistVS, MistFS} from './shader/MistShader';
import {CircleVS, CircleFS} from './shader/CircleShader';
import TweenMax from 'gsap';

export default class VJ {
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderTarget: THREE.WebGLRenderTarget;
    private _planeUniforms: {};
    private _materials: THREE.ShaderMaterial[] = [];
    private _mesh: THREE.Mesh;
    private _ready = false;
    private _index = 0;
    private _decay = 1;

    constructor(private _renderer: THREE.WebGLRenderer, width: number, height: number) {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this._camera.position.set(0, 0, 200);
        const audio = new Uint8Array(512);
        this._planeUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            audio: {
                value: new THREE.DataTexture(audio, 1024 / 2, 1, THREE.LuminanceFormat),
            },
            decay: {
                value: 1.0
            },
        };

        this._renderTarget = new THREE.WebGLRenderTarget(width, height, {
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping
        });
    }

    public generate = () => {
        const plane = new THREE.PlaneGeometry(2, 2);
        this._materials.push(
            //
            new THREE.ShaderMaterial({
                vertexShader: CircleVS,
                fragmentShader: CircleFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: MistVS,
                fragmentShader: MistFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: SunVS,
                fragmentShader: SunFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
        );

        this._mesh = new THREE.Mesh(plane, this._materials[0]);
        this._mesh.renderOrder = -1;
        this._mesh.position.z = 100;
        this._camera.lookAt(this._mesh.position);

        this._scene.add(this._camera);
        this._scene.add(this._mesh);

        this._mesh.visible = false;
    };

    public setAnalyzer = (analyzer: THREE.AudioAnalyser) => {
        // @ts-ignore
        this._planeUniforms.audio.value = new THREE.DataTexture(analyzer.data, 1024 / 2, 1, THREE.LuminanceFormat);
    };

    public show() {
        this._mesh.visible = true;
        this._ready = true;
    }

    public changeMaterial(_index) {
        let index = this._index += _index;

        if (index === -1) {
            index = this._materials.length - 1;
        } else if (index === this._materials.length) {
            index = 0;
        }

        this._index = index;

        // @ts-ignore
        TweenMax.to(this, 1, {
            _decay: 0,
            onComplete: () => {
                this._mesh.material = this._materials[index];
                // @ts-ignore
                TweenMax.to(this, 1, {
                    _decay: 1,
                });
            }
        });
    }

    public update (time) {
        // @ts-ignore
        this._planeUniforms.time.value = time;
        // @ts-ignore
        this._planeUniforms.audio.value.needsUpdate = true;
        // @ts-ignore
        this._planeUniforms.decay.value = this._decay;

        this._renderer.setRenderTarget(this._renderTarget);
        this._renderer.render(this._scene, this._camera);
        this._renderer.setRenderTarget(null);
    }

    get ready(): boolean {
        return this._ready;
    }

    get renderTarget(): THREE.WebGLRenderTarget {
        return this._renderTarget;
    }
}
