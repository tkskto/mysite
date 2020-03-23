import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import Background from './Background';
import Bulb from './Bulb';

export default class Housing {
    private _stage: THREE.Scene;
    private _object: THREE.Group;
    private _bulb: Bulb;
    private _background: Background;
    private _ready = false;

    constructor(private _camera: THREE.PerspectiveCamera, private _renderer: THREE.WebGLRenderer) {
        this._stage = new THREE.Scene();
        this._stage.frustumCulled = false;
    }

    public load = () => {
        return new Promise((resolve) => {
            const mtlLoader = new MTLLoader();
            const loader = new OBJLoader();

            mtlLoader.load('/assets/obj/Jukebox2.mtl', (materials) => {
                materials.preload();
                loader.setMaterials(materials);
                loader.load(
                    '/assets/obj/Jukebox2.obj',
                    (object) => {
                        this._object = object;
                        resolve();
                    },
                );
            });
        });
    };

    public generate = async () => {
        this._object.position.set(0, -34, 7.6);
        this._object.scale.set(10, 10, 10);

        this._background = new Background(this._stage);
        this._background.generate();

        this._bulb = new Bulb(this._stage);
        this._bulb.generate();

        const amb = new THREE.AmbientLight(0xffffff, 0.5);
        this._stage.add(amb);

        this._object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });

        this._stage.add(this._object);
        this._ready = true;
    };

    public update = () => {
        this._renderer.render(this._stage, this._camera);
    };

    get ready(): boolean {
        return this._ready;
    }
}
