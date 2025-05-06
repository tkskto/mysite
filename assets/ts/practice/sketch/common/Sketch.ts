import {watch} from 'vue';
import type ISketch from './ISketch';
import {useQuoteText} from '~/composables/useQuoteText';
import {useMusicMode} from '~/composables/useMusicMode';
import {usePracticeScene} from '~/composables/usePracticeScene';
import {usePracticeId} from '~/composables/usePracticeId';

const {updateQuoteText} = useQuoteText();
const {updateMusicMode} = useMusicMode();
const {practiceScene} = usePracticeScene();
const {practiceId} = usePracticeId();

/**
 * 各スケッチが継承する基底クラス
 */
export class Sketch implements ISketch {
    private _setuped = false;
    private _isPlaying = false;
    private _quote: string;
    public _ready = false;
    public _timer!: number;
    public _id: string;

    constructor(_id: string, _quote = '') {
        this._id = _id;
        this._quote = _quote;
        watch(practiceId, this.onStateChanged);
    }

    private onStateChanged = (): void => {
        this._ready = false;

        if (practiceScene.value === 'sketch') {
            // 初期化
            if (practiceId.value === this._id && !this._setuped && !this._isPlaying) {
                updateMusicMode(false);
                this.setup();
                this._setuped = true;
                updateQuoteText(this._quote);
            // 再生
            } else if (practiceId.value === this._id && !this._isPlaying) {
                this.play();
            // 破棄
            } else if (practiceId.value !== this._id && this._isPlaying) {
                this._setuped = false;
                this.dispose();
            }
        } else if (practiceScene === 'top') {
            this._setuped = false;
            this.dispose();
        } else if (practiceScene === 'pause') {
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
