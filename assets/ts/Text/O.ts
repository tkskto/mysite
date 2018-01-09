import * as THREE from 'three';

export class O {

    private _shape: THREE.Shape;
    private _geometry: THREE.ExtrudeGeometry;
    private _mesh: THREE.Mesh;

    constructor(rad, row, depth, _material, _exo) {

        this._shape = new THREE.Shape();

        const PI2 = Math.PI * 2;

        this._shape.moveTo(0, 0);
        this._shape.lineTo(depth, 0);
        this._shape.lineTo(depth, rad - rad * 0.5);
        this._shape.lineTo(0, rad - rad * 0.5);

        const points: THREE.Vector3[] = [];

        // 外側の頂点
        for (let i = 0; i < row * 2; i++) {
            const r = PI2 / row * i;
            const rx = Math.cos(r) * rad;
            const ry = Math.sin(r) * rad;
            points.push(new THREE.Vector3(0.0, rx, ry));
        }

        const path: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3(points);
        path['type'] = 'catmullrom';
        path['closed'] = true;

        const extrudeOptionWithPath = {..._exo};
        extrudeOptionWithPath['extrudePath'] = path;
        extrudeOptionWithPath['steps'] = 100;

        this._geometry = new THREE.ExtrudeGeometry(this._shape, extrudeOptionWithPath);

        this._mesh = new THREE.Mesh(this._geometry, _material);
    }

    get mesh(): THREE.Mesh {
        return this._mesh;
    }
}