import * as THREE from 'three';
import Composer from './Composer';
import TweenMax, {Linear} from 'gsap';

export default class Display {
    private _stage: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _font: THREE.Font;
    private _textMaterial: THREE.MeshBasicMaterial;
    private _text: THREE.Mesh;
    private _composer: Composer;
    private _ready = false;

    constructor(private _scene: THREE.Scene, private _renderer: THREE.WebGLRenderer, width, height) {
        const loader = new THREE.FontLoader();

        this._camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
        this._camera.position.set(0, 0, 3);

        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            this._font = font;
            this.generate();
        });
    }

    public generate = () => {
        this._stage = new THREE.Scene();
        this._stage.frustumCulled = false;
        this._stage.add(this._camera);

        const text = new THREE.TextGeometry('H E L L O', {
            font: this._font,
            size: 0.32,
            height: 0.0001,
            curveSegments: 12,
        });
        this._textMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.596, 0.149, 0.149),
            transparent: true,
            // opacity: 0
        });
        this._text = new THREE.Mesh(text, this._textMaterial);
        this._text.position.set(0, -0.1, 0);
        this._camera.lookAt(this._text.position);
        this._text.position.x = this.getGeometryPos(text).center;
        this._stage.add(this._text);

        this._composer = new Composer(this._stage, this._renderer, this._camera);
        this._composer.setComposer();
        this._composer.render();

        const geometry = new THREE.PlaneGeometry(3, 1);
        const m = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.9, 0.35, 0.35),
            map: this._composer.texture
        });
        const plane = new THREE.Mesh(geometry, m);
        plane.position.set(-1, -3.6, 15.2);
        plane.rotateX(-Math.PI * 0.25);
        this._scene.add(plane);

        this._ready = true;
    };

    private getGeometryPos = (geometry: THREE.TextGeometry) => {
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        const box = geometry.boundingBox;

        return {
            center: -0.5 * (box.max.x - box.min.x),
            max: box.max.x,
            min: box.min.x,
        };
    };

    public update = () => {
        if (this._composer.ready) {
            this._composer.render();
        }
    };

    public changeText = (str: string, size = 0.32) => {
        const text = new THREE.TextGeometry(str + ' - BILL EVANS', {
            font: this._font,
            size,
            height: 0.0001,
            curveSegments: 12,
        });

        this._stage.remove(this._text);

        this._text = new THREE.Mesh(text, this._textMaterial);
        this._text.position.set(0, -0.1, 0);

        const pos = this.getGeometryPos(text);

        this._text.position.x = pos.max;

        TweenMax.to(this._text.position, 10.0, {
            x: -pos.max + pos.center,
            ease: Linear.easeNone,
            onComplete: () => {
                this._text.position.x = -1.6;
            }
        });

        this._stage.add(this._text);
    };

    get ready(): boolean {
        return this._ready;
    }
}
