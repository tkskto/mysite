import { Sketch } from '../../../practice/sketch/common/Sketch';
import { WebGLContext } from '../Context';
import { Data } from './pData';
import { Renderer } from '../Renderer';
import { Geometry } from '../Geometry';
import { Mesh } from '../Mesh';
import { Program } from '../Program';
import { GLConfig } from '../../Config';
import {Shader} from '../Shader';

export class Plane extends Sketch {

    private _data: Data = new Data();
    private _gl: WebGLRenderingContext;
    private _default: Program;
    private _renderer: Renderer;
    private _time = 0;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string, private _shader: Shader, private _ctx: WebGLContext) {
        super(_store, _id);
    }

    public setup = (): void => {
        this._gl = this._ctx.ctx;
        this.clear();
        this._default = new Program(this._gl, this._shader,
            ['position', 'color'],
            [3, 4],
            ['mvpMatrix', 'resolution', 'time'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT]
        );
        this._renderer = new Renderer(this._store, this._ctx);

        const line: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(mesh);

        this._store.commit('SET_VS_TEXT', this._shader.vertexString);
        this._store.commit('SET_FS_TEXT', this._shader.fragmentString);

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

        this._time += 0.01;
    };

    public animate = () => {
        this.clear();
        const canvasSize = this._store.getters.canvasSize;
        this._renderer.update([canvasSize.width, canvasSize.height], this._time);
    };
}
