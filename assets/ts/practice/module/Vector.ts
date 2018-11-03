export class Vector {

    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    set x(val: number) {
        this._x = val;
    }

    get x(): number {
        return this._x;
    }

    set y(val: number) {
        this._y = val;
    }

    get y(): number {
        return this._y;
    }

    set z(val: number) {
        this._z = val;
    }

    get z(): number {
        return this._z;
    }

    get pos(): number[] {
        return [this._x, this._y, this._z];
    }

    get length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    }

    /**
     * 座標を配列にして返す
     */
    public arr = (): number[] => {
        return [this._x, this._y, this._z];
    };

    public initialize = (): Vector => {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        return this;
    };

    /**
     * ベクトルを正規化します
     * @returns {data.Vector}
     */
    public normalize = (): Vector => {
        let len = this.length;
        if (!len) {
            this._x = this._y = this._z = 0;
        } else {
            len = 1 / len;
            this._x *= len;
            this._y *= len;
            this._z *= len;
        }
        return this;
    };

    /**
     * ベクトル同士の足し算をします
     * @param {data.Vector} _vec
     * @returns {data.Vector}
     */
    public add = (_vec: Vector): Vector => {
        const dist: Vector = new Vector();
        dist.x = this._x + _vec.x;
        dist.y = this._y + _vec.y;
        dist.z = this._z + _vec.z;
        return dist;
    };

    /**
     * ベクトル同士の引き算をします
     * @param {data.Vector} _vec
     * @returns {data.Vector}
     */
    public subtract = (_vec: Vector): Vector => {
        const dist: Vector = new Vector();
        dist.x = this._x - _vec.x;
        dist.y = this._y - _vec.y;
        dist.z = this._z - _vec.z;
        return dist;
    };

    /**
     * 内積をとります。
     * @param {data.Vector} _vec
     * @returns {number}
     */
    public dot = (_vec: Vector): number => {
        return this._x * _vec.x + this._y * _vec.y + this._z * _vec.z;
    };

    /**
     * 外積をとります。
     * @param {data.Vector} _vec
     * @returns {data.Vector}
     */
    public cross = (_vec: Vector): Vector => {
        const dist: Vector = new Vector();
        dist.x = this._y * _vec.z - this._z * _vec.y;
        dist.y = this._z * _vec.x - this._x * _vec.z;
        dist.z = this._x * _vec.y - this._y * _vec.x;
        return dist;
    };

    public rot = (_vec: Vector): number => {
        const dot = this.dot(_vec);
        return Math.acos(dot) * 180 / Math.PI;
    }
}
