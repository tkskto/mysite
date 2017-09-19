module svg {
    export class SVGController {
        constructor(private _elm:SVGElement, private _model:model.Model) {
            this._model.addEventListener(model.Model.EVENT_SCENE_CHANGE, this.sceneChanged);
            this._elm.classList.remove('show');
            console.log(this._elm.classList);
        }

        public show = () => {
            this._elm.addEventListener('transitionend', this.transitionEnd);
            this._elm.classList.add('show');
        };

        private sceneChanged = () => {
            if (this._model.scene === model.Model.SCENE_FIRST) {
                // this._elm.classList.add('hide');
                this._model.removeEventListener(model.Model.EVENT_SCENE_CHANGE, this.sceneChanged);
            }
        };

        private transitionEnd = (e) => {
            // start intro
            this._model.scene = model.Model.SCENE_FIRST;
        }
    }
}