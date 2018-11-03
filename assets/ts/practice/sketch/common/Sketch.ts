import { ISketch } from './ISketch';
import {AppConfig} from '../../Config';

/**
 * 各スケッチが継承する基底クラス
 */
export class Sketch implements ISketch {

    private _setuped = false;
    private _isPlaying = false;
    private _quote: string;
    public _timer: number;
    public _id: string;
    public _type: string;

    constructor(public _store: any, _id: string, _quote = '') {
        _store.watch(AppConfig.ON_STATE_CHANGED, this.onStateChanged);
        _store.watch(AppConfig.ON_SKETCH_CHANGED, this.onStateChanged);
        // _store.watch(AppConfig.ON_CODE_STATE_CHANGED, this.onCodeStateChanged);
        this._id = _id;
        this._quote = _quote;
    }

    private onStateChanged = () => {
        const store = this._store.getters;
        const scene = store.getScene;
        if (scene === AppConfig.SCENE_SKETCH) {
            if (store.id === this._id && !this._setuped && !this._isPlaying) {
                this._store.commit('SET_MOUSE_STATE', false);
                this.setup();
                this._setuped = true;
                if (this._quote) {
                    this._store.commit('SET_QUOTE_TEXT', this._quote);
                }
            } else if (store.id === this._id && !this._isPlaying) {
                this.play();
            } else if (store.id !== this._id && this._isPlaying) {
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
        document.body.classList.add(this._type);
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

    get type(): string {
        return this._type;
    }

    get timer(): number {
        return this._timer;
    }

    get quote(): string {
        return this._quote;
    }
}
