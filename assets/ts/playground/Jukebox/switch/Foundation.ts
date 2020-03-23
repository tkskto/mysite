import * as THREE from 'three';
import Button from './Button';
import PlayStopButton from "./PlayStopButton";

export default class Foundation {
    private _group: THREE.Group;
    private _texture: THREE.Texture;
    private _raycaster: THREE.Raycaster;
    private _font: THREE.Font;

    private _button1: Button;
    private _button2: Button;
    private _button3: Button;
    private _button4: Button;
    private _playButton: PlayStopButton;

    constructor(private _stage: THREE.Scene, private _camera: THREE.PerspectiveCamera) {
        this._texture = new THREE.TextureLoader().load('/assets/img/metal2.jpg');
        this._raycaster = new THREE.Raycaster();

        const loader = new THREE.FontLoader();

        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            this._font = font;
            this.generate();
        });
    }

    public generate = () => {
        this._group = new THREE.Group();
        const geometry = new THREE.BoxGeometry(15, 2, 3);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0.5, 0.5, 0.5),
            emissive: 0x0,
            roughness: 0.3,
            metalness: 0.4,
            map: this._texture
        });
        material.map = this._texture;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -4, 14);
        mesh.rotateX(Math.PI * 0.25);

        this._button1 = new Button(this._stage);
        this._button1.generate();
        this._button1.group.position.set(4, -3.6, 15.2);

        this._button2 = new Button(this._stage);
        this._button2.generate();
        this._button2.group.position.set(2, -3.6, 15.2);
        this._button2.group.rotateY(Math.PI);

        const text1 = new THREE.TextGeometry('VISUAL SELECT', {
            font: this._font,
            size: 0.25,
            height: 0.0001,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.3, 0.3, 0.3)
        });

        const selectVisual = new THREE.Mesh(text1, textMaterial);
        selectVisual.position.set(1.6, -2.8, 15);
        selectVisual.rotateX(Math.PI * -0.25);

        this._button3 = new Button(this._stage);
        this._button3.generate();
        this._button3.group.position.set(-4, -3.6, 15.2);

        this._button4 = new Button(this._stage);
        this._button4.generate();
        this._button4.group.position.set(-6, -3.6, 15.2);
        this._button4.group.rotateY(Math.PI);

        const text2 = new THREE.TextGeometry('MUSIC SELECT', {
            font: this._font,
            size: 0.25,
            height: 0.0001,
            curveSegments: 12,
        });

        const selectMusic = new THREE.Mesh(text2, textMaterial);
        selectMusic.position.set(-5.9, -2.8, 15);
        selectMusic.rotateX(Math.PI * -0.25);

        this._playButton = new PlayStopButton(this._stage);
        this._playButton.generate();
        this._playButton.group.position.set(6, -3.6, 15.2);
        this._playButton.group.rotateY(Math.PI);

        const text3 = new THREE.TextGeometry('PLAY', {
            font: this._font,
            size: 0.25,
            height: 0.0001,
            curveSegments: 12,
        });

        const play = new THREE.Mesh(text3, textMaterial);
        play.position.set(5.3, -2.8, 15);
        play.rotateX(Math.PI * -0.25);

        this._group.add(mesh, this._button1.group, this._button2.group, selectVisual, this._button3.group, this._button4.group, selectMusic, this._playButton.group, play);

        this._stage.add(this._group);
    };

    public click = (mouse: THREE.Vector2) => {
        this._raycaster.setFromCamera(mouse, this._camera);

        let intersect = this._raycaster.intersectObjects(this._button1.group.children);

        if (intersect.length > 0) {
            this._button1.press();
            return 1;
        }

        intersect = this._raycaster.intersectObjects(this._button2.group.children);

        if (intersect.length > 0) {
            this._button2.press();
            return 2;
        }

        intersect = this._raycaster.intersectObjects(this._button3.group.children);

        if (intersect.length > 0) {
            this._button3.press();
            return 3;
        }

        intersect = this._raycaster.intersectObjects(this._button4.group.children);

        if (intersect.length > 0) {
            this._button4.press();
            return 4;
        }

        intersect = this._raycaster.intersectObjects(this._playButton.group.children);

        if (intersect.length > 0) {
            this._playButton.press();
            return 5;
        }

        return 0;
    }
}
