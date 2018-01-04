export class A {

    private _outerGeometry;
    private _innerGeometry;
    private _outerMesh;
    private _innerMesh;

    private _outer;
    private _inner;

    constructor(_material, _exo) {

        this._outer = new THREE.Shape();

        let vertex1 = [
            0.0, -4.0,
            1.25,  0.0,
            2.75,  0.0,
            4.0, -4.0,
            3.0, -4.0,
            2.25, -1.0,
            1.75, -1.0,
            1.0, -4.0
        ];

        this._outer.moveTo(vertex1[0], vertex1[1]);

        for (let i = 2; i < vertex1.length; i+=2) {
            this._outer.lineTo(vertex1[i], vertex1[i + 1]);
        }

        this._inner = new THREE.Shape();

        let vertex2 = [
            1.25, -3.0,
            1.5, -2.0,
            2.5, -2.0,
            2.75, -3.0
        ];

        this._inner.moveTo(vertex2[0], vertex2[1]);

        for (let i = 2; i < vertex2.length; i+=2) {
            this._inner.lineTo(vertex2[i], vertex2[i + 1]);
        }

        this._innerGeometry = new THREE.ExtrudeGeometry(this._inner, _exo);
        this._outerGeometry = new THREE.ExtrudeGeometry(this._outer, _exo);

        this._innerMesh = new THREE.Mesh(this._innerGeometry, _material);
        this._outerMesh = new THREE.Mesh(this._outerGeometry, _material);
    }

    get inner() {
        return this._innerMesh;
    }

    get outer() {
        return this._outerMesh;
    }
}
