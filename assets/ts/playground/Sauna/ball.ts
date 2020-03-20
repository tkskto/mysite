import * as THREE from 'three';
import * as Cannon from 'cannon';

export default class Ball {
    private _body: Cannon.Body;
    private _mesh: THREE.Mesh;

    constructor(geometry: THREE.Geometry, material: THREE.Material) {
        this._body = new Cannon.Body({
            mass: 5, // kg // massは重さ。
            position: new Cannon.Vec3(0, 100, 0), // m
            shape: new Cannon.Sphere(0.5)  // shapeはthree.jsのものと同じ
        });

        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.copy(this._body.position);
    }

    public update () {
        this._mesh.position.copy(this._body.position);
        this._mesh.quaternion.copy(this._body.quaternion);
    }

    get mesh(): THREE.Mesh {
        return this._mesh;
    }

    get body(): Cannon.Body {
        return this._body;
    }
}
