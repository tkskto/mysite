import * as THREE from 'three';
import {pFS, pVS} from './PlaneShader';
import {SunFS, SunVS} from './SunShader';
import {MistVS, MistFS} from './MistShader';
import {ParticleVS, ParticleFS} from './ParticleShader';
import {CircleVS, CircleFS} from './CircleShader';
import TweenMax from 'gsap';
// import {HallFS, HallVS} from './SunShader';

export default class Background {
    private _planeUniforms: {};
    private _materials: THREE.ShaderMaterial[] = [];
    private _mesh: THREE.Mesh;
    private _ready: boolean = false;
    private _time: number = 0;
    private _index: number = 0;
    private _var: number = 1;

    constructor(private _stage: THREE.Scene, _analyser: THREE.AudioAnalyser, width: number, height: number) {
        const texture = new THREE.TextureLoader().load('/assets/img/kabukicho.jpg');
        this._planeUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            audio: {
                value: new THREE.DataTexture( _analyser.data, 1024 / 2, 1, THREE.LuminanceFormat )
            },
            tex: {
                value: texture
            },
            decay: {
                value: 1.0
            },
            scene: {
                value: 0.0
            },
            variable: {
                value: 1.0
            }
        };
    }

    public generate = () => {
        const plane = new THREE.PlaneGeometry(2, 2);
        this._materials.push(
            //
            new THREE.ShaderMaterial({
                vertexShader: SunVS,
                fragmentShader: SunFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            // new THREE.ShaderMaterial({
            //     vertexShader: FireVS,
            //     fragmentShader: FireFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            // 水風呂
            new THREE.ShaderMaterial({
                vertexShader: MistVS,
                fragmentShader: MistFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            // 重い
            // new THREE.ShaderMaterial({
            //     vertexShader: WaterVS,
            //     fragmentShader: WaterFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            // パーティクル
            // new THREE.ShaderMaterial({
            //     vertexShader: ParticleVS,
            //     fragmentShader: ParticleFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            // 円
            new THREE.ShaderMaterial({
                vertexShader: CircleVS,
                fragmentShader: CircleFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
        );

        this._mesh = new THREE.Mesh(plane, this._materials[0]);
        this._mesh.renderOrder = -1;
        this._mesh.position.z = 300;

        this._stage.add(this._mesh);
        this._mesh.visible = false;
    };

    public show() {
        this._mesh.visible = true;
        this._ready = true;
    }

    private change(index) {
        this._mesh.material = this._materials[index];
        this._index = index;
        this._var = 1;

        if (index === 1) {
            setTimeout(() => {
                // @ts-ignore
                this._planeUniforms.scene.value++;

                setTimeout(() => {
                    this._time = 0;
                    // @ts-ignore
                    this._planeUniforms.scene.value++;
                }, 20000);
            }, 3000);
        } else if (index === 2) {
            this._time = 0;
            // @ts-ignore
            this._planeUniforms.scene.value = 0;

            setTimeout(() => {
                // @ts-ignore
                this._planeUniforms.scene.value++;
            }, 2820);
        }
    }

    public changeMaterial(index) {
        // @ts-ignore
        TweenMax.to(this, 3, {
            _var: 0,
            onComplete: () => {
                this.change(index);
            }
        });
    }

    public update (_time, decay) {
        const time = this._index === 1 || this._index === 2 ? this._time : _time;

        // @ts-ignore
        this._planeUniforms.time.value = time;
        // @ts-ignore
        this._planeUniforms.audio.value.needsUpdate = true;
        // @ts-ignore
        this._planeUniforms.decay.value = decay;
        // @ts-ignore
        this._planeUniforms.variable.value = this._var;

        if (this._index === 1 || this._index === 2) {
            this._time += 0.01;
        }
    }

    get ready(): boolean {
        return this._ready;
    }
}
