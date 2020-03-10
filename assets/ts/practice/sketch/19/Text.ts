import * as THREE from 'three';
import TweenMax, {Expo} from 'gsap';

export default class Text {
    private _text: THREE.Mesh;
    private _font: THREE.Font;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene) {}

    public generate = () => {
        const loader = new THREE.FontLoader();
        loader.load( '/assets/font/droid_sans_regular.typeface.json',  ( font ) => {
            this._font = font;
            this._text = this.makeText('T I M E', new THREE.Color(0xffffff));
            this._text.position.set(20, -5, 1300);

            this._stage.add(this._text);
            this._ready = true;

            this._text.rotation.y += Math.PI;
        });
    };

    public start = () => {
        // @ts-ignore
        TweenMax.to(this._text.position, 22.5, {
            z: 800,
            ease: Expo.easeInOut
        });

        setTimeout(() => {
            this._text.visible = false;
        }, 11000);
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

    public show = (_position: THREE.Vector3) => {
        this._text.position.set(_position.x, _position.y, _position.z);
        this._text.visible = true;
    };

    public remove = () => {
        this._text.visible = false;
        this._stage.remove(this._text);
    };

    get ready(): boolean {
        return this._ready;
    }
}
