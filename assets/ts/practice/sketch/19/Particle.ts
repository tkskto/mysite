import * as THREE from 'three';

export default class Particle {
    private _ready: boolean = false;
    private _vertices: Float32Array = new Float32Array(6000*3);
    private _star: THREE.Points;
    private _geometry: THREE.BufferGeometry;
    private _material: THREE.PointsMaterial;
    private _texture: THREE.Texture;
    private _velocity = 0;
    private _accel = 0.002;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load('/assets/img/circle.png');
    }

    public generate = () => {
        this._geometry = new THREE.BufferGeometry();

        for (let i = 0; i < 18000;) {
            this._vertices[i++] = Math.random() * 600 - 300;
            this._vertices[i++] = Math.random() * 600 - 300;
            this._vertices[i++] = Math.random() * 800;
        }

        this._geometry.setAttribute( 'position', new THREE.BufferAttribute( this._vertices, 3 ) );
        this._material = new THREE.PointsMaterial({
            color: new THREE.Color(0.5, 0.6, 0.5),
            size: 10 * Math.PI,
            blending: THREE.SubtractiveBlending,
            transparent: true,
            map: this._texture,
            depthTest: false,
            opacity: 0
        });

        this._star = new THREE.Points(this._geometry, this._material);
        this._star.visible = false;

        this._stage.add(this._star);
    };

    public start = () => {
        this._star.visible = true;
        this._material.opacity = 0;
        this._ready = true;
    };

    public remove = () => {
        this._stage.remove(this._star);
        this._ready = false;
    };

    public update = () => {
        this._velocity -= this._accel;
        this._star.position.z -= this._velocity;

        if (this._star.position.z > 300) {
            this._ready = false;
            this._stage.remove(this._star);
        }
    };

    get ready(): boolean {
        return this._ready;
    }
}
