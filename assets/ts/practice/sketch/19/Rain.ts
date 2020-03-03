import * as THREE from 'three';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class Rain {
    private _rain: THREE.Group;
    private _geometry: THREE.Geometry;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {}

    public generate() {
        this._rain = new THREE.Group();

        this._geometry = new THREE.Geometry();

        for (let i = 0; i < 15000; i++) {
            const vertex = new THREE.Vector3(
                rand(-200, 200),
                rand(-250, 250),
                rand(-200, 200)
            );

            // @ts-ignore
            vertex.velocity = 0;
            this._geometry.vertices.push(vertex);
        }

        const material = new THREE.PointsMaterial({
            color: 0x333333,
            size: 0.1,
            transparent: true,
        });

        const rain = new THREE.Points(this._geometry, material);
        this._rain.add(rain);

        this._stage.add(this._rain);
        this._ready = true;
    }

    public update = () => {
        if (this._rain) {
            this._geometry.vertices.forEach((p) => {
                // @ts-ignore
                p.velocity += 0.1 + Math.random() * 0.1;
                // @ts-ignore
                p.y += p.velocity;

                if (p.y > 500) {
                    p.y = -500;
                    // @ts-ignore
                    p.velocity = 0;
                }
            });
            this._geometry.verticesNeedUpdate = true;
        }
    };

    public remove = () => {
        this._stage.remove(this._rain);
    };

    get ready(): boolean {
        return this._ready;
    }
}
