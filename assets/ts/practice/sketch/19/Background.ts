import * as THREE from 'three';
import {pFS, pVS} from './PlaneShader';
import {SunFS, SunVS} from './SunShader';
// import {HallFS, HallVS} from './SunShader';

export default class Background {
    private _planeUniforms: {};
    private _materials: THREE.ShaderMaterial[] = [];
    private _mesh: THREE.Mesh;

    constructor(private _stage: THREE.Scene, width: number, height: number) {
        this._planeUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
        };
    }

    public generate = () => {
        const plane = new THREE.PlaneGeometry(2, 2);
        this._materials.push(
            new THREE.ShaderMaterial({
                vertexShader: SunVS,
                fragmentShader: SunFS,
                uniforms: this._planeUniforms,
                depthTest: false,
                side: THREE.DoubleSide
            }),
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
        this._mesh.position.z = -50;

        this._stage.add(this._mesh);
    };

    public changeMaterial(index) {
        this._mesh.material = this._materials[1];
    }

    public update (time) {
        // @ts-ignore
        this._planeUniforms.time.value = time;
    }
}
