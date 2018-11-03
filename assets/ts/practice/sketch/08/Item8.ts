import { Sketch } from '../common/Sketch';
import { Default } from './Shader';
import { WebGLContext } from '../../module/Context';
import { Renderer } from '../../module/Renderer';
import { Geometry } from '../../module/Geometry';
import { Mesh } from '../../module/Mesh';
import { Program } from '../../module/Program';
import { GLConfig } from '../../Config';
import { GLUtils } from '../../utils/Utils';
import {Plane} from '../../utils/Plane';

export class Item8 extends Sketch {

    private _data: Plane = new Plane();
    private _ctx: WebGLContext;
    private _gl: WebGLRenderingContext;
    private _shader: Default;
    private _default: Program;
    private _renderer: Renderer;
    private _time = 0;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        this._ctx = new WebGLContext(1, this._canvas);
        this._gl = this._ctx.ctx;
        this.clear();
        this._shader = new Default(this._gl);
        this._default = new Program(this._gl, this._shader,
            ['position', 'color', 'normal', 'uv'],
            [3, 4, 3, 2],
            ['mvpMatrix', 'resolution', 'time', 'tex'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT, GLConfig.UNIFORM_TYPE_INT]
        );
        this._renderer = new Renderer(this._store, this._ctx);

        const plane: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, plane, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(mesh);

        this._store.commit('SET_VS_TEXT', this._shader.vertexString);
        this._store.commit('SET_FS_TEXT', this._shader.fragmentString);

        GLUtils.createTexture('~/assets/img/practice/lena.png', this._gl, this._gl.UNSIGNED_BYTE).then(tex => {
            mesh.texture = tex;
            this.play();
        }, err => {
            console.log(err);
        });
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
        this._renderer.update([canvasSize.width, canvasSize.height], this._time, 0);
    };
}
