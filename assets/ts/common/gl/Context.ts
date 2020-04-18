import { Methods } from '../Utils';

export default class WebGLContext {
    private _canvas: HTMLCanvasElement;
    private _ctx: WebGLRenderingContext;

    constructor(private _ratio: number, _canvas: HTMLCanvasElement) {
        this._canvas = _canvas;

        this.init();
    }

    private init = (): void => {
        this._ctx = this._canvas.getContext('webgl2') as WebGLRenderingContext;

        if (!this._ctx) {
            Methods.showError('Browser dose not support WebGL2.');
        }
    };

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get ctx(): WebGLRenderingContext {
        return this._ctx;
    }
}
