import * as THREE from 'three';
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare';
import TweenMax, {Power4} from 'gsap';

function rand(min, max) {
    return min + Math.random() * (max - min);
}

export class LensFlare {
    private _texture1: THREE.Texture;
    private _texture2: THREE.Texture;
    private _texture3: THREE.Texture;
    private _texture4: THREE.Texture;
    private _texture5: THREE.Texture;
    private _material: THREE.MeshBasicMaterial;
    private _lines: THREE.Group;
    private _circle: THREE.Mesh;

    constructor(private _stage: THREE.Scene) {
        const textureLoader = new THREE.TextureLoader();
        this._texture1 = textureLoader.load( "/assets/img/lensflare0.png" );
        this._texture2 = textureLoader.load( "/assets/img/lensflare2.png" );
        this._texture3 = textureLoader.load( "/assets/img/lensflare3.png" );
        this._texture4 = textureLoader.load( "/assets/img/line2.png" );
        this._texture5 = textureLoader.load('/assets/img/circle.png');
    }

    public generate = () => {
        this._lines = new THREE.Group();
        this._material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.3, 0.6, 0.7),
            blending: THREE.CustomBlending,
            depthTest: false,
            map: this._texture4
        });

        for (let i = 0; i < 240; i++) {
            const geometry = new THREE.BoxGeometry(2, rand(100, 150), 1, 1, 1, 1);
            const mesh = new THREE.Mesh(geometry, this._material);

            mesh.position.set(0, 0, 0);
            mesh.rotation.z = Math.PI * Math.random() * i;

            this._lines.add(mesh);
        }

        const geo = new THREE.PlaneGeometry(200, 200);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            blending: THREE.CustomBlending,
            transparent: true,
            depthTest: false,
            map: this._texture5
        });
        this._circle = new THREE.Mesh(geo, material);

        this._stage.add(this._lines);
        this._stage.add(this._circle);

        this._lines.scale.set(0.01, 0.01, 0.01);
        this._circle.scale.set(0.01, 0.01, 0.01);
    };

    public setSunFlare = () => {
        this._stage.fog = new THREE.Fog(0x000000, 50, 2000);
        const light = new THREE.PointLight( 0xffffff, 10, 2000 );
        const lensflare = new Lensflare();

        light.position.set(0, 0, 0);

        lensflare.addElement( new LensflareElement( this._texture1, 512, 20 ) );
        lensflare.addElement( new LensflareElement( this._texture2, 512, 60 ) );
        lensflare.addElement( new LensflareElement( this._texture3, 60, 120 ) );
        light.add( lensflare );
        this._stage.add(light);

        // @ts-ignore
        TweenMax.to(this._lines.scale, 1.5, {
            x: 1,
            y: 1,
            z: 1,
            ease: Power4.easeOut
        });

        // @ts-ignore
        TweenMax.to(this._circle.scale, 0.5, {
            x: 1,
            y: 1,
            z: 1,
            ease: Power4.easeOut,
            onComplete: () => {
                // @ts-ignore
                TweenMax.to(this._circle.material, 2, {
                    opacity: 0,
                });
            }
        });

        // @ts-ignore
        TweenMax.to(this._material, 3, {
            opacity: 0,
            onComplete: () => {
                this._stage.remove(light);
            }
        });
    }
}
