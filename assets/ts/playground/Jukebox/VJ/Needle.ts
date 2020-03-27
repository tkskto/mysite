import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import TweenMax, {Power3} from 'gsap';

export default class Needle {
    private _object: THREE.Group;

    constructor(private _stage: THREE.Scene) {}

    public load = () => {
        return new Promise((resolve) => {
            const mtlLoader = new MTLLoader();
            const loader = new OBJLoader();

            mtlLoader.load('/assets/obj/needle.mtl', (materials) => {
                materials.preload();
                loader.setMaterials(materials);
                loader.load(
                    '/assets/obj/needle.obj',
                    (object) => {
                        this._object = object;
                        resolve();
                    },
                );
            });
        });
    };

    public generate = () => {
        this._object.position.set(8, -1, 5.6);
        this._object.scale.set(10, 10, 10);

        this._stage.add(this._object);
    };

    public play = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._object.rotation, 1, {
                y: Math.PI * -0.1,
                ease: Power3.easeInOut,
                onComplete: () => {
                    resolve();
                }
            });
        });
    };

    public cancel = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._object.rotation, 1, {
                y: 0,
                ease: Power3.easeInOut,
                onComplete: () => {
                    resolve();
                }
            });
        });
    }
}
