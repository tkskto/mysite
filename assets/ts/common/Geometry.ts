import { GLUtils } from '../Utils';
import {IData} from './IData';
import {Plane} from './Plane';

export class Geometry {
    private _vbo: WebGLBuffer[] | null[] = [];
    private _ibo: WebGLBuffer|null;

    private _VERTEX: number[];
    private _INDEX: number[];
    private _COLOR: number[];
    private _NORMAL: number[];
    private _UV: number[];

    constructor(private _gl: WebGLRenderingContext, _data: IData = new Plane()) {
        this._VERTEX = _data.vertex;
        this._INDEX = _data.index;
        this._COLOR = _data.color;
        this._NORMAL = _data.normal;
        this._UV = _data.uv;
    }

    public init = (...data): Geometry => {
        let index = 0;
        if (this._VERTEX.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._VERTEX);
            index++;
        }

        if (this._COLOR.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._COLOR);
            index++;
        }

        if (this._NORMAL.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._NORMAL);
            index++;
        }

        if (this._UV.length > 0) {
            this._vbo[index] = GLUtils.createVBO(this._gl, this._UV);
            index++;
        }

        for (let i = 0, len = data.length; i < len; i++) {
            this._vbo[index] = GLUtils.createVBO(this._gl, data[i]);
            index++;
        }

        if (this._INDEX) {
            this._ibo = GLUtils.createIBO(this._gl, this._INDEX);
        }

        return this;
    };

    get ibo(): WebGLBuffer | null {
        return this._ibo;
    }

    get vbo(): WebGLBuffer[] | null[] {
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
