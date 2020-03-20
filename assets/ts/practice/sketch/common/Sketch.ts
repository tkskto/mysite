import ISketch from './ISketch';
import AppConfig from '../../Config';

/**
 * 各スケッチが継承する基底クラス
 */
export default class Sketch implements ISketch {

    private _setuped = false;
    private _isPlaying = false;
    private _quote: string;
    public _ready = false;
    public _timer: number;
    public _id: string;

    constructor(public _store: any, _id: string, _quote = '') {
        _store.watch(AppConfig.ON_SKETCH_CHANGED, this.onStateChanged);
        this._id = _id;
        this._quote = _quote;
    }

    private onStateChanged = () => {
        this._ready = false;
        const store = this._store.getters;
        const scene = store['Practice/getScene'];
        const id = store['Practice/id'];

        if (scene === AppConfig.SCENE_SKETCH) {
            // 初期化
            if (id === this._id && !this._setuped && !this._isPlaying) {
                this._store.commit('Common/SET_MOUSE_STATE', false);
                this._store.commit('Practice/SET_MUSIC_MODE', false);
                this.setup();
                this._setuped = true;
                this._store.commit('Practice/SET_QUOTE_TEXT', this._quote);
            // 再生
            } else if (id === this._id && !this._isPlaying) {
                this.play();
            // 破棄
            } else if (id !== this._id && this._isPlaying) {
                this._setuped = false;
                this.dispose();
            }
        } else if (scene === AppConfig.SCENE_TOP) {
            this._setuped = false;
            this.dispose();
        } else if (scene === AppConfig.SCENE_PAUSE) {
            this.pause();
        }
    };

    // private onCodeStateChanged = () => {};

    replay(): void {
        this._setuped = false;
        this.dispose();
        this.play();
    }

    play(): void {
        document.body.setAttribute('class', '');
        document.body.classList.add(`id-${this._id}`);
        this._timer = requestAnimationFrame(this.update);
        this._isPlaying = true;
    }

    pause(): void {
        if (this._timer) {
            cancelAnimationFrame(this._timer);
            this._timer = 0;
        }
        this._isPlaying = false;
    }

    public setup = (): void => {
        throw new Error('please implement sub class');
    };

    public dispose = (): void => {
        throw new Error('please implement sub class');
    };

    public update = (): void => {
        throw new Error('please implement sub class');
    };

    get timer(): number {
        return this._timer;
    }

    get quote(): string {
        return this._quote;
    }
}
