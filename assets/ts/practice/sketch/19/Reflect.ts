import * as THREE from 'three';
import {Reflector} from 'three/examples/jsm/objects/Reflector';
import TweenMax from "gsap";

export default class Reflect {
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene, private _renderer: THREE.WebGLRenderer, private _width: number, private _height: number) {}

    public generate = (posZ) => {
        const geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        const groundMirror = new Reflector( geometry, {
            clipBias: 0.003,
            textureWidth: this._width,
            textureHeight: this._height,
            color: new THREE.Color(0x777777),
            recursion: 1
        });
        groundMirror.position.set(0, -6, posZ);
        groundMirror.rotateX( - Math.PI / 2 );

        // @ts-ignore
        TweenMax.to(groundMirror.position, 2, {
            z: 300,
        });
        this._stage.add(groundMirror);
    };

    get ready(): boolean {
        return this._ready;
    }
}
