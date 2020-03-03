import * as THREE from 'three';
// import {IcosaFS, IcosaVS} from './IcosaShader';
import TweenMax, {Back} from 'gsap';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class IcosaHedron {
    private _material: THREE.MeshPhongMaterial;
    // private _audioUniforms: {};
    private _mesh: THREE.Mesh;
    private _ready: boolean = false;
    constructor(private _stage: THREE.Scene, private _analyser: THREE.AudioAnalyser) {
        // this._audioUniforms = {
        //     tAudioData: { value: new THREE.DataTexture( _analyser.data, 128 / 2, 1, THREE.LuminanceFormat ) }
        // };
    }

    public generate = () => {
        let geometry = new THREE.IcosahedronGeometry(8, 0);
        this._material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0.80, 0.39, 0.25),
            specular: new THREE.Color(0.80, 0.39, 0.25),
            shininess: 100,
        });

        this._mesh = new THREE.Mesh(geometry, this._material);

        this._stage.add(this._mesh);
        this._ready = true;
    };

    public update(average: number) {
        this._mesh.rotation.x += rand(0.001, 0.01);
        this._mesh.rotation.y += rand(0.001, 0.01);

        const scale = 0.4 + average * 0.001;
        this._mesh.scale.set(scale, scale, scale);
    }

    public move(index: number) {
        if (index === 1) {
            // @ts-ignore
            TweenMax.to(this._mesh.position, 12, {
                x: -40,
                y: 10,
                z: 1000,
                ease: Back.easeInOut,
                onComplete: () => {
                    this._mesh.visible = false;
                }
            });
        }
    }

    public show = () => {
        this._mesh.visible = true;
    };

    get mesh(): THREE.Mesh {
        return this._mesh;
    }

    get ready(): boolean {
        return this._ready;
    }
}
