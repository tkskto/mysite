import * as THREE from 'three';
import Composer from './Composer';

export default class Display {
    private _stage: THREE.Scene;
    private _font: THREE.Font;
    private _textMaterial: THREE.MeshBasicMaterial;
    private _text: THREE.Mesh;
    private _artist: THREE.Mesh;
    private _composer: Composer;
    private _ready = false;

    constructor(private _renderer: THREE.WebGLRenderer, private _camera: THREE.PerspectiveCamera, private _width, private _height) {
        const loader = new THREE.FontLoader();

        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            this._font = font;
            this.generate();
        });
    }

    public generate = () => {
        this._stage = new THREE.Scene();

        const geometry = new THREE.PlaneGeometry(3, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        const display = new THREE.Mesh(geometry, material);
        this._stage.add(display);

        const text = new THREE.TextGeometry('H E L L O', {
            font: this._font,
            size: 0.25,
            height: 0.0001,
            curveSegments: 12,
        });
        this._textMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.596, 0.149, 0.149)
        });
        this._text = new THREE.Mesh(text, this._textMaterial);
        this._text.position.set(0, -0.1, 0);
        this._text.position.x = this.getGeometryCenter(text);
        this._stage.add(this._text);

        this._stage.position.set(-1, -3.6, 15.2);
        this._stage.rotateX(-Math.PI * 0.25);

        this._composer = new Composer(this._stage, this._renderer, this._camera, this._width, this._height);
        this._composer.setComposer();
        this._ready = true;
    };

    private getGeometryCenter = (geometry: THREE.TextGeometry) => {
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        return - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    };

    public update = () => {
        this._renderer.render(this._stage, this._camera);
        // if (this._composer.ready) {
        //     this._composer.render();
        // } else {
        //     this._renderer.render(this._stage, this._camera);
        // }
    };

    public changeText = (str: string, size = 0.2) => {
        const text = new THREE.TextGeometry(str, {
            font: this._font,
            size,
            height: 0.0001,
            curveSegments: 12,
        });

        const artist = new THREE.TextGeometry('BILL EVANS', {
            font: this._font,
            size,
            height: 0.0001,
            curveSegments: 12,
        });

        this._stage.remove(this._text);
        this._stage.remove(this._artist);

        this._text = new THREE.Mesh(text, this._textMaterial);
        this._text.position.set(0, 0.1, 0);
        this._text.position.x = this.getGeometryCenter(text);

        this._artist = new THREE.Mesh(artist, this._textMaterial);
        this._artist.position.set(0, -0.3, 0);
        this._artist.position.x = this.getGeometryCenter(artist);
        this._stage.add(this._text, this._artist);
    };

    get ready(): boolean {
        return this._ready;
    }
}
