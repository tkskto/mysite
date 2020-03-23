import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Info {
    private _group: THREE.Group;
    private _font: THREE.Font;
    private _textMaterial: THREE.MeshBasicMaterial;
    private _text: THREE.Mesh;

    constructor(private _stage: THREE.Scene) {
        const loader = new THREE.FontLoader();

        loader.load('/assets/fonts/helvetiker_regular.typeface.json', (font) => {
            this._font = font;
            this.generate();
        });

        window.addEventListener('showSongInfo', this.showSongInfo);
    }

    private generate = () => {
        this._group = new THREE.Group();
        this._textMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(1, 1, 1),
            transparent: true,
            opacity: 0.5
        });

        const geometry = new THREE.PlaneGeometry(5,2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.5,
        });

        const plane = new THREE.Mesh(geometry, material);

        this._group.position.set(2, 2, 13);
        this._group.add(plane);
        this._group.scale.set(0.0001, 0.2, 1);
        this._stage.add(this._group);
    };

    private showSongInfo = () => {
        // @ts-ignore
        if (window.viewedData) {
            // @ts-ignore
            this.changeText(window.viewedData.name);
        } else {
            this.hide();
        }
    };


    private getGeometryCenter = (geometry: THREE.TextGeometry) => {
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        return - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    };

    public changeText = (str: string, size = 0.3) => {
        this._group.visible = true;

        const text = new THREE.TextGeometry(str, {
            font: this._font,
            size,
            height: 0.0001,
            curveSegments: 12,
        });

        this._group.remove(this._text);

        this._text = new THREE.Mesh(text, this._textMaterial);
        this._text.position.x = this.getGeometryCenter(text);
        this._group.add(this._text);

        TweenMax.to(this._group.scale, 0.3, {
            x: 1,
            onComplete: () => {
                TweenMax.to(this._group.scale, 0.3, {
                    y: 1,
                    onComplete: () => {

                    }
                });
            }
        });
    };

    private hide = () => {
        TweenMax.to(this._group.scale, 0.3, {
            y: 0.0001,
            onComplete: () => {
                TweenMax.to(this._group.scale, 0.3, {
                    x: 0.0001,
                    onComplete: () => {
                        this._group.visible = false;
                    }
                });
            }
        });
    }
}
