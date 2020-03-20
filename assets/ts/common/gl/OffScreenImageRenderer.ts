import {GLUtils, MatrixUtils} from '../Utils';
import WebGLContext from './Context';
import Mesh from './Mesh';
import AppConfig from 'assets/ts/practice/Config';

export default class OffScreenImageRenderer {

    public static ON_READY_EVENT = 'onReadyEvent';

    private _gl: WebGLRenderingContext;

    private _target: Mesh[] = [];
    private _texture: WebGLTexture;
    private _width: number;
    private _height: number;

    private vMatrix: Float32Array;
    private pMatrix: Float32Array;
    private qMatrix: Float32Array;
    private vpMatrix: Float32Array;
    private mvpMatrix: Float32Array;

    private _image: HTMLImageElement;
    private _fBuffer: {frameBuffer: WebGLFramebuffer, depthBuffer: WebGLRenderbuffer, texture: WebGLTexture};

    private _unWatchStateChangeEvent;

    constructor(private _store: any, private _ctx: WebGLContext) {
        this._gl = _ctx.ctx;

        this._image = new Image();
        this._image.addEventListener('load', this.onCompleteLoadImage, {
            once: true
        });

        this._unWatchStateChangeEvent = this._store.watch(AppConfig.ON_CAMERA_STATE_CHANGED, this.initializeMatrix);
    }

    public load = (_src) => {
        this._image.src = _src;
    };


    private onCompleteLoadImage = (e: HTMLElementEventMap['load']) => {
        const gl = this._gl;

        this._width = this._image.width;
        this._height = this._image.height;
        this._texture = this._gl.createTexture() as WebGLTexture;

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);

        this._fBuffer = GLUtils.createFrameBuffer(gl, this._width, this._height, null);

        this.initializeMatrix();
    };

    /**
     * 描画対象を追加する
     * @param {Mesh} _model
     */
    public add = (_model: Mesh) => {
        this._target.push(_model);
        _model.texture = this._texture;
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
        // @ts-ignore
        this._image = null;
        // @ts-ignore
        this._texture = null;
        // @ts-ignore
        this._fBuffer = null;

        if (this._unWatchStateChangeEvent) {
            this._unWatchStateChangeEvent();
        }
    };

    public render = (...values: any[]) => {
        const gl = this._gl;

        // フレームバッファをバインド
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fBuffer.frameBuffer);

        // フレームバッファを初期化
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this._target[0].useProgram();

        // ビデオのテクスチャを更新する
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);

        // フレームバッファのVBOをセット
        this.mvpMatrix = MatrixUtils.initialize(MatrixUtils.create());
        for (const target of this._target) {
            MatrixUtils.multiply(this.vpMatrix, target.mMatrix, this.mvpMatrix);
            target.ready([this.mvpMatrix].concat(values));
            target.draw();
        }

        // フレームバッファのバインドを解除
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    private initializeMatrix = () => {
        this.vMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.pMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.qMatrix = MatrixUtils.initialize(MatrixUtils.create());
        this.vpMatrix = MatrixUtils.initialize(MatrixUtils.create());

        // ビュー座標変換行列
        // MatrixUtils.lookAt(this._model.camPosition, new Vector(0.0, 0.0, 0.0), new Vector(0, 1, 0), this.vMatrix);
        MatrixUtils.perspective(20, this._width / this._height, 0.1, 100, this.pMatrix);
        MatrixUtils.multiply(this.pMatrix, this.vMatrix, this.vpMatrix);
    };

    get fBuffer(): { frameBuffer: WebGLFramebuffer; depthBuffer: WebGLRenderbuffer; texture: WebGLTexture } {
        return this._fBuffer;
    }

}
