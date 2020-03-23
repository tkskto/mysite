import * as THREE from 'three';

export default class Bulb {
    private _group: THREE.Group;

    constructor(private _stage: THREE.Scene) {
    }

    public generate = () => {
        const pointLight = new THREE.PointLight(0xfe8400, 2, 200, 2);

        pointLight.castShadow = true;

        this._group = new THREE.Group();
        this._group.add(pointLight);

        this._group.position.set(0, 50, 30);

        this._stage.add(this._group);
    }
}
