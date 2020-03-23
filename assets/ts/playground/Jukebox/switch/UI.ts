import * as THREE from 'three';
import Foundation from './Foundation';
import Display from './Display';

export default class UI {
    private _foundation: Foundation;
    private _display: Display;
    private _ready = false;

    constructor(private _stage: THREE.Scene, private _camera: THREE.PerspectiveCamera, private _renderer: THREE.WebGLRenderer, private _width, private _height) {}

    public generate = () => {
        this._foundation = new Foundation(this._stage, this._camera);
        this._display = new Display(this._renderer, this._camera, this._width, this._height);

        const pointLight = new THREE.PointLight(0xfe8400, 2, 150, 2);
        pointLight.castShadow = true;
        pointLight.position.set(0, 50, 30);
        this._stage.add(pointLight);

        const amb = new THREE.AmbientLight(0xffffff, 0.5);
        // this._stage.add(amb);

        this._ready = true;
    };

    public update = () => {
        this._renderer.render(this._stage, this._camera);

        if (this._display.ready) {
            this._display.update();
        }
    };

    public setSongName = () => {
        // @ts-ignore
        this._display.changeText(window.selectedData.name);
    };

    public click = (mouse: THREE.Vector2) => {
        return this._foundation.click(mouse);
    };

    get ready(): boolean {
        return this._ready;
    }
}
