import {IData} from './IData';

export class Plane implements IData {

    _vertex: number[] = [];
    _normal: number[] = [];
    _color: number[] = [];
    _uv: number[] = [];
    _index: number[] = [];

    constructor () {
        this._vertex = [
            -1.0,  1.0,  0.0,
            1.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
            1.0, -1.0,  0.0
        ];

        this._color = [
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];

        this._normal = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];

        this._uv = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];

        this._index = [
            0, 1, 2,
            3, 2, 1
        ];
    }

    get vertex(): number[] {
        return this._vertex;
    }
    get normal(): number[] {
        return this._normal;
    }
    get color(): number[] {
        return this._color;
    }
    get uv(): number[] {
        return this._uv;
    }
    get index(): number[] {
        return this._index;
    }
}
