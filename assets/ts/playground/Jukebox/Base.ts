import * as THREE from 'three';
import TweenMax, {Power2} from 'gsap';

export default class Base {
    private _renderer: THREE.WebGLRenderer;
    private _stage: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _width: number;
    private _height: number;

    constructor(_canvas: HTMLCanvasElement, _width: number, _height: number) {
        const ratio = window.devicePixelRatio;
        const context = _canvas.getContext( 'webgl2', { alpha: false } ) as WebGL2RenderingContext;
        this._width = _width * ratio;
        this._height = _height * ratio;

        this._renderer = new THREE.WebGLRenderer({
            canvas: _canvas,
            antialias: true,
            context
        });
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        // this._renderer.autoClear = false;

        this._renderer.setSize(_width, _height);
        this._renderer.setPixelRatio(ratio);
        this._renderer.setClearColor(0x000000);

        this._stage = new THREE.Scene();
        this._stage.frustumCulled = false;

        this._camera = new THREE.PerspectiveCamera(60, _width / _height, 0.1, 200);
        this._camera.position.set(0, -40, 26);
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    public start = () => {
        return new Promise(resolve => {
            // @ts-ignore
            TweenMax.to(this._camera.position, 3, {
                y: 3,
                z: 26,
                ease: Power2.easeInOut,
                onComplete: () => {
                    resolve();
                }
            });
        });

        // https://accounts.spotify.com/authorize?client_id=70eb7c70c4ef4cb89aefbbd3eee34872&response_type=code&redirect_uri=https://tkskto.me&scope=user-read-private%20user-read-email&state=34fFs29kd09
        // http://localhost:3000/?code=AQA3Tokd56tHzvsYKZ1DM_4mt7TJf2ffQVbf0KGt8DzLOgqU3_ScuFhSHw2G6SAUqVJ6XEGv6OYBZFrCMIWiruWKkerksEgPC7viPnbT2QJtGiNpPnHqgWITIxQJzZkDeZWag5gIj9wDI5tnoqcNPpeW3aHcGuh-vs-0cpPNSHgio3wBbFTpVJbSwq-SLSEq42kIYBHhWTgoTDoKp4QcK8Xxqk0i7vaMMGHmNJ7XCw&state=34fFs29kd09
        // curl --data "code=AQA3Tokd56tHzvsYKZ1DM_4mt7TJf2ffQVbf0KGt8DzLOgqU3_ScuFhSHw2G6SAUqVJ6XEGv6OYBZFrCMIWiruWKkerksEgPC7viPnbT2QJtGiNpPnHqgWITIxQJzZkDeZWag5gIj9wDI5tnoqcNPpeW3aHcGuh-vs-0cpPNSHgio3wBbFTpVJbSwq-SLSEq42kIYBHhWTgoTDoKp4QcK8Xxqk0i7vaMMGHmNJ7XCw&state=34fFs29kd09" --data "client_id=70eb7c70c4ef4cb89aefbbd3eee34872" --data "client_secret=1fae87d81d4f42baae2d88e53af460c5" --data "redirect_uri=http://localhost:3000" --data "grant_type=authorization_code" https://accounts.spotify.com/api/token
        // {"access_token":"BQANg0wu68OcusUkpq5rwBE9aLdSLnqNPoaX_-Ed5iFjY7jlXuLdI5kjfKe4DZfRPiIZL0aM2BVYEbZKmLdtmVOmw1ovOYKLb1oDMxLb16cdBsdBqhAFNMjkUZuzK_lycCJr5LCWBKEQugeK5qD24C002EbC","token_type":"Bearer","expires_in":3600,"refresh_token":"AQCDZGMb2BMCtevtvxlzhTWyi5aEOD7q2Fmn9PYj2qwF9aTskCVqEpzMGk-0F95LJj2RKkZXerYBIygdXRaOKK-eDWOUGX7-R1avZ4QXiXabUshpEDWMHbp8U4OU5MXZ9ew","scope":"user-read-email user-read-private"}
    };

    get height(): number {
        return this._height;
    }
    get width(): number {
        return this._width;
    }
    get camera(): THREE.PerspectiveCamera {
        return this._camera;
    }
    get renderer(): THREE.WebGLRenderer {
        return this._renderer;
    }
    get stage(): THREE.Scene {
        return this._stage;
    }
}
