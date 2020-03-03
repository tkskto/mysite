import * as THREE from 'three';

export default class Text {
    private _text: THREE.Mesh;
    private _font: THREE.Font;

    constructor(private _stage: THREE.Scene) {}

    public generate = () => {
        const loader = new THREE.FontLoader();
        loader.load( '/assets/font/helvetiker_regular.typeface.json',  ( font ) => {
            this._font = font;
            this._text = this.makeText('H E A T', new THREE.Color(0xffffff));
            this._text.position.set(-20, -5, 900);

            this._stage.add(this._text);
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
            new THREE.MeshBasicMaterial( { color: color} )
        ];

        return new THREE.Mesh(geometry, materials)
    };

    public changeText = (_index: number) => {
        if (_index === 1) {
            this._stage.remove(this._text);
            this._text = this.makeText('W A T E R', new THREE.Color(0x000000));

            this._text.rotation.z -= Math.PI / 6;
            this._text.rotation.y += Math.PI;
            this._text.position.set(22.5, 10, 100);
            this._stage.add(this._text);
        } else if (_index === 2) {
            this._stage.remove(this._text);
            this._text = this.makeText('T I M E', new THREE.Color(0x000000));

            this._text.position.set(100 ,-5, 100);
            this._text.rotation.y += Math.PI;
            this._stage.add(this._text);
        }
    };

    public show = (_position: THREE.Vector3) => {
        this._text.position.set(_position.x, _position.y, _position.z);
        this._text.visible = true;
    };

    public remove = () => {
        this._text.visible = false;
    }
}
