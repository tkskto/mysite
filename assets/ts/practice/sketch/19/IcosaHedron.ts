import * as THREE from 'three';
import {IcosaFS, IcosaVS} from './IcosaShader';
import TweenMax, {Back, Expo} from 'gsap';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export default class IcosaHedron {
    // private _geometry: THREE.IcosahedronGeometry;
    private _geometry: THREE.SphereBufferGeometry;
    private _material: THREE.MeshPhongMaterial;
    // private _material: THREE.ShaderMaterial;
    private _audioUniforms: {};
    private _mesh: THREE.Mesh;
    private _ready: boolean = false;

    constructor(private _stage: THREE.Scene, _analyser, width, height) {
        this._audioUniforms = {
            time: {
                value: 0,
            },
            resolution: {
                value: new THREE.Vector2(width, height)
            },
            audio: {
                value: new THREE.DataTexture( _analyser.data, 1024 / 2, 1, THREE.LuminanceFormat )
            }
        };
    }

    public generate = (posZ) => {
        // this._geometry = new THREE.IcosahedronGeometry(6, 0);
        this._geometry = new THREE.SphereBufferGeometry(5, 31, 31);
        this._material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 1, 1),
            specular: new THREE.Color(1, 1, 1),
            shininess: 15,
        });
        // this._material = new THREE.ShaderMaterial({
        //     vertexShader: IcosaVS,
        //     fragmentShader: IcosaFS,
        //     uniforms: this._audioUniforms,
        //     side: THREE.DoubleSide
        // });

        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.position.set(20, 0, posZ + 10);

        this._stage.add(this._mesh);

        // @ts-ignore
        TweenMax.to(this._mesh.position, 2, {
            x: 0,
            z: 400
        });

        this._mesh.scale.set(2, 2, 2);

        // @ts-ignore
        TweenMax.to(this._mesh.scale, 2, {
            x: 1,
            y: 1,
            z: 1
        });

        this._ready = true;
        // this._vertexCount = this._geometry.attributes.position.count;
        //
        // for (let i = 0; i < this._vertexCount; i++) {
        //     this._isZoom.push(true);
        // }
    };

    public update(average: number) {
        this._mesh.rotation.x += rand(0.001, 0.01);
        this._mesh.rotation.y += rand(0.001, 0.01);

        const scale = 0.4 + average * 0.01;
        this._mesh.scale.set(scale, scale, scale);
    }

    public move(index: number) {
        if (index === 0) {
            // @ts-ignore
            TweenMax.to(this._material.color, 15, {
                r: 0.8,
                g: 0.39,
                b: 0.25,
            });
            // @ts-ignore
            TweenMax.to(this._material.specular, 15, {
                r: 0.8,
                g: 0.39,
                b: 0.25,
            });
        } else if (index === 1) {
            // @ts-ignore
            TweenMax.to(this._material.color, 15, {
                r: 0.4,
                g: 0.5,
                b: 0.6,
            });
            // @ts-ignore
            TweenMax.to(this._material.specular, 15, {
                r: 0.4,
                g: 0.5,
                b: 0.6,
            });
        } else if (index === 1) {
            // @ts-ignore
            TweenMax.to(this._material.color, 15, {
                r: 1.0,
                g: 1.0,
                b: 1.0,
            });
            // @ts-ignore
            TweenMax.to(this._material.specular, 15, {
                r: 1.0,
                g: 1.0,
                b: 1.0,
            });
        }
    }

    public hide = () => {
        this._mesh.visible = false;
    };

    public show = () => {
        this._mesh.visible = true;
    };

    public last = () => {
        // @ts-ignore
        TweenMax.to(this._mesh.position, 7, {
            x: 0,
            y: 0,
            z: 0,
            ease: Expo.easeInOut,
            onComplete: () => {
                this._stage.remove(this._mesh);
            }
        });
    };

    get mesh(): THREE.Mesh {
        return this._mesh;
    }

    get ready(): boolean {
        return this._ready;
    }
}
