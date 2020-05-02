import {Water, WaterOptions} from 'three/examples/jsm/objects/Water';
import {
    DoubleSide,
    ExtrudeGeometry,
    Group,
    Light,
    Mesh,
    MeshStandardMaterial,
    Path, PlaneGeometry,
    RepeatWrapping,
    Scene, ShaderMaterial,
    Shape,
    TextureLoader
} from 'three'

export default class Pool {
    private _group: Group;
    private _waterOption: WaterOptions;
    private _water: Mesh;

    constructor(private _stage: Scene) {}

    public generate = async (size, depth, light: Light): Promise<void> => {
        const texture = new TextureLoader().load(await require('/assets/img/plyground/sauna/waternormals.jpg'));
        texture.wrapS = texture.wrapT = RepeatWrapping;
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

        this._group = new Group();
        const frame = new Shape();
        frame.moveTo(-(size + 1), -size);
        frame.lineTo( (size + 1), -size);
        frame.lineTo( (size + 1),  size);
        frame.lineTo(-(size + 1),  size);

        //..with a hole:
        const hole = new Path();
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
        const geom = new ExtrudeGeometry(frame, extrudeSettings);
        const material = new MeshStandardMaterial({
            color: 0x999999,
            emissive: 0x0,
            metalness: 1,
            roughness: 0.5,
            side: DoubleSide
        });
        const mesh = new Mesh(geom, material);

        // 水面
        const wgeometry = new PlaneGeometry(size * 2, size * 2);
        this._water = new Water(wgeometry, this._waterOption);
        this._water.position.z = 1;
        this._water.rotation.x = Math.PI;

        // 底面
        const bgeometry = new PlaneGeometry(size * 2, size * 2);
        const bottom = new Mesh(bgeometry, material);
        bottom.position.z = depth;

        this._group.rotation.x = Math.PI * 0.5;

        this._group.add(mesh);
        this._group.add(this._water);
        this._group.add(bottom);
        this._stage.add(this._group);
    };

    public update = (time: number): void => {
        const material: ShaderMaterial = this._water.material as ShaderMaterial;

        material.uniforms.time.value = time;
    }
}
