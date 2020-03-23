import * as THREE from 'three';
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare';

export default class Bulb {
    private _flare: THREE.Texture;
    private _group: THREE.Group;

    constructor(private _stage: THREE.Scene) {
        const textureLoader = new THREE.TextureLoader();
        this._flare = textureLoader.load( "/assets/img/lensflare0.png" );
    }

    public generate = () => {
        const lensflare = new Lensflare();
        const pointLight = new THREE.PointLight(0xfe8400, 1, 150, 2);

        pointLight.castShadow = true;
        lensflare.addElement( new LensflareElement( this._flare, 200, 0 ) );
        pointLight.add(lensflare);

        this._group = new THREE.Group();
        this._group.add(pointLight);

        this._group.position.set(0, 50, 30);

        this._stage.add(this._group);
    }
}
