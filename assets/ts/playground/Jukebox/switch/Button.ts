import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Button {
    private _group: THREE.Group;
    private _texture: THREE.Texture;
    private _material: THREE.MeshToonMaterial;

    constructor(private _stage: THREE.Scene) {
        const loader = new THREE.TextureLoader();
        this._texture = loader.load('/assets/img/threeTone.jpg');
        this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
        this._texture.encoding = THREE.sRGBEncoding;
        this._texture.anisotropy = 16;
    }

    public generate = () => {
        this._group = new THREE.Group();

        const baseGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.2, 3);
        this._material = new THREE.MeshToonMaterial({
            map: this._texture,
            color: new THREE.Color(0.7, 0.25, 0.25),
            specular: new THREE.Color(0.1, 0.1, 0.1),
            shininess: 50,
        });

        const baseCylinder = new THREE.Mesh(baseGeometry, this._material);
        baseCylinder.position.y = 0;

        this._group.rotateX(Math.PI * 0.25);
        this._group.rotateY(Math.PI * 0.5);
        this._group.add(baseCylinder);
    };

    public press = () => {
        const pos = this._group.position.clone();
        // @ts-ignore
        TweenMax.to(this._group.position, 0.25, {
            y: pos.y - 0.1,
            z: pos.z - 0.1,
            onComplete: () => {
                // @ts-ignore
                TweenMax.to(this._group.position, 0.25, {
                    y: pos.y,
                    z: pos.z,
                });
            }
        });

        TweenMax.to(this._material.color, 0.1, {
            r: 0.8,
            g: 0.6,
            b: 0.6,
            delay: 0.15,
            onComplete: () => {
                TweenMax.to(this._material.specular, 0.25, {
                    r: 0.7,
                    g: 0.25,
                    b: 0.25,
                });
            }
        });

        TweenMax.to(this._material.specular, 0.1, {
            r: 0.8,
            g: 0.8,
            b: 0.8,
            delay: 0.15,
            onComplete: () => {
                TweenMax.to(this._material.specular, 0.25, {
                    r: 0.1,
                    g: 0.1,
                    b: 0.1,
                });
            }
        });
    };

    get group(): THREE.Group {
        return this._group;
    }
}
