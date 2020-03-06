import * as THREE from 'three';
import {pFS, pVS} from './PlaneShader';
import {SunFS, SunVS} from './SunShader';
import {MistVS, MistFS} from './MistShader';
import {FireVS, FireFS} from './FireShader';
import {WaterVS, WaterFS} from './WaterShader';
// import {HallFS, HallVS} from './SunShader';

export default class Background {
    private _planeUniforms: {};
    private _materials: THREE.ShaderMaterial[] = [];
    private _mesh: THREE.Mesh;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene, width: number, height: number) {
        const texture = new THREE.TextureLoader().load('/assets/img/kabukicho.jpg');
        this._planeUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            tex: {
                value: texture
            }
        };
    }

    public generate = () => {
        const plane = new THREE.PlaneGeometry(2, 2);
        this._materials.push(
            // new THREE.ShaderMaterial({
            //     vertexShader: WaterVS,
            //     fragmentShader: WaterFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            // new THREE.ShaderMaterial({
            //     vertexShader: FireVS,
            //     fragmentShader: FireFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            new THREE.ShaderMaterial({
                vertexShader: SunVS,
                fragmentShader: SunFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
            // new THREE.ShaderMaterial({
            //     vertexShader: MistVS,
            //     fragmentShader: MistFS,
            //     uniforms: this._planeUniforms,
            //     depthTest: false,
            //     side: THREE.DoubleSide
            // }),
            new THREE.ShaderMaterial({
                vertexShader: pVS,
                fragmentShader: pFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
        );

        this._mesh = new THREE.Mesh(plane, this._materials[0]);
        this._mesh.renderOrder = -1;
        this._mesh.position.z = 1000;

        this._stage.add(this._mesh);
        this._ready = true;
    };

    public changeMaterial(index) {
        this._mesh.material = this._materials[1];
    }

    public update (time) {
        // @ts-ignore
        this._planeUniforms.time.value = time;
    }

    get ready(): boolean {
        return this._ready;
    }
}
