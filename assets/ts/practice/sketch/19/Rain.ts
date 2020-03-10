import * as THREE from 'three';
import TweenMax from 'gsap';

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
    private _timer: number | null = null;
    private _count = 0;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load('/assets/img/line.png');
    }

    public generate() {
        this._rain = new THREE.Group();
        this._material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.3, 0.6, 0.7),
            blending: THREE.CustomBlending,
            transparent: true,
            map: this._texture
        });

        for (let i = 0; i < 500; i++) {
            const geometry = new THREE.BoxGeometry(0.1, rand(20, 40), 1, 1, 1, 1);
            const mesh = new THREE.Mesh(geometry, this._material);

            mesh.position.set(
                rand(-240, 160),
                rand(350, 450),
                rand(400, 700)
            );

            // @ts-ignore
            mesh.velocity = 0;
            // @ts-ignore
            mesh.accel = 0.05 * Math.random();

            this._mesh.push(mesh);
            this._rain.add(mesh);
        }

        this._stage.add(this._rain);
        this._rain.visible = false;
    }

    public start = () => {
        this._rain.visible = true;
        this._ready = true;
        this._interval = true;

        setTimeout(() => {
            this._remove = true;
        }, 10000);

        setTimeout(() => {
            this._interval = false;
        }, 6000);

        // @ts-ignore
        TweenMax.to(this._material, 25, {
            opacity: 0,
        });
    };

    public update = (average: number) => {
        if (average > 120 && !this._slow && !this._interval && this._timer === null && this._count < 3) {
            this._slow = true;
            this._count++;
            this._interval = true;

            // @ts-ignore
            this._timer = setTimeout(() => {
                this._interval = false;
                this._timer = null;
            }, 1500);
        } else if (average > 115 && this._slow && !this._interval) {
            this._slow = false;
            this._interval = true;

            // @ts-ignore
            this._timer = setTimeout(() => {
                this._interval = false;
                this._timer = null;
            }, 1500);
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

            if (mesh.position.y < -300) {
                if (this._remove) {
                    mesh.visible = false;
                } else {
                    mesh.position.y = 200;
                    // @ts-ignore
                    mesh.velocity = 0;
                }
            }
        });
    };

    public stop = () => {
        this._slow = false;
        this._interval = true;

        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    public remove = () => {
        this._stage.remove(this._rain);
    };

    get ready(): boolean {
        return this._ready;
    }

    get slow(): boolean {
        return this._slow;
    }
}
