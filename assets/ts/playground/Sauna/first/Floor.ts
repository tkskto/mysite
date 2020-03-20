import * as THREE from 'three';

export default class Floor {
    private _texture: THREE.Texture;

    constructor(private _stage: THREE.Scene) {
        this._texture = new THREE.TextureLoader().load(require('~/assets/img/playground/sauna/floor.jpg'));
        this._texture.magFilter = THREE.NearestFilter;
        this._texture.minFilter = THREE.NearestFilter;
        this._texture.wrapS = THREE.MirroredRepeatWrapping;
        this._texture.wrapT = THREE.MirroredRepeatWrapping;
        this._texture.repeat.set(3, 3);
    }

    public generate = () => {
        const geometry = new THREE.PlaneGeometry(200, 200);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xfafaa0,
            emissive: 0x0,
            shininess: 20,
            map: this._texture,
            side: THREE.DoubleSide,
            // wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI * 0.5);
        mesh.receiveShadow = true;

        this._stage.add(mesh);
    }
}
