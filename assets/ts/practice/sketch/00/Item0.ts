import Sketch from '../common/Sketch';
import Default from './Shader';
import WebGLContext from '../../../common/gl/Context';
import Data from './Data';
import Renderer from '../../../common/gl/Renderer';
import Geometry from '../../../common/gl/Geometry';
import Mesh from '../../../common/gl/Mesh';
import Program from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';

export default class Item0 extends Sketch {
    private _data: Data = new Data();
    private _ctx!: WebGLContext;
    private _gl!: WebGLRenderingContext;
    private _shader!: Default;
    private _default!: Program;
    private _renderer!: Renderer;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(1, this._canvas);
        this._ctx.ctx.lineWidth(10);
        this._gl = this._ctx.ctx;
        this.clear();
        this._shader = new Default(this._gl);
        this._default = new Program(this._gl, this._shader, ['position', 'color'], [3, 4], ['mvpMatrix'], [GLConfig.UNIFORM_TYPE_MATRIX4]);
        this._renderer = new Renderer(this._store, this._ctx);

        const line: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_LINE);
        this._renderer.add(mesh);

        this._store.commit('Practice/SET_VS_TEXT', this._shader.vertexString);
        this._store.commit('Practice/SET_FS_TEXT', this._shader.fragmentString);

        this.play();
    };

    public clear = (): void => {
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

    public update = (): void => {
        this.animate();
    };

    public animate = (): void => {
        this._renderer.update();
    };
}
