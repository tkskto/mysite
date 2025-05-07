import {showError} from '../Methods';
import {Vector} from './Vector';
import {create} from '~/assets/ts/common/MatrixUtils';

/**
 * ( This class has been influenced by https://wgld.org )
 */
export default class Quaternion {
    private _vector: Vector;
    private _radian: number;

    constructor(_vec: Vector = new Vector(), _rad = 0) {
        this._vector = _vec;
        this._radian = _rad;
    }

    get radian(): number {
        return this._radian;
    }

    set radian(value: number) {
        this._radian = value;
    }

    get vector(): Vector {
        return this._vector;
    }

    set vector(value: Vector) {
        this._vector = value;
    }

    get length(): number {
        const x: number = this._vector.x;
        const y: number = this._vector.y;
        const z: number = this._vector.z;
        return Math.sqrt(x * x + y * y + z * z + this._radian * this._radian);
    }

    public initialize = (): Quaternion => {
        this._vector.initialize();
        this._radian = 1;
        return this;
    };

    public clone = (): Quaternion => {
        return new Quaternion(this._vector, this.radian);
    };

    public normalize = (): Quaternion => {
        let len = this.length;
        if (!len) {
            this._vector.initialize();
            this._radian = 0;
        } else {
            len = 1 / len;
            this._vector.x *= len;
            this._vector.y *= len;
            this._vector.z *= len;
        }
        return this;
    };

    public inverse = (): Quaternion => {
        this._vector.x *= -1;
        this._vector.y *= -1;
        this._vector.z *= -1;
        return this;
    };

    /**
     * クォータニオン同士の掛け算
     * @param {Quaternion} _q
     * @returns {Quaternion}
     */
    public multiply = (_q: Quaternion): Quaternion => {
        const dest: Quaternion = new Quaternion();
        const x1 = this._vector.x, y1 = this._vector.y, z1 = this._vector.z, r1 = this._radian;
        const x2 = _q._vector.x, y2 = _q._vector.y, z2 = _q._vector.z, r2 = _q._radian;

        dest._vector.x = x1 * r2 + r1 * x2 + y1 * z2 - z1 * y2;
        dest._vector.y = y1 * r2 + r1 * y2 + z1 * x2 - x1 * z2;
        dest._vector.z = z1 * r2 + r1 * z2 + x1 * y2 - y1 * x2;
        dest._radian = r1 * r2 - x1 * x2 - y1 * y2 - z1 * z2;
        return dest;
    };

    /**
     * クォータニオンに回転を与える
     * @param angle 回転角度
     * @param axis 回転軸
     * @returns {Quaternion}
     */
    public rotate = (angle: number, axis: Vector|number[]): Quaternion | null => {
        let sq: number = axis.length;

        if (!sq) {
            showError('回転軸がおかしいです。');
            return null;
        }

        let x = 0;
        let y = 0;
        let z = 0;

        if (axis instanceof Vector) {
            axis.normalize();
            x = axis.x;
            y = axis.y;
            z = axis.z;
        } else if (axis instanceof Array) {
            const len = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
            if (!len) {return null; }

            x = axis[0];
            y = axis[1];
            z = axis[2];

            if (sq !== 1) {
                sq = 1 / sq;
                x *= sq;
                y *= sq;
                z *= sq;
            }

        } else {
            showError('axis is unknown types.');
        }

        const s = Math.sin(angle * 0.5);

        this._vector.x = x * s;
        this._vector.y = y * s;
        this._vector.z = z * s;
        this._radian = Math.cos(angle * 0.5);
        return this;
    };

    /**
     * 回転軸と（回転が適用された）クォータニオンから新しい座標を求める
     * @param {Vector} _axis
     * @param {Quaternion} _qt
     * @param {Vector} _dest
     * @returns {Vector}
     */
    public toVector = (_axis: Vector, _qt: Quaternion, _dest: Vector = new Vector()): Vector => {
        const qp = new Quaternion();
        let qr = new Quaternion();

        qr = _qt.clone().inverse();

        qp.vector.x = _axis.x;
        qp.vector.y = _axis.y;
        qp.vector.z = _axis.z;

        const qq = qr.multiply(qp);
        qr = qq.multiply(_qt);

        _dest = qr.vector;

        return _dest;
    };

    /**
     * クォータニオンから回転行列を生成
     * @param {Float32Array} _dest
     * @returns {Float32Array}
     */
    public toMatrix = (_dest: Float32Array = create()): Float32Array => {
        const x = this.vector.x;
        const y = this.vector.y;
        const z = this.vector.z;
        const w = this.radian;

        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;

        _dest[0]  = 1 - (yy + zz);
        _dest[1]  = xy - wz;
        _dest[2]  = xz + wy;
        _dest[3]  = 0;
        _dest[4]  = xy + wz;
        _dest[5]  = 1 - (xx + zz);
        _dest[6]  = yz - wx;
        _dest[7]  = 0;
        _dest[8]  = xz - wy;
        _dest[9]  = yz + wx;
        _dest[10] = 1 - (xx + yy);
        _dest[11] = 0;
        _dest[12] = 0;
        _dest[13] = 0;
        _dest[14] = 0;
        _dest[15] = 1;

        return _dest;
    }
}
