import * as THREE from 'three';

export default class Background {
    constructor(private _stage: THREE.Scene) {}

    public generate = () => {
        const geometry = new THREE.PlaneGeometry(500, 500);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xfafaa0,
            emissive: 0x0,
            shininess: 20,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI * 0.5);
        mesh.receiveShadow = true;
        mesh.position.set(0, -34, 0);

        this._stage.add(mesh);
    }
}
