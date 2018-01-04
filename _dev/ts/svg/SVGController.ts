import {Model} from '../Model';
import {EventDispatcher} from '../events/EventDispatcher';

export class SVGController extends EventDispatcher {

    public static TRANSITION_END_EVENT: string = 'transitionEnd';

    constructor(private _elm:SVGElement) {
        super();
        this._elm.classList.remove('show');
    }

    public show = () => {
        this._elm.addEventListener('transitionend', this.transitionEnd);
        this._elm.classList.add('show');
    };

    private transitionEnd = () => {
        if (!this._elm.classList.contains('hide')) {
            this._elm.classList.add('hide');
        } else {
            this._elm.removeEventListener('transitionend', this.transitionEnd);
            this.dispatchEvent(SVGController.TRANSITION_END_EVENT);
        }
    }

}
