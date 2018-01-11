import * as THREE from 'three';
import {Point} from '~/assets/ts/datatype/Point';

// TODO: コメント

export class CustomCamera extends THREE.Object3D {

    public _camera: THREE.PerspectiveCamera;
    public RAD:number = Math.PI / 180;
    public mouseStart:Point = new Point(0,0);
    public subtract:Point = new Point(0,0);
    public frontPoint:Point = new Point(0,0);
    public angle:Point = new Point(0,0);
    public moveFlg:boolean = false;
    public maxY:number;
    public minY:number;

    constructor(public _canvas:HTMLCanvasElement, public fov?: number, public aspect?: number, public near?: number, public far?: number) {
        super();
        this.init();
    }
    private init = () => {
        this._camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.add(this._camera);
        this._camera.lookAt(new THREE.Vector3(0,0,0));
        this.maxY = this.changeToRad(90);
        this.minY = this.changeToRad(-90);
    };
    /**
     * 正面に戻す
     */
    public reset = () => {
        if(!this.moveFlg) {
            return false;
        }
        this.angle.x = this.frontPoint.x;
        this.angle.y = 0;
        this.moveFlg = false;
    };
    public update = () => {};
    public setPosition = (_x:number, _y:number, _z:number) => {
        this._camera.position.set(_x, _y, _z);
    };
    public setRatio = (_ratio: number) => {
        this._camera.aspect = _ratio;
        this._camera.updateProjectionMatrix();
    };
    private changeToRad = (_degree:number):number => {
        return _degree * this.RAD;
    };
    get camera(): THREE.PerspectiveCamera {
        return this._camera;
    }
}
