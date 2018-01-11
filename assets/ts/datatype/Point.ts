export class Point {
    private _x:number;
    private _y:number;
    constructor(_x:number, _y:number) {
        this._x = _x;
        this._y = _y;
    }
    get x(): number {
        return this._x;
    }
    set x(value: number) {
        this._x = value;
    }
    get y(): number {
        return this._y;
    }
    set y(value: number) {
        this._y = value;
    }
    public subtract = (_x:number, _y:number):Point => {
        return new Point((_x - this._x)|0, (_y - this._y)|0);
    };
    public reset = () => {
        this._x = 0;
        this._y = 0;
    }
}
