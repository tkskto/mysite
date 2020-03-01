import { FFT } from '../../../common/audio/FFT';
import { Sketch } from '../common/Sketch';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {MeshLine, MeshLineMaterial} from 'three.meshline';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export class Item19 extends Sketch {

    private _time = 0;
    private _renderer;
    private _camera;
    private _stage;
    private _light;
    private _audioContext: FFT;
    private _audioAnalyser: AnalyserNode;
    private _frequency: Uint8Array;
    private _outSide: THREE.Geometry;
    private _center: THREE.Mesh;
    private _sphere: THREE.Object3D;
    private _mat: THREE.ShaderMaterial;
    private _lines: THREE.Group;
    private _lineMeshArr: MeshLine[] = [];
    private _lineMaterials: MeshLineMaterial[] = [];
    private _whiteMaterial: THREE.MeshBasicMaterial;
    private _controls;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        const ratio = window.devicePixelRatio;
        const canvasSize = this._store.getters['Common/canvasSize'];
        this._store.commit('Practice/SET_VS_TEXT', 'This is threejs example and there is no own GLSL.');
        this._store.commit('Practice/SET_FS_TEXT', 'This is threejs example and there is no own GLSL.');

        const context: WebGL2RenderingContext = this._canvas.getContext( 'webgl2', { alpha: false } ) as WebGL2RenderingContext;
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            context: context
        });
        this._renderer.setSize(canvasSize.width / ratio, canvasSize.height / ratio);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0x333333);

        this._stage = new THREE.Scene();
        this._stage.fog = new THREE.FogExp2(0x000000, 0.0008);

        this._camera = new THREE.PerspectiveCamera(45, canvasSize.width/canvasSize.height, 0.1, 2000);
        this._camera.position.set(0, 0, 5.0);
        this._camera.lookAt(new THREE.Vector3(0, 0, -1));

        this._light = new THREE.DirectionalLight(0xffffff, 0.4);
        this._stage.add(this._light);

        this._outSide = new THREE.SphereGeometry(5, 32, 32);
        const gMat = new THREE.MeshBasicMaterial({
            wireframe: true
        });
        this._sphere = new THREE.Mesh(this._outSide, gMat);
        this._stage.add(this._sphere);

        this._lines = new THREE.Group();
        this._lines.add(
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
            this.makeLine(),
        );

        this._stage.add(this._lines);

        this._whiteMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });

        this._controls = new OrbitControls( this._camera, this._renderer.domElement );
        this._controls.update();

        this.play();
    };

    private makeLine = (): MeshLine => {
        const nbrOfPoints = 10;
        const points: number[] = [];
        const origin = this._sphere.position.clone();
        let index = Math.round(Math.random() * this._outSide.vertices.length - 1);
        index -= index % 3;
        const vertex = this._outSide.vertices[index];
        const vertex2 = this._outSide.vertices[index + 1];
        const vertex3 = this._outSide.vertices[index + 2];

        points.push(origin.x, origin.y, origin.z);

        for (let i = 1; i < nbrOfPoints + 1; i++) {
            const offset = i / nbrOfPoints;

            points.push(vertex.x * offset, vertex.y * offset, vertex.z * offset);
        }

        const line = new MeshLine();
        line.setGeometry(points);

        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            vertex.x, vertex.y, vertex.z,
            vertex2.x, vertex2.y, vertex2.z,
            vertex3.x, vertex3.y, vertex3.z,
        ]);

        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        this._stage.add(new THREE.Mesh( geometry, this._whiteMaterial ));

        const lineMaterial = new MeshLineMaterial({
            transparent: true,
            lineWidth: 0.01,
            color: 0x049ef4,
            dashArray: rand(1, 5),
            dashOffset: 0,
            dashRatio: 0.75,
            blending: THREE.AdditiveBlending
        });

        const mesh  = new THREE.Mesh(line.geometry, lineMaterial);
        // @ts-ignore
        mesh.target = vertex;

        this._lineMeshArr.push(mesh);
        this._lineMaterials.push(lineMaterial);

        return mesh;
    };

    public dispose = (): void => {
        this.pause();

        this._audioContext.pause();

        if (this._renderer) {
            this._stage.dispose();
            this._renderer.dispose();
        }
    };

    private checkCollision = () => {
        this._lineMeshArr.forEach((line) => {
            const material = line.material;

            if (Math.abs(material.uniforms.dashArray.value % 2) === 0 ) {
                console.log('lig');
            }
        });
    };

    public update = () => {
        // this._audioAnalyser.getByteFrequencyData(this._frequency);
        this.checkCollision();
        this.animate();
        this._controls.update();

        this._timer = requestAnimationFrame(this.update);
        this._time += 0.01;
    };

    public animate = () => {
        this._lineMaterials.forEach((material) => {
            material.uniforms.dashOffset.value -= 0.02;
        });

        this._renderer.render(this._stage, this._camera);
    };
}
