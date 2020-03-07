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
            this._text.position.set(-20, -5, 0);

            this._stage.add(this._text);
            this._ready = true;

            // @ts-ignore
            TweenMax.to(this._text.position, 20.5, {
                z: 500,
                ease: Expo.easeInOut
            });

            setTimeout(() => {
                this._text.visible = false;
            }, 11000);
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

    // public changeText = (_index: number) => {
    //     if (_index === 1) {
    //         this._stage.remove(this._text);
    //         this._text = this.makeText('W A T E R', new THREE.Color(0xffffff));
    //         this._text.rotation.y += Math.PI;
    //         this._text.position.set(0 ,0, 500);
    //         this._stage.add(this._text);
    //
    //         // @ts-ignore
    //         TweenMax.to(this._text.position, 10, {
    //             z: 1000
    //         });
    //     } else if (_index === 2) {
    //         this._stage.remove(this._text);
    //         this._text = this.makeText('T I M E', new THREE.Color(0xffffff));
    //         this._text.position.set(-100,0, 1000);
    //         this._text.rotation.y += Math.PI;
    //         this._stage.add(this._text);
    //
    //         // @ts-ignore
    //         TweenMax.to(this._text.position, 10, {
    //             z: 100
    //         });
    //     }
    // };
    //

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
