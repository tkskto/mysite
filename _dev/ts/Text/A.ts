import * as THREE from 'three';

export class A {

    private _outer:THREE.Shape;
    private _inner:THREE.Shape;

    constructor() {

        this._outer = new THREE.Shape();

        let vertex1 = [
            0.0, -4.0,
            1.25,  0.0,
            2.75,  0.0,
            4.0, -4.0,
            3.0, -4.0,
            2.75, -3.0,
            1.25, -3.0,
            1.0, -4.0
        ];

        this._outer.moveTo(vertex1[0], vertex1[1]);

        for (let i = 2; i < vertex1.length; i+=2) {
            this._outer.lineTo(vertex1[i], vertex1[i + 1]);
        }

        this._inner = new THREE.Shape();

        let vertex2 = [
            1.5, -2.0,
            1.75, -1.0,
            2.25, -1.0,
            2.5, -2.0
        ];

        this._inner.moveTo(vertex2[0], vertex2[1]);

        for (let i = 2; i < vertex2.length; i+=2) {
            this._inner.lineTo(vertex2[i], vertex2[i + 1]);
        }
    }

    get inner(): THREE.Shape {
        return this._inner;
    }
    get outer(): THREE.Shape {
        return this._outer;
    }
}