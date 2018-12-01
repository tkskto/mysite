import { Sketch } from '../common/Sketch';
import { Default } from './Shader';
import { WebGLContext } from '../../../common/gl/Context';
import { Renderer } from '../../../common/gl/Renderer';
import { Geometry } from '../../../common/gl/Geometry';
import { Mesh } from '../../../common/gl/Mesh';
import { Program } from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';
import {Vector} from '../../../common/gl/Vector';
import {Cube} from '../../utils/Cube';
import {Sphere} from '../../utils/Sphere';

export class Item12 extends Sketch {

    private _ctx: WebGLContext;
    private _gl: WebGLRenderingContext;
    private _default: Program;
    private _renderer: Renderer;
    private _time = 0;
    private _mCube: Mesh;
    private _mSphere: Mesh;
    private _dirLight: Vector = new Vector(0.0, 0.0, 0.0);
    private _ambientLight = [0.1, 0.1, 0.1, 1.0];

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(1, this._canvas);
        this._gl = this._ctx.ctx;
        const shader: Default = new Default(this._gl);
        this._default = new Program(this._gl, shader,
            ['position', 'color', 'normal', 'uv'],
            [3, 4, 3, 2],
            ['mvpMatrix', 'mMatrix', 'invMatrix', 'lightPosition', 'cameraPosition', 'ambientColor'],
            [
                GLConfig.UNIFORM_TYPE_MATRIX4,
                GLConfig.UNIFORM_TYPE_MATRIX4,
                GLConfig.UNIFORM_TYPE_MATRIX4,
                GLConfig.UNIFORM_TYPE_VECTOR3,
                GLConfig.UNIFORM_TYPE_VECTOR3,
                GLConfig.UNIFORM_TYPE_VECTOR4
            ]
        );
        this._renderer = new Renderer(this._store, this._ctx);

        const dCube: Cube = new Cube(1.0);
        const dSphere: Sphere = new Sphere(64, 64, 0.1, [0.1, 0.1, 0.6]);
        const pCube: Geometry = new Geometry(this._gl, dCube).init();
        const gSphere: Geometry = new Geometry(this._gl, dSphere).init();
        this._mCube = new Mesh(this._gl, this._default, pCube, GLConfig.DRAW_TYPE_TRIANGLE);
        this._mCube.castShadow = true;
        this._mSphere = new Mesh(this._gl, this._default, gSphere, GLConfig.DRAW_TYPE_TRIANGLE);
        this._mSphere.castShadow = true;
        this._renderer.add(this._mCube);
        this._renderer.add(this._mSphere);

        // this._model.vertexShaderString = shader.vertexString;
        // this._model.fragmentShaderString = shader.fragmentString;

        this.play();
    };

    private clear = () => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    };

    public dispose = (): void => {
        this.pause();

        if (this._renderer) {
            this._renderer.dispose();
        }
    };

    public update = () => {
        this.animate();
        this._timer = requestAnimationFrame(this.update);

        this._mSphere.rotate(Math.sin(this._time * Math.PI / 180), new Vector(1, 1, 0));

        this._time += 0.01;
    };

    public animate = () => {
        this.clear();
        const cameraPosition = this._store.getters.cameraPosition;
        this._renderer.update(this._dirLight.arr(), cameraPosition.arr(), this._ambientLight, this._time);
    };
}
