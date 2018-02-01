export class WebGLContext {
    private _ratio: number;
    private _canvas: HTMLCanvasElement;
    private _ctx: WebGLRenderingContext;

    private _extVAO: any;

    constructor(_canvas: HTMLCanvasElement) {
        this._ratio = window.devicePixelRatio;
        this._canvas = _canvas;

        this.init();
    }

    private init = () => {
        this._ctx = this._canvas.getContext('webgl2') as WebGLRenderingContext;

        // VAOを有効化
        // this._extVAO = this._ctx.getExtension('OES_vertex_array_object');
        // if (!this._extVAO) {
        //     alert('vertex array object not supported');
        //     return;
        // }
    };

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get ctx(): WebGLRenderingContext {
        return this._ctx;
    }
}
