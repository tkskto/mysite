import * as THREE from 'three';
import {Water, WaterOptions} from 'three/examples/jsm/objects/Water';

export default class Pool {
    private _group = new THREE.Group;
    private _waterOption: WaterOptions;
    private _water: THREE.Mesh;

    constructor(private _stage: THREE.Scene, light: THREE.Light) {
        const texture = new THREE.TextureLoader().load('/assets/img/waternormals.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        this._waterOption = {
            textureWidth: 512,
            textureHeight: 512,
            time: 0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            waterNormals: texture
        };
    }

    public generate = (size, depth) => {
        this._group = new THREE.Group();
        const frame = new THREE.Shape();
        frame.moveTo(-(size + 1), -size);
        frame.lineTo( (size + 1), -size);
        frame.lineTo( (size + 1),  size);
        frame.lineTo(-(size + 1),  size);

        //..with a hole:
        const hole = new THREE.Path();
        hole.moveTo(-size, -(size - 1));
        hole.lineTo( size, -(size - 1));
        hole.lineTo( size,  (size - 1));
        hole.lineTo(-size,  (size - 1));
        frame.holes.push(hole);

        //Extrude the shape into a geometry, and create a mesh from it:
        const extrudeSettings = {
            steps: 1,
            depth: depth,
            bevelEnabled: false,
            bevelThickness: 1, // ベベルの縦の感覚
            bevelSize: 1, // ベベルの横の大きさ
        };

        // 箱
        const geom = new THREE.ExtrudeGeometry(frame, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({
            color: 0x999999,
            emissive: 0x0,
            metalness: 1,
            roughness: 0.5,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geom, material);

        // 水面
        const wgeometry = new THREE.PlaneGeometry(size * 2, size * 2);
        this._water = new Water(wgeometry, this._waterOption);
        this._water.position.z = 1;
        this._water.rotation.x = Math.PI;

        // 底面
        const bgeometry = new THREE.PlaneGeometry(size * 2, size * 2);
        const bottom = new THREE.Mesh(bgeometry, material);
        bottom.position.z = depth;

        this._group.rotation.x = Math.PI * 0.5;

        this._group.add(mesh);
        this._group.add(this._water);
        this._group.add(bottom);
        this._stage.add(this._group);
    };

    public update = (time: number) => {
        // @ts-ignore
        this._water.material.uniforms.time.value = time;
    }
}
