import { GLUtils } from '../Utils';
import IData from '../datatype/IData';

export default class Geometry {
    private _vbo: WebGLBuffer[] = [];
    private _ibo!: WebGLBuffer;

    private _VERTEX: number[];
    private _INDEX: number[];
    private _COLOR: number[];
    private _NORMAL: number[];
    private _UV: number[];

    constructor(private _gl: WebGLRenderingContext, _data: IData) {
        this._VERTEX = _data.vertex();
        this._INDEX = _data.index();
        this._COLOR = _data.color();
        this._NORMAL = _data.normal();
        this._UV = _data.uv();
    }

    public init = (...data): Geometry => {
        let index = 0;
        if (this._VERTEX.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._VERTEX) as WebGLBuffer;
            index++;
        }

        if (this._COLOR.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._COLOR) as WebGLBuffer;
            index++;
        }

        if (this._NORMAL.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._NORMAL) as WebGLBuffer;
            index++;
        }

        if (this._UV.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._UV) as WebGLBuffer;
            index++;
        }

        for (let i = 0, len = data.length; i < len; i++) {
            this._vbo[index] = GLUtils.createVBO(this._gl, data[i]) as WebGLBuffer;
            index++;
        }

        if (this._INDEX) {
            this._ibo = GLUtils.createIBO(this._gl, this._INDEX) as WebGLBuffer;
        }

        return this;
    };

    get ibo(): WebGLBuffer {
        return this._ibo;
    }

    get vbo(): WebGLBuffer[] {
        return this._vbo;
    }

    get NORMAL(): number[] {
        return this._NORMAL;
    }

    set NORMAL(value: number[]) {
        this._NORMAL = value;
    }

    get COLOR(): number[] {
        return this._COLOR;
    }

    set COLOR(value: number[]) {
        this._COLOR = value;
    }

    get INDEX(): number[] {
        return this._INDEX;
    }

    set INDEX(value: number[]) {
        this._INDEX = value;
    }

    get VERTEX(): number[] {
        return this._VERTEX;
    }

    set VERTEX(value: number[]) {
        this._VERTEX = value;
    }
}
