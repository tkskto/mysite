import * as THREE from 'three';

export class W extends THREE.Shape {
    constructor() {
        super();

        let vertex = [
            0.0,   0.0,
            1.0,   0.0,
            2.0,  -3.0,
            3.0,   0.0,
            4.0,   0.0,
            5.0,  -3.0,
            6.0,   0.0,
            7.0,   0.0,
            6.0,  -4.0,
            4.5, -4.0,
            3.5,  -1.5,
            2.5, -4.0,
            1.0,  -4.0,
        ];

        this.moveTo(vertex[0], vertex[1]);

        for (let i = 2; i < vertex.length; i+=2) {
            this.lineTo(vertex[i], vertex[i + 1]);
        }
    }
}