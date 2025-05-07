import { showError } from '../Methods';

export default class WebGLContext {
    private _ctx!: WebGLRenderingContext;

    constructor(private _canvas: HTMLCanvasElement) {
        this.init();
    }

    private init = (): void => {
        this._ctx = this._canvas.getContext('webgl2') as WebGLRenderingContext;

        if (!this._ctx) {
            showError('Browser dose not support WebGL2.');
        }
    };

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get ctx(): WebGLRenderingContext {
        return this._ctx;
    }
}
