import {Shape, Mesh, Material, ExtrudeGeometry} from 'three'

export default class Hatena {
    private _upperGeometry: ExtrudeGeometry;
    private _lowerGeometry: ExtrudeGeometry;
    private _upperMesh: Mesh;
    private _lowerMesh: Mesh;

    private _upper: Shape;
    private _lower: Shape;

    constructor(_material: Material, _exo: {}) {

        this._upper = new Shape();
        this._lower = new Shape();

        this._upper.moveTo(0, -1.0);

        this._upper.bezierCurveTo(0, 1.0, 3.0, 1.0, 3.0, -1.0);
        this._upper.bezierCurveTo(3.0, -1.75, 3.0, -1.75, 2, -2.25);
        this._upper.lineTo(2, -3);
        this._upper.lineTo(1, -3);
        this._upper.lineTo(1, -1.75);
        this._upper.bezierCurveTo(2.0, -1.5, 2.0, -1.5, 2.0, -1.0);
        this._upper.bezierCurveTo(2.0, 0, 1.0, 0, 1.0, -1.0);
        this._upper.closePath();

        this._lower.moveTo(1, -3.25);
        this._lower.lineTo(2, -3.25);
        this._lower.lineTo(2, -3.75);
        this._lower.lineTo(1, -3.75);
        this._lower.closePath();

        this._upperGeometry = new ExtrudeGeometry(this._upper, _exo);
        this._lowerGeometry = new ExtrudeGeometry(this._lower, _exo);

        this._upperMesh = new Mesh(this._upperGeometry, _material);
        this._lowerMesh = new Mesh(this._lowerGeometry, _material);
    }

    get upper(): Mesh {
        return this._upperMesh;
    }

    get lower(): Mesh {
        return this._lowerMesh;
    }
}
