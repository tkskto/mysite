import {CustomCamera} from './CustomCamera';
const DeviceOrientationControls = require('three-device-orientation');

// TODO: コメント

export class CustomPerspectiveSPCamera extends CustomCamera {
    // private orientationCheck:HTMLInputElement;
    // private orientationFlg:boolean = false;
    private orientationController;
    constructor(public _canvas: HTMLCanvasElement, public fov?: number, public aspect?: number, public near?: number, public far?: number) {
        super(_canvas, fov, aspect, near, far);
        // this.orientationCheck = document.getElementById('chk-orientation') as HTMLInputElement;
        // this.orientationCheck.addEventListener('change', this.onOrientationChanged);
        // this.orientationController = new DeviceOrientationControls(this._camera, this._canvas);
        // this.orientationController.connect();
    }
    /**
     * ジャイロを検知するかどうかのフラグ管理
     */
        // private onOrientationChanged = () => {
        //     this.orientationFlg = this.orientationCheck.checked;
        //
        //     if(this.orientationFlg) {
        //         this._canvas.removeEventListener('touchstart', this.onTouchStart);
        //     } else {
        //         this._canvas.addEventListener('touchstart', this.onTouchStart);
        //     }
        // };
    private onTouchStart = (e: TouchEvent) => {
        const touchObj: Touch = e.changedTouches[0];
        this.mouseStart.x = touchObj.pageX;
        this.mouseStart.y = touchObj.pageY;
        document.addEventListener('touchmove', this.onTouchMove);
        document.addEventListener('touchend touchcancel', this.onTouchUp);
    };
    private onTouchMove = (e: TouchEvent) => {
        const touchObj: Touch = e.changedTouches[0];
        this.moveFlg = true;
        this.subtract = this.mouseStart.subtract(touchObj.pageX, touchObj.pageY);
    };
    private onTouchUp = (e: TouchEvent) => {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend touchcancel', this.onTouchUp);
        this.subtract.x = 0;
        this.subtract.y = 0;
        this.subtract.reset();
    };
    public setEvent = () => {
        document.addEventListener('touchstart', this.onTouchStart);
    };
    public removeEvent = () => {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend touchcancel', this.onTouchUp);
    };
    public update = () => {
        // スマホのジャイロセンサーを使うとき
        // if(this.orientationFlg) {
        //     this.orientationController.update();
        //
        // // タッチ操作を使うとき
        // } else {
        //
        //     this.angle.x += this.subtract.x * 0.0001;
        //     this.angle.y -= this.subtract.y * 0.0001;
        //
        //     if (this.angle.y > this.maxY) {
        //         this.angle.y = this.maxY;
        //     } else if (this.angle.y < this.minY) {
        //         this.angle.y = this.minY;
        //     }
        //
        //     this.rotation.set(0, -this.angle.x, 0);
        //     this.camera.rotation.set(this.angle.y, 0, 0);
        //
        //     if( this.tween_first || this.tween_stop || this.tween_reset ) {
        //         TWEEN.update();
        //     }
        // }

        this.angle.x += this.subtract.x * 0.0001;
        this.angle.y -= this.subtract.y * 0.0001;

        if (this.angle.y > this.maxY) {
            this.angle.y = this.maxY;
        } else if (this.angle.y < this.minY) {
            this.angle.y = this.minY;
        }

        this.rotation.set(0, -this.angle.x, 0);
        this.camera.rotation.set(this.angle.y, 0, 0);

        if (this.subtract.x === 0 && this.subtract.y === 0) {
            this.orientationController.update();
        }
    };
    public dispose = () => {
        this.removeEvent();
    }
}
