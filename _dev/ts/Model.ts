///<reference path="./events/EventDispatcher.ts" />

module model {
    export class Model extends events.EventDispatcher {

        public static EVENT_RESIZE:string = 'resizeEvent';
        public static EVENT_SCENE_CHANGE:string = 'sceneChangeEvent';

        public static SCENE_LOAD:string = 'sceneLoad';
        public static SCENE_INTRO:string = 'sceneIntro';
        public static SCENE_FIRST:string = 'First';

        constructor() {
            super();
        }

        private _screen:{width:number, height:number};

        get screen(): { width: number; height: number } {
            return this._screen;
        }

        set screen(value: { width: number; height: number }) {
            this._screen = value;
            this.dispatchEvent(Model.EVENT_RESIZE);
        }

        private _scene:string = Model.SCENE_LOAD;

        get scene(): string {
            return this._scene;
        }

        set scene(value: string) {
            this._scene = value;
            this.dispatchEvent(Model.EVENT_SCENE_CHANGE);
        }

    }
}