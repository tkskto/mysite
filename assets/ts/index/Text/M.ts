import * as THREE from 'three';

export class M {

    private _shape: THREE.Shape;
    private _geometry: THREE.ExtrudeGeometry;
    private _mesh: THREE.Mesh;

    constructor(_material: THREE.Material, _exo: {}) {

        this._shape = new THREE.Shape();

        const vertex = [
            0.0, -4.0,
            1.0,  0.0,
            2.5,  0.0,
            3.5, -3.0,
            4.5,  0.0,
            6.0,  0.0,
            7.0, -4.0,
            6.0, -4.0,
            5.25, -1,
            4.0, -4.0,
            3.0, -4.0,
            1.75, -1,
            1.0, -4.0
        ];

        this._shape.moveTo(vertex[0], vertex[1]);

        for (let i = 2; i < vertex.length; i += 2) {
            this._shape.lineTo(vertex[i], vertex[i + 1]);
        }
        this._geometry = new THREE.ExtrudeGeometry(this._shape, _exo);

        this._mesh = new THREE.Mesh(this._geometry, _material);
    }

    get mesh(): THREE.Mesh {
        return this._mesh;
    }
}
