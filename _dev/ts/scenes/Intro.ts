import {Model} from '../Model';
import {SVGController} from '../svg/SVGController';

export class Intro {

    private _who: SVGElement;
    private isShow:boolean = false;

    constructor(private _model:Model) {
        this.init();
    }

    private init = () => {
        this._who = document.querySelector('.mv-svg') as SVGElement;

        this._model.addEventListener(Model.EVENT_SCENE_CHANGE, this.onSceneChanged);
    };

    private onSceneChanged = () => {
        const scene:string = this._model.scene;

        if (scene === Model.SCENE_INTRO) {
            this.isShow = true;
            this.show();
        } else if(this.isShow) {
            this.hide();
        }
    };

    private show = () => {
        let _svg:SVGController = new SVGController(this._who);
        _svg.addEventListener(SVGController.TRANSITION_END_EVENT, this.onCompleteAnimation);
        _svg.show();
    };

    private onCompleteAnimation = () => {
        this._model.scene = Model.SCENE_FIRST;
    };

    private hide = () => {}
}
