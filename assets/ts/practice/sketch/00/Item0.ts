import {Sketch} from '../common/Sketch';
import Default from './Shader';
import WebGLContext from '../../../common/gl/Context';
import Data from './Data';
import Renderer from '../../../common/gl/Renderer';
import Geometry from '../../../common/gl/Geometry';
import Mesh from '../../../common/gl/Mesh';
import Program from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';
import {usePracticeShader} from '~/composables/usePracticeShader';

const {updateVertexShader, updateFragmentShader} = usePracticeShader();

export default class Item0 extends Sketch {
    private _data: Data = new Data();
    private _ctx!: WebGLContext;
    private _gl!: WebGLRenderingContext;
    private _default!: Program;
    private _renderer!: Renderer;

    constructor(private _canvas: HTMLCanvasElement, _id: string) {
        super(_id);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(this._canvas);
        this._ctx.ctx.lineWidth(10);
        this._gl = this._ctx.ctx;
        this.clear();
        const shader = new Default(this._gl);
        this._default = new Program(this._gl, shader, ['position', 'color'], [3, 4], ['mvpMatrix'], [GLConfig.UNIFORM_TYPE_MATRIX4]);
        this._renderer = new Renderer(this._ctx);

        const line: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_LINE);
        this._renderer.add(mesh);

        updateVertexShader(shader.vertexString);
        updateFragmentShader(shader.fragmentString);

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
