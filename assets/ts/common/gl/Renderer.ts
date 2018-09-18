import {Lib} from './Lib';
import {Program} from './Program';

export class Renderer {

    private _gl: WebGLRenderingContext;

    constructor(private _lib: Lib, private _prg: Program, private _index: number[]) {
        this._gl = _lib.gl;
    }

    public render = (time: number, size: {width: number, height: number}) => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

        // 1枚目のレンダリング
        this._prg.pushShader([time, [size.width, size.height]]);
        this._gl.drawElements(this._gl.TRIANGLES, this._index.length, this._gl.UNSIGNED_SHORT, 0);

        this._gl.flush();
    };
}
