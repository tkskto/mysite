import * as THREE from 'three';

export class H extends THREE.Shape {
    constructor() {
        super();

        let vertex = [
            0.0,  0.0,
            1.0,  0.0,
            1.0, -1.5,
            2.0, -1.5,
            2.0,  0.0,
            3.0,  0.0,
            3.0, -4.0,
            2.0, -4.0,
            2.0, -2.5,
            1.0, -2.5,
            1.0, -4.0,
            0.0, -4.0,
        ];

        this.moveTo(vertex[0], vertex[1]);

        for (let i = 2; i < vertex.length; i+=2) {
            this.lineTo(vertex[i], vertex[i + 1]);
        }
    }
}