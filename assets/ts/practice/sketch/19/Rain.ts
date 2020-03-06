import * as THREE from 'three';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class Rain {
    private _rain: THREE.Group;
    private _mesh: THREE.Mesh[] = [];
    private _material: THREE.MeshBasicMaterial;
    private _texture: THREE.Texture;
    private _ready: boolean = false;
    private _interval: boolean = false;
    private _slow: boolean = false;
    private _remove: boolean = false;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load('/assets/img/line.png');
    }

    public generate() {
        this._rain = new THREE.Group();
        this._material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.3, 0.6, 0.7),
            blending: THREE.NoBlending,
            transparent: true,
            map: this._texture
        });

        for (let i = 0; i < 1000; i++) {
            const geometry = new THREE.BoxGeometry(0.1, rand(10, 20), 0.1, 1, 1, 1);
            const mesh = new THREE.Mesh(geometry, this._material);

            mesh.position.set(
                rand(-240, 160),
                rand(500, 1000),
                rand(-100, 100)
            );

            // @ts-ignore
            mesh.velocity = 0;
            // @ts-ignore
            mesh.accel = 0.02 * Math.random();

            this._mesh.push(mesh);
            this._rain.add(mesh);
        }

        this._stage.add(this._rain);
        this._rain.visible = false;
    }

    public start = () => {
        this._rain.visible = true;
        this._ready = true;

        setTimeout(() => {
            this._remove = true;
        }, 15000);
    };

    public update = (average: number) => {
        if (average > 120 && !this._slow && !this._interval) {
            this._slow = true;

            setTimeout(() => {
                this._slow = false;
                this._interval = true;

                setTimeout(() => {
                    this._interval = false;
                }, 3000);
            }, 2000);
        }
        this._mesh.forEach((mesh) => {
            if (!this._slow) {
                mesh.scale.y = 1.0;
                // @ts-ignore
                mesh.velocity += mesh.accel;
                // @ts-ignore
                mesh.position.y -= mesh.velocity;
            } else {
                mesh.position.y -= 0.2;
                mesh.scale.y = 0.1;
            }

            if (mesh.position.y < -500 && !this._remove) {
                mesh.position.y = 500;
                // @ts-ignore
                mesh.velocity = 0;
            }
        });
    };

    public remove = () => {
        this._stage.remove(this._rain);
    };

    get ready(): boolean {
        return this._ready;
    }
}
