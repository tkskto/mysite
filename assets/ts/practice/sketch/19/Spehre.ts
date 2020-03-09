import * as THREE from 'three';
import TweenMax, {Expo} from 'gsap';

export default class Sphere {
    private _sphere: THREE.Mesh;
    private _group: THREE.Group;
    private _texture: THREE.Texture;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load('/assets/img/circle.png');
    }

    public generate() {
        this._group = new THREE.Group();
        const geometry = new THREE.SphereGeometry(50, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: this._texture,
        });

        this._sphere = new THREE.Mesh(geometry, material);
        this._sphere.position.set(0, 0, 1300);
        this._sphere.rotateY(Math.PI);
        this._stage.add(this._sphere);
        this._ready = true;
    }

    public start() {
        // @ts-ignore
        TweenMax.to(this._sphere.position, 20.5, {
            z: 800,
            ease: Expo.easeInOut
        });
    }

    public fall() {
        // @ts-ignore
        TweenMax.to(this._sphere.position, 5, {
            y: 0
        });
    }

    public remove() {
        this._stage.remove(this._sphere);
    }

    get ready(): boolean {
        return this._ready;
    }

    get sphere(): THREE.Mesh {
        return this._sphere;
    }
}
