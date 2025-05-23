import type {IData} from '../datatype/IData';

export default class HazyBackgroundData implements IData {
    _vertex: number[] = [
        -1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0
    ];

    _color: number[] = [];

    _index: number[] = [
        0, 1, 2,
        2, 1, 3
    ];

    _normal: number[] = [];
    _uv: number[] = [];

    vertex(): number[] {
        return this._vertex;
    }

    color(): number[] {
        return this._color;
    }

    index(): number[] {
        return this._index;
    }

    normal(): number[] {
        return this._normal;
    }

    uv(): number[] {
        return this._uv;
    }
}
