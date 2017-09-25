import {Model} from '../Model';

export class SVGController {
    constructor(private _elm:SVGElement, private _model:Model) {
        this._model.addEventListener(Model.EVENT_SCENE_CHANGE, this.sceneChanged);
        this._elm.classList.remove('show');
    }

    public show = () => {
        this._elm.addEventListener('transitionend', this.transitionEnd);
        this._elm.classList.add('show');
    };

    private sceneChanged = () => {
        if (this._model.scene === Model.SCENE_FIRST) {
            this._model.removeEventListener(Model.EVENT_SCENE_CHANGE, this.sceneChanged);
        }
    };

    private transitionEnd = (e) => {
        if (this._model.scene === Model.SCENE_LOAD) {
            this._elm.classList.add('hide');
            this._model.scene = Model.SCENE_INTRO;
        } else if (this._model.scene === Model.SCENE_INTRO) {
            this._model.scene = Model.SCENE_FIRST;
        }
    }
}