import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

export default class TV {
    private _obj;
    constructor(private _stage: THREE.Scene) {
        const loader = new OBJLoader();

        loader.load('/assets/obj/tv.obj', (obj) => {
            obj.traverse(function (child: THREE.Mesh): void {
                if (child.isMesh) {
                    child.material = new THREE.MeshLambertMaterial({
                        color: 0xffffff,
                        emissive: 0x111111,
                        depthTest: true,
                    });
                    child.castShadow = true;
                }
            });

            obj.position.y = - 95;
            this._obj = obj;
            this.generate();
        });
    }

    public generate = (): void => {
        this._obj.scale.set(10, 10, 10);
        this._obj.position.set(10, 5, 10);
        this._obj.rotation.set(0, 5, 0);
        this._stage.add(this._obj);
    }
}
