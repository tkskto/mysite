import {AppConfig} from '../Config';

export class ViewChangeBtn {

    private _vs: HTMLParagraphElement;
    private _fs: HTMLParagraphElement;
    private _isShow = false;
    private _unWatchStateChangeEvent;

    constructor(private _store: any, private _elm: HTMLButtonElement, private _wrapper: HTMLDivElement) {
        this._vs = _wrapper.querySelector('.shader--vs') as HTMLParagraphElement;
        this._fs = _wrapper.querySelector('.shader--fs') as HTMLParagraphElement;
        this.init();
    }

    private init = () => {
        this._elm.addEventListener('click', this.onClick);

        this._unWatchStateChangeEvent = this._store.watch(AppConfig.ON_STATE_CHANGED, this.reset);
    };

    private onClick = () => {
        const txtVSString: string = this._store.getters.vertexShaderString;
        const txtFSString: string = this._store.getters.fragmentShaderString;
        this._vs.innerHTML = txtVSString.replace(/\n/g, '<br>').replace(/\s{20}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        this._fs.innerHTML = txtFSString.replace(/\n/g, '<br>').replace(/\s{20}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

        if (this._isShow) {
            document.body.classList.remove('show-shader');

            setTimeout(() => {
                document.body.classList.remove('pre-show');
            }, 300);

            this._elm.textContent = 'GLSL';
        } else {
            document.body.classList.add('pre-show');

            setTimeout(() => {
                document.body.classList.add('show-shader');
            }, 100);

            this._elm.textContent = 'PLAY';
        }
        this._isShow = !this._isShow;
    };

    public unWatch = () => {
        if (this._unWatchStateChangeEvent) {
            this._unWatchStateChangeEvent();
        }
    };

    private reset = () => {
        document.body.classList.remove('show-shader');
        document.body.classList.remove('pre-show');
        this._isShow = false;
        this._elm.textContent = 'GLSL';
    }
}
