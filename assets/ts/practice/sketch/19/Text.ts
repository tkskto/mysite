import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Text {
    private _text: THREE.Mesh;
    private _font: THREE.Font;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {}

    public generate = () => {
        const loader = new THREE.FontLoader();
        loader.load( '/assets/font/droid_sans_regular.typeface.json',  ( font ) => {
            this._font = font;
            this._text = this.makeText('H E A T', new THREE.Color(0xffffff));
            this._text.position.set(-20, -5, 300);

            this._stage.add(this._text);
            this._ready = true;
        });
    };

    private makeText = (str: string, color: THREE.Color): THREE.Mesh => {
        const geometry = new THREE.TextGeometry(str, {
            font: this._font,
            size: 10,
            height: 5,
            bevelEnabled: false
        });

        const materials = [
            new THREE.MeshBasicMaterial( { color: color } )
        ];

        return new THREE.Mesh(geometry, materials)
    };

    public changeText = (_index: number) => {
        if (_index === 1) {
            this._stage.remove(this._text);
            this._text = this.makeText('W A T E R', new THREE.Color(0x000000));
            this._text.rotation.z -= Math.PI / 6;
            this._text.rotation.y += Math.PI;
            this._text.renderOrder = -10;
            this._text.position.set(20.7, 10, 100);
            this._stage.add(this._text);
        } else if (_index === 2) {
            this._stage.remove(this._text);
            this._text = this.makeText('T I M E', new THREE.Color(0xffffff));
            this._text.position.set(0 ,0, 300);
            this._text.rotation.set(0, 0, 0);
            this._text.rotation.y += Math.PI;
            this._text.renderOrder = 0;
            this._stage.add(this._text);
            this._ready = true;
        }
    };

    public update = () => {
        this._text.position.z++;
    };

    public show = (_position: THREE.Vector3) => {
        this._text.position.set(_position.x, _position.y, _position.z);
        this._text.visible = true;
    };

    public remove = () => {
        this._text.visible = false;
    };

    get ready(): boolean {
        return this._ready;
    }
}
