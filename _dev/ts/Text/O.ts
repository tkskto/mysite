import * as THREE from 'three';

export class O extends THREE.Shape{

    private _path:THREE.CatmullRomCurve3;

    constructor(rad, row, depth) {
        super();

        let PI2 = Math.PI * 2;

        this.moveTo(0, 0);
        this.lineTo(depth, 0);
        this.lineTo(depth, rad - rad * 0.5);
        this.lineTo(0, rad - rad * 0.5);

        let points:THREE.Vector3[] = [];

        //外側の頂点
        for(let i = 0; i < row * 2; i++){
            let r = PI2 / row * i;
            let rx = Math.cos(r) * rad;
            let ry = Math.sin(r) * rad;
            points.push(new THREE.Vector3(0.0, rx, ry));
        }

        this._path = new THREE.CatmullRomCurve3(points);
        this._path['type'] = 'catmullrom';
        this._path['closed'] = true;
    }

    get path(): THREE.CatmullRomCurve3 {
        return this._path;
    }

}