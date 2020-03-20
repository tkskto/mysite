import { Event, EventDispatcher } from '~/assets/ts/common/events/EventDispatcher';

export default class ImageLoader extends EventDispatcher {

    public static IMAGE_LOADED = 'imageLoaded';
    public static LOAD_COMPLETE = 'loadComplete';

    private _count: number;
    private _loadedCount = 0;
    private _src: string[] = [];
    private _img: HTMLImageElement[] = [];

    constructor(_src: string[]) {
        super();
        this._src = _src;
        this._count = _src.length;
    }

    public load() {
        this._loadedCount = 0;

        for (let i = 0; i < this._count; i++) {
            const img: HTMLImageElement = new Image();
            img.onload = this.onFileLoaded;
            img.src = this._src[i];
        }
    }

    private onFileLoaded = (e) => {
        const event = new Event(ImageLoader.IMAGE_LOADED);
        event.currentTarget = this;
        this.dispatchEvent(event);

        this._loadedCount++;
        this._img.push(e.target);

        if (this._count === this._loadedCount) {

            this.onLoadComplete();
        }
    };

    private onLoadComplete = () => {
        this.dispatchEvent(ImageLoader.LOAD_COMPLETE);
    };

    get img(): HTMLImageElement[] {
        return this._img;
    }
}
