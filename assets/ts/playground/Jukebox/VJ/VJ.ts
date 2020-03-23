import * as THREE from 'three';
import {pFS, pVS} from './shader/PlaneShader';
import {SunFS, SunVS} from './shader/SunShader';
import {MistVS, MistFS} from './shader/MistShader';
import {CircleVS, CircleFS} from './shader/CircleShader';
import {CosmicVS, CosmicFS} from './shader/CosmicShader';
import {EllipseVS, EllipseFS} from './shader/EllipseShader';
import TweenMax from 'gsap';

export default class VJ {
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderTarget: THREE.WebGLRenderTarget;
    private _planeUniforms: {};
    private _materials: THREE.ShaderMaterial[] = [];
    private _mesh: THREE.Mesh;
    private _ready = false;
    private _decay = 1;
    private _index = 0;

    constructor(private _renderer: THREE.WebGLRenderer, width: number, height: number) {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
        this._camera.position.set(0, 0, 200);
        this._planeUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            audio: {
                value: new THREE.DataTexture( new Int8Array(512), 1024 / 2, 1, THREE.LuminanceFormat )
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
            new THREE.ShaderMaterial({
                vertexShader: CosmicVS,
                fragmentShader: CosmicFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: EllipseVS,
                fragmentShader: EllipseFS,
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

    public show() {
        this._mesh.visible = true;
        this._ready = true;
    }

    public setAnalyzer(analyzer: THREE.AudioAnalyser) {
        // @ts-ignore
        this._planeUniforms.audio.value = new THREE.DataTexture(analyzer.data, 1024 / 2, 1, THREE.LuminanceFormat);
    }

    public changeMaterial(index) {
        this._index += index;

        if (this._index >= this._materials.length) {
            this._index = 0;
        } else if (this._index < 0) {
            this._index = this._materials.length - 1;
        }

        // @ts-ignore
        TweenMax.to(this, 1, {
            _decay: 0,
            onComplete: () => {
                this._mesh.material = this._materials[this._index];
                // @ts-ignore
                TweenMax.to(this, 1, {
                    _decay: 1
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
