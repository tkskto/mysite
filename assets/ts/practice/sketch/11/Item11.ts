import { Sketch } from '../common/Sketch';
import { Default } from './Shader';
import { WebGLContext } from '../../../common/gl/Context';
import { Renderer } from '../../../common/gl/Renderer';
import { Geometry } from '../../../common/gl/Geometry';
import { Mesh } from '../../../common/gl/Mesh';
import { Program } from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';
import {Plane} from '../../utils/Plane';
import {GLUtils} from '../../../common/Utils';

export class Item11 extends Sketch {

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
            ['mvpMatrix', 'resolution', 'time', 'tex1', 'tex2'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT, GLConfig.UNIFORM_TYPE_TEXTURE, GLConfig.UNIFORM_TYPE_TEXTURE]
        );
        this._renderer = new Renderer(this._store, this._ctx);

        const plane: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, plane, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(mesh);

        this._store.commit('SET_VS_TEXT', this._shader.vertexString);
        this._store.commit('SET_FS_TEXT', this._shader.fragmentString);

        GLUtils.createTexture(require('~/assets/img/practice/11_1.png'), this._gl, this._gl.UNSIGNED_BYTE).then(tex => {
            mesh.addTexture(tex);
            return GLUtils.createTexture(require('~/assets/img/practice/11_2.png'), this._gl, this._gl.UNSIGNED_BYTE);
        }).then(tex => {
            mesh.addTexture(tex);
            this.play();
        }).catch(err => {
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
        this._renderer.update([canvasSize.width, canvasSize.height], this._time, 0, 1);
    };
}
