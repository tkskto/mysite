import {Shape, Mesh, Material, ExtrudeGeometry} from 'three'

export default class M {
    private _shape: Shape;
    private _geometry: ExtrudeGeometry;
    private _mesh: Mesh;

    constructor(_material: Material, _exo: {}) {

        this._shape = new Shape();

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
        this._geometry = new ExtrudeGeometry(this._shape, _exo);

        this._mesh = new Mesh(this._geometry, _material);
    }

    get mesh(): Mesh {
        return this._mesh;
    }
}
