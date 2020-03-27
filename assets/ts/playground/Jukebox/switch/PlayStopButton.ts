import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Button {
    private _group: THREE.Group;
    private _texture: THREE.Texture;
    private _material: THREE.MeshToonMaterial;
    private _status: THREE.MeshPhongMaterial;
    private _animate = false;
    private _isPlaying = false;

    constructor(private _stage: THREE.Scene) {
        const loader = new THREE.TextureLoader();
        this._texture = loader.load('/assets/img/threeTone.jpg');
        this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
        this._texture.encoding = THREE.sRGBEncoding;
        this._texture.anisotropy = 16;
    }

    public generate = () => {
        this._group = new THREE.Group();

        const baseGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
        this._material = new THREE.MeshToonMaterial({
            map: this._texture,
            color: new THREE.Color(0.7, 0.25, 0.25),
            specular: new THREE.Color(0.1, 0.1, 0.1),
            shininess: 12,
        });

        const baseCylinder = new THREE.Mesh(baseGeometry, this._material);

        const potch = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 32);
        this._status = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 1, 1),
            emissive: new THREE.Color(0.7, 0.25, 0.25),
            specular: new THREE.Color(1.0, 1.0, 1.0),
            shininess: 0,
        });
        const power = new THREE.Mesh(potch, this._status);

        this._group.rotateX(Math.PI * 0.25);
        this._group.rotateY(Math.PI * 0.5);

        power.position.add(new THREE.Vector3(6.8, -4.0, 15.4));
        power.rotateX(Math.PI * 0.25);
        power.rotateY(Math.PI * 0.5);

        this._group.add(baseCylinder);
        this._stage.add(power);
    };

    public press = () => {
        if (this._animate) {
            return;
        }

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

        this._isPlaying = !this._isPlaying;

        setTimeout(() => {
            const color = this._isPlaying ? new THREE.Color(0.25, 0.7, 0.25) : new THREE.Color(0.7, 0.25, 0.25);
            this._status.emissive = color;
        }, 250);

        window.dispatchEvent(new CustomEvent('playMusic'));
    };

    get group(): THREE.Group {
        return this._group;
    }
}
