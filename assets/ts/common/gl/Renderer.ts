import { MatrixUtils } from '../Utils';
import WebGLContext from './Context';
import Vector from './Vector';
import Mesh from './Mesh';
import AppConfig from '../../practice/Config';

export default class Renderer {

    private _gl!: WebGLRenderingContext;
    private _target: Mesh[] = [];

    private _cWidth: number;
    private _cHeight: number;

    private vMatrix!: Float32Array;
    private pMatrix!: Float32Array;
    private qMatrix!: Float32Array;
    private vpMatrix!: Float32Array;
    private mvpMatrix!: Float32Array;

    private unWatchResizeEvent;
    private unWatchStateChangeEvent;

    constructor(private _store: any, private _ctx: WebGLContext) {
        this._cWidth = _ctx.canvas.clientWidth;
        this._cHeight = _ctx.canvas.clientHeight;
        this._gl = _ctx.ctx;

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);

        this.unWatchResizeEvent = _store.watch((state) => {
            return state.Common.screenSize;
        }, this.onResize);
        this.unWatchStateChangeEvent = _store.watch(AppConfig.ON_CAMERA_STATE_CHANGED, this.initializeMatrix);
        this.initializeMatrix();
    }

    /**
     * 描画対象を追加する
     * @param {Mesh} _model
     */
    public add = (_model: Mesh): void => {
        this._target.push(_model);
    };

    /**
     * 描画対象を削除する
     * @param {Mesh} _mesh 削除したいメッシュ
     */
    public remove = (_mesh: Mesh): void => {
        for (let i = 0; i < this._target.length; i++) {
            if (this._target[i].id === _mesh.id) {
                this._target.slice(i, 1);
            }
        }
    };

    /**
     * すべてのリソースを削除する
     */
    public dispose = (): void => {
        this._target.length = 0;

        if (this.unWatchResizeEvent) {
            this.unWatchResizeEvent();
        }

        if (this.unWatchStateChangeEvent) {
            this.unWatchStateChangeEvent();
        }
    };

    public update = (...values: any[]): void => {
        this.render(values);
    };

    private render = (...values: any[]): void => {
        this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        for (const target of this._target) {
            MatrixUtils.multiply(this.vpMatrix, target.mMatrix, this.mvpMatrix);
            const uniforms: any[] = [this.mvpMatrix];
            target.useProgram();
            if (target.castShadow) {
                uniforms.push(target.mMatrix, MatrixUtils.inverse(target.mMatrix));
            }
            target.ready(uniforms.concat(...values));
            target.draw();
        }
        this._gl.flush();
    };

    private initializeMatrix = (): void => {
        this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());

        const canvasSize = this._store.getters['Common/canvasSize'];
        const cameraPosition = this._store.getters['Practice/cameraPosition'];
        const aspectRatio = canvasSize.width > canvasSize.height ? canvasSize.width / canvasSize.height : canvasSize.height / canvasSize.width;

        // ビュー座標変換行列
        MatrixUtils.lookAt(cameraPosition, new Vector(0.0, 0.0, 0.0), new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(90, aspectRatio, 0.1, 1000, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);
    };

    private onResize = (): void => {
        const canvasSize = this._store.getters['Common/canvasSize'];
        this.initializeMatrix();
        this._cWidth = canvasSize.width;
        this._cHeight = canvasSize.height;
        this._gl.viewport(0, 0, this._cWidth, this._cHeight);
    }
}
