import {Shape, Mesh, Vector3, CatmullRomCurve3, ExtrudeGeometry, Material} from 'three'
import {ExtrudeGeometryOptions} from 'three/src/geometries/ExtrudeGeometry';

export default class O {
    private _shape: Shape;
    private _geometry: ExtrudeGeometry;
    private _mesh: Mesh;

    constructor(rad: number, row: number, depth: number, _material: Material, _exo: ExtrudeGeometryOptions) {

        this._shape = new Shape();

        const PI2 = Math.PI * 2;

        this._shape.moveTo(0, 0);
        this._shape.lineTo(depth, 0);
        this._shape.lineTo(depth, rad - rad * 0.5);
        this._shape.lineTo(0, rad - rad * 0.5);

        const points: Vector3[] = [];

        // 外側の頂点
        for (let i = 0; i < row * 2; i++) {
            const r = PI2 / row * i;
            const rx = Math.cos(r) * rad;
            const ry = Math.sin(r) * rad;
            points.push(new Vector3(0.0, rx, ry));
        }

        const path: CatmullRomCurve3 = new CatmullRomCurve3(points);
        path['type'] = 'catmullrom';
        path['closed'] = true;

        const extrudeOptionWithPath = {..._exo};
        extrudeOptionWithPath['extrudePath'] = path;
        extrudeOptionWithPath['steps'] = 100;

        this._geometry = new ExtrudeGeometry(this._shape, extrudeOptionWithPath);

        this._mesh = new Mesh(this._geometry, _material);
    }

    get mesh(): Mesh {
        return this._mesh;
    }
}
