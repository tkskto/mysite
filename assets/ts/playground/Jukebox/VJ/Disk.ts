import * as THREE from 'three';
import TweenMax, {Power1} from 'gsap';

export default class Disk {
    private _initPos: THREE.Vector3;
    private _group: THREE.Group;
    private _ready = false;
    private _isPlaying = false;

    constructor(private _stage: THREE.Group, private _data, private _index: number) {
        this._group = new THREE.Group();
        const loader = new THREE.TextureLoader();
        const texture = loader.load(_data.img);
        const normal = loader.load('/assets/img/normal.jpg');

        const geometry = new THREE.RingGeometry(0.1, 2.5, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: texture,
        });

        const mesh = new THREE.Mesh(geometry, material);
        this._group.add(mesh);

        const outside = new THREE.RingGeometry(2.5, 3.5, 64);
        const omaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            side: THREE.DoubleSide,
            normalMap: normal
        });
        const out = new THREE.Mesh(outside, omaterial);
        this._group.add(out);

        this._group.position.z = _index * -0.08;
        this._group.scale.set(1, 1, 1);

        this._initPos = this._group.position.clone();

        _stage.add(this._group);
        this._ready = true;
    }

    public update = () => {
        this._group.rotation.z += 0.05;
    };

    public view = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._group.position, 0.25, {
                y: -5,
                z: 1,
                ease: Power1.easeInOut,
                onComplete: () => {
                    this._group.scale.set(0.9, 0.9, 1.0);
                    // @ts-ignore
                    TweenMax.to(this._group.rotation, 0.25, {
                        x: Math.PI * 0.5,
                        onComplete: () => {
                            window.dispatchEvent(new CustomEvent('showSongInfo'));
                            resolve();
                        }
                    });
                }
            });
        });
    };

    public unView = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._group.rotation, 0.25, {
                x: 0,
                onComplete: () => {
                    this._group.scale.set(1.0, 1.0, 1.0);
                    // @ts-ignore
                    TweenMax.to(this._group.position, 0.25, {
                        y: this._initPos.y,
                        z: this._initPos.z,
                        ease: Power1.easeInOut,
                    });
                    resolve();
                }
            });
        });
    };

    public select = () => {
        this._isPlaying = true;
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._group.position, 1, {
                x: 8.3,
                ease: Power1.easeInOut,
                onComplete: () => {
                    // @ts-ignore
                    TweenMax.to(this._group.position, 1, {
                        y: 0.8,
                        z: -2.25,
                        ease: Power1.easeInOut,
                        onComplete: () => {
                            resolve();
                        }
                    });
                }
            });

            // @ts-ignore
            TweenMax.to(this._group.rotation, 1, {
                x: 0,
                ease: Power1.easeInOut,
            });
        });
    };

    public cancel = () => {
        this._isPlaying = false;
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._group.position, 1, {
                y: this._initPos.y,
                z: this._initPos.z,
                ease: Power1.easeInOut,
                onComplete: () => {
                    // @ts-ignore
                    TweenMax.to(this._group.position, 1, {
                        x: this._initPos.x,
                        ease: Power1.easeInOut,
                    });
                    resolve();
                }
            });
        });
    };

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    get ready(): boolean {
        return this._ready;
    }
}
