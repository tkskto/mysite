import { MatrixUtils } from '../Utils';
import { WebGLContext } from './Context';
import { Vector } from './Vector';
import { Mesh } from './Mesh';

export class Renderer {

    private _gl: WebGLRenderingContext;
    private _target: Mesh[] = [];

    private _cWidth: number;
    private _cHeight: number;

    private vMatrix: Float32Array;
    private pMatrix: Float32Array;
    private qMatrix: Float32Array;
    private vpMatrix: Float32Array;
    private mvpMatrix: Float32Array;

    constructor(private _ctx: WebGLContext, _camPosition: Vector) {
        this._cWidth = _ctx.canvas.clientWidth;
        this._cHeight = _ctx.canvas.clientHeight;
        this._gl = _ctx.ctx;

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);

        this.initializeMatrix(_camPosition);
    }

    /**
     * 描画対象を追加する
     * @param {Mesh} _model
     */
    public add = (_model: Mesh) => {
        this._target.push(_model);
    };

    /**
     * 描画対象を削除する
     * @param {Mesh} _mesh 削除したいメッシュ
     */
    public remove = (_mesh: Mesh) => {
        for (let i = 0; i < this._target.length; i++) {
            if (this._target[i].id === _mesh.id) {
                this._target.slice(i, 1);
            }
        }
    };

    /**
     * すべてのリソースを削除する
     */
    public dispose = () => {
        this._target.length = 0;
    };

    public update = (...values: any[]) => {
        this.render(values);
    };

    private render = (...values: any[]) => {
        this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        for (const target of this._target) {
            MatrixUtils.multiply(this.vpMatrix, target.mMatrix, this.mvpMatrix);
            target.useProgram();
            target.ready([].concat(...values));
            target.draw();
        }
        this._gl.flush();
    };

    private initializeMatrix = (camPosition: Vector) => {
        this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());

        // ビュー座標変換行列
        MatrixUtils.lookAt(camPosition, new Vector(0.0, 0.0, 0.0), new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(90, this._ctx.canvas.width / this._ctx.canvas.height, 0.1, 1000, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);
    };

    public onResize = (camPosition: Vector) => {
        this.initializeMatrix(camPosition);
        this._cWidth = this._ctx.canvas.clientWidth;
        this._cHeight = this._ctx.canvas.clientHeight;
        this._gl.viewport(0, 0, this._cWidth, this._cHeight);
    }
}
