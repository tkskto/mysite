export class AppConfig {
    public static ON_RESIZE_EVENT = (state, getters) => {
        return state.Common.screenSize.width;
    };
    public static ON_STATE_CHANGED = (state) => {
        return state.Practice.scene;
    };
    public static ON_SKETCH_CHANGED = (state) => {
        return state.Practice.id;
    };
    public static ON_CODE_STATE_CHANGED = (state, getters) => {
        return state.Practice.id;
    };
    public static ON_CAMERA_STATE_CHANGED = (state, getters) => {
        return state.Practice.cameraPosition;
    };
    public static ON_CHANGE_QUOTE_TEXT = (state, getters) => {
        return state.Practice.quote;
    };
    public static ON_MOUSE_STATE_CHANGED = (state, getters) => {
        return state.Practice.mouseState;
    };
    public static ON_MUSIC_STATE_CHANGED = (state, getters) => {
        return state.Practice.musicPlayState;
    };

    public static SCENE_TOP = 'sceneTop';
    public static SCENE_SKETCH = 'sceneSketch';
    public static SCENE_PAUSE = 'scenePause';
}
