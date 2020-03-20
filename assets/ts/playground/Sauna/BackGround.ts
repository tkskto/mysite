import * as THREE from 'three';
import {SaunaVS, SaunaFS} from './SaunaShader';

export default class Background {
    private _uniform: {};
    private _mesh: THREE.Mesh;

    constructor(private _stage: THREE.Scene, width, height) {
        this._uniform = {
            resolution: {
                value: new THREE.Vector2(width, height)
            }
        };
    }

    public generate() {
        const plane = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
        const material = new THREE.ShaderMaterial({
            vertexShader: SaunaVS,
            fragmentShader: SaunaFS,
            uniforms: this._uniform,
            depthTest: false
        });

        this._mesh = new THREE.Mesh(plane, material);
        this._mesh.renderOrder = -1;
        this._stage.add(this._mesh);
    }
}
