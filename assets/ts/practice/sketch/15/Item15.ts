import Sketch from '../common/Sketch';
import WebGLContext from '../../../common/gl/Context';
import Data from '../../../common/gl/plane/pData';
import Renderer from '../../../common/gl/Renderer';
import Geometry from '../../../common/gl/Geometry';
import Mesh from '../../../common/gl/Mesh';
import Program from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';
import Default from './Shader';

export default class Item15 extends Sketch {

    private _ctx: WebGLContext;
    private _data: Data = new Data();
    private _shader: Default;
    private _gl: WebGLRenderingContext;
    private _default: Program;
    private _renderer: Renderer;
    private _time = 0;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(this._store.getters.ratio, this._canvas);
        this._gl = this._ctx.ctx;
        this._shader = new Default(this._gl);
        this.clear();
        this._default = new Program(this._gl, this._shader,
            ['position', 'color'],
            [3, 4],
            [
                'mvpMatrix',
                'resolution',
                'time'
            ],
            [
                GLConfig.UNIFORM_TYPE_MATRIX4,
                GLConfig.UNIFORM_TYPE_VECTOR2,
                GLConfig.UNIFORM_TYPE_FLOAT
            ]
        );
        this._renderer = new Renderer(this._store, this._ctx);

        const line: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(mesh);

        this._store.commit('Practice/SET_VS_TEXT', this._shader.vertexString);
        this._store.commit('Practice/SET_FS_TEXT', this._shader.fragmentString);

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
        const canvasSize = this._store.getters['Common/canvasSize'];
        this._renderer.update(
            [canvasSize.width, canvasSize.height],
            this._time
        );
    };
}
