import {Mesh} from 'three'

export default class AnimateMesh {
    constructor(private _mesh: Mesh, private _velocity: number, private _accel: number) {}

    public animate(): void {
        if (this._velocity < 1) {
            this._velocity += this._accel;
        }

        this._mesh.position.y += this._velocity;
    }

    public reset(): void {
        this._velocity = 0;
    }

    get mesh(): Mesh {
        return this._mesh;
    }
}
