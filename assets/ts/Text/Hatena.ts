import * as THREE from 'three';

export class Hatena {

    private _upperGeometry: THREE.ExtrudeGeometry;
    private _lowerGeometry: THREE.ExtrudeGeometry;
    private _upperMesh: THREE.Mesh;
    private _lowerMesh: THREE.Mesh;

    private _upper: THREE.Shape;
    private _lower: THREE.Shape;

    constructor(_material: THREE.Material, _exo: {}) {

        this._upper = new THREE.Shape();
        this._lower = new THREE.Shape();

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

        this._upperGeometry = new THREE.ExtrudeGeometry(this._upper, _exo);
        this._lowerGeometry = new THREE.ExtrudeGeometry(this._lower, _exo);

        this._upperMesh = new THREE.Mesh(this._upperGeometry, _material);
        this._lowerMesh = new THREE.Mesh(this._lowerGeometry, _material);
    }

    get upper(): THREE.Mesh {
        return this._upperMesh;
    }

    get lower(): THREE.Mesh {
        return this._lowerMesh;
    }
}
