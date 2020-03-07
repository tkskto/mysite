import * as THREE from 'three';
// import {IcosaFS, IcosaVS} from './IcosaShader';
import TweenMax, {Back, Expo} from 'gsap';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class IcosaHedron {
    private _material: THREE.MeshPhongMaterial;
    // private _audioUniforms: {};
    private _mesh: THREE.Mesh;
    private _ready: boolean = false;
    constructor(private _stage: THREE.Scene) {}

    public generate = () => {
        let geometry = new THREE.TetrahedronGeometry(10, 0);
        this._material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 1, 1),
            specular: new THREE.Color(1, 1, 1),
            shininess: 100,
        });

        this._mesh = new THREE.Mesh(geometry, this._material);
        this._mesh.position.set(0, 0, 400);

        this._stage.add(this._mesh);
        this._ready = true;

        // @ts-ignore
        TweenMax.to(this._mesh.position, 2, {
            z: 700
        });
    };

    public update(average: number) {
        this._mesh.rotation.x += rand(0.001, 0.01);
        this._mesh.rotation.y += rand(0.001, 0.01);

        const scale = 0.4 + average * 0.001;
        this._mesh.scale.set(scale, scale, scale);
    }

    public move(index: number) {
        if (index === 0) {
            // @ts-ignore
            TweenMax.to(this._material.color, 10, {
                r: 0.8,
                g: 0.39,
                b: 0.25,
            });
            // @ts-ignore
            TweenMax.to(this._material.specular, 10, {
                r: 0.8,
                g: 0.39,
                b: 0.25,
            });
        } else if (index === 1) {
            // @ts-ignore
            TweenMax.to(this._material.color, 10, {
                r: 0.4,
                g: 0.5,
                b: 0.6,
            });
            // @ts-ignore
            TweenMax.to(this._material.specular, 10, {
                r: 0.4,
                g: 0.5,
                b: 0.6,
            });
        }
    }

    public hide = () => {
        this._mesh.visible = false;
    };

    public show = () => {
        this._mesh.visible = true;
    };

    public last = () => {
        // @ts-ignore
        TweenMax.to(this._mesh.position, 7, {
            x: 0,
            y: 0,
            z: 0,
            ease: Expo.easeInOut,
            onComplete: () => {
                this._stage.remove(this._mesh);
            }
        });
    };

    get mesh(): THREE.Mesh {
        return this._mesh;
    }

    get ready(): boolean {
        return this._ready;
    }
}
