import {Methods} from './Utils';
import {IData} from '../sketch/common/IData';

export class Torus implements IData {

    _vertex: number[] = [];
    _normal: number[] = [];
    _color: number[] = [];
    _uv: number[] = [];
    _index: number[] = [];

    constructor (_row: number, _col: number, _iRad: number, _oRad: number, _color: number[] = []) {
        for (let i = 0; i <= _row; i++) {
            const r = Math.PI * 2 / _row * i;
            const rr = Math.cos(r);
            const ry = Math.sin(r);

            for (let j = 0; j <= _col; j++) {
                const tr = Math.PI * 2 / _col * j;
                const tx = (rr * _iRad + _oRad) * Math.cos(tr);
                const ty = ry * _iRad;
                const tz = (rr * _iRad + _oRad) * Math.sin(tr);

                this._vertex.push(tx, ty, tz);

                if (_color.length === 0) {
                    _color = Methods.hsv2RGB(360 / _col * j, 1, 1, 1);
                }

                this._color.push(_color[0], _color[1], _color[2], _color[3]);
            }
        }

        for (let i = 0; i < _row; i++) {
            for (let j = 0; j < _col; j++) {
                const r = (_col + 1) * i + j;
                this._index.push(r, r + _col + 1, r + 1);
                this._index.push(r + _col + 1, r + _col + 2, r + 1);
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
