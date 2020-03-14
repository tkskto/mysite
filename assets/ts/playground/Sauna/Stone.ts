import * as THREE from 'three';
import Cannon from 'cannon';
import Ball from './ball';

export default class Stone {
    private _balls: Ball[] = [];

    constructor(private _stage: THREE.Scene, private _world: Cannon.World) {}

    public generate = () => {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });

        for (let i = 0; i < 10; i++) {
            const ball = new Ball(geometry, material);

            this._world.addBody(ball.body); // worldにsphereBodyを追加
            this._stage.add(ball.mesh);
            this._balls.push(ball);
        }
    };

    public update = () => {
        this._balls.forEach(ball => {
            ball.update();
        });
    }
}
