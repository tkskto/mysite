import {Methods} from '../../common/Utils';
import type {IData} from '../../common/datatype/IData';

export default class Sphere implements IData {

    _vertex: number[] = [];
    _normal: number[] = [];
    _color: number[] = [];
    _uv: number[] = [];
    _index: number[] = [];

    constructor (_row: number, _col: number, rad: number, _color: number[] = []) {
        for (let i = 0; i <= _row; i++) {
            const r = Math.PI / _row * i; // 半径
            const ry = Math.cos(r);
            const rr = Math.sin(r);

            for (let j = 0; j <= _col; j++) {
                const tr = Math.PI * 2 / _col * j;
                const tx = rr * rad * Math.cos(tr);
                const ty = ry * rad;
                const tz = rr * rad * Math.sin(tr);
                const rx = rr * Math.cos(tr);
                const rz = rr * Math.sin(tr);
                let color: number[] = _color.concat();

                if (color.length === 0) {
                    color = Methods.hsv2RGB(_row * i, 100, 100, 50);
                }

                this._vertex.push(tx, ty, tz);
                this._normal.push(rx, ry, rz);
                this._color.push(color[0], color[1], color[2], color[3]);
                this._uv.push(1 - 1 / _col * j, 1 / _row * i);
            }
        }

        for (let i = 0; i < _row; i++) {
            for (let j = 0; j < _col; j++) {
                const r = (_col + 1) * i + j;
                this._index.push(r, r + 1, r + _col + 2);
                this._index.push(r, r + _col + 2, r + _col + 1);
            }
        }
    }

    vertex(): number[] {
        return this._vertex;
    }
    normal(): number[] {
        return this._normal;
    }
    color(): number[] {
        return this._color;
    }
    uv(): number[] {
        return this._uv;
    }
    index(): number[] {
        return this._index;
    }
}
