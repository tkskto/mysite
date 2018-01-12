import {CustomCamera} from '~/assets/ts/Camera/CustomCamera';

// TODO: コメント

export class CustomPerspectiveCamera extends CustomCamera {

    constructor(public _canvas:HTMLCanvasElement, public fov?: number, public aspect?: number, public near?: number, public far?: number) {
        super(_canvas, fov, aspect, near, far);
    }

    private onMouseDown = (e:MouseEvent) => {
        e.preventDefault();
        this.mouseStart.x = e.screenX;
        this.mouseStart.y = e.screenY;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };

    private onMouseMove = (e:MouseEvent) => {
        this.moveFlg = true;
        this.subtract = this.mouseStart.subtract(e.screenX, e.screenY);
    };

    private onMouseUp = (e:MouseEvent) => {
        e.preventDefault();
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.subtract.x = 0;
        this.subtract.y = 0;
    };

    public setEvent = () => {
        document.addEventListener('mousedown', this.onMouseDown);
    };

    public removeEvent = () => {
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    };

    public update = () => {
        this.angle.x += this.subtract.x * 0.0001;
        this.angle.y -= this.subtract.y * 0.0001;
        if(this.angle.y > this.maxY) {
            this.angle.y = this.maxY;
        } else if(this.angle.y < this.minY) {
            this.angle.y = this.minY;
        }
        this.rotation.set(0, -this.angle.x, 0);
        this.camera.rotation.set(this.angle.y, 0, 0);
    };

    public dispose = () => {
        this.removeEvent();
    }
}
