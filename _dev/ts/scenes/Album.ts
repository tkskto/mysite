import {Model} from '../Model';
import * as THREE from 'three';

export class Album {

    private isShow:boolean;

    constructor (private _model:Model){
        this.init();
    }

    private init = () => {
        this._model.addEventListener(Model.EVENT_SCENE_CHANGE, this.onSceneChange);
    };

    private onSceneChange = () => {
        const scene:string = this._model.scene;

        if (scene === Model.SCENE_ALBUM) {
            setTimeout(() => {
                this.show();
            }, 500);
        } else if (this.isShow) {
            this.hide();
        }
    };

    private show = () => {};

    private hide = () => {}

}
