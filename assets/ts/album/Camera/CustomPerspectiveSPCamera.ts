import CustomCamera from './CustomCamera';

export default class CustomPerspectiveSPCamera extends CustomCamera {
    constructor(public _canvas: HTMLCanvasElement, public fov?: number, public aspect?: number, public near?: number, public far?: number) {
        super(_canvas, fov, aspect, near, far);
    }

    private onTouchStart = (e: TouchEvent): void => {
        e.preventDefault();
        const touchObj: Touch = e.changedTouches[0];
        this.mouseStart.x = touchObj.pageX;
        this.mouseStart.y = touchObj.pageY;
        this._canvas.addEventListener('touchmove', this.onTouchMove);
        this._canvas.addEventListener('touchend', this.onTouchUp);
        this._canvas.addEventListener('touchcancel', this.onTouchUp);
    };

    private onTouchMove = (e: TouchEvent): void => {
        e.preventDefault();
        const touchObj: Touch = e.changedTouches[0];
        this.moveFlg = true;
        this.subtract = this.mouseStart.subtract(touchObj.pageX, touchObj.pageY);
    };

    private onTouchUp = (e: TouchEvent): void => {
        e.preventDefault();
        this._canvas.removeEventListener('touchmove', this.onTouchMove);
        this._canvas.removeEventListener('touchend', this.onTouchUp);
        this._canvas.removeEventListener('touchcancel', this.onTouchUp);
        this.subtract.x = 0;
        this.subtract.y = 0;
        this.subtract.reset();
    };

    public setEvent = (): void => {
        this._canvas.addEventListener('touchstart', this.onTouchStart);
        document.addEventListener('touchstart', this.preventScroll, false);
    };

    private preventScroll = (e: TouchEvent): void => {
        const target: HTMLElement = e.target as HTMLElement;
        if (target.nodeName === 'CANVAS' || target.nodeName === 'BUTTON') {
            e.stopPropagation();
        } else {
            e.preventDefault();
        }
    };

    public removeEvent = (): void => {
        this._canvas.removeEventListener('touchstart', this.onTouchStart);
        this._canvas.removeEventListener('touchmove', this.onTouchMove);
        this._canvas.removeEventListener('touchend', this.onTouchUp);
        this._canvas.removeEventListener('touchcancel', this.onTouchUp);
        document.removeEventListener('touchstart', this.preventScroll, false);
    };

    public update = (): void => {
        this.angle.x += this.subtract.x * 0.0001;
        this.angle.y -= this.subtract.y * 0.0001;

        if (this.angle.y > this.maxY) {
            this.angle.y = this.maxY;
        } else if (this.angle.y < this.minY) {
            this.angle.y = this.minY;
        }

        this.rotation.set(0, -this.angle.x, 0);
        this.camera.rotation.set(this.angle.y, 0, 0);
    };
    public dispose = (): void => {
        this.removeEvent();
    }
}
