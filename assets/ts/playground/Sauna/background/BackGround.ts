import {SaunaVS, SaunaFS} from './SaunaShader';
import {Mesh, PlaneBufferGeometry, Scene, ShaderMaterial, Vector2} from 'three';

export default class Background {
    private _uniform: {};
    private _mesh: Mesh;

    constructor(private _stage: Scene, width, height) {
        this._uniform = {
            resolution: {
                value: new Vector2(width, height)
            }
        };
    }

    public generate(): void {
        const plane = new PlaneBufferGeometry(2, 2, 1, 1);
        const material = new ShaderMaterial({
            vertexShader: SaunaVS,
            fragmentShader: SaunaFS,
            uniforms: this._uniform,
            depthTest: false
        });

        this._mesh = new Mesh(plane, material);
        this._mesh.renderOrder = -1;
        this._stage.add(this._mesh);
    }
}
