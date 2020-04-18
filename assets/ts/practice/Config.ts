import Vector from "~/assets/ts/common/gl/Vector";

export default class AppConfig {
    public static ON_RESIZE_EVENT = (state): number => {
        return state.Common.screenSize.width;
    };
    public static ON_STATE_CHANGED = (state): string => {
        return state.Practice.scene;
    };
    public static ON_SKETCH_CHANGED = (state): string => {
        return state.Practice.id;
    };
    public static ON_CODE_STATE_CHANGED = (state): string => {
        return state.Practice.id;
    };
    public static ON_CAMERA_STATE_CHANGED = (state): Vector => {
        return state.Practice.cameraPosition;
    };
    public static ON_CHANGE_QUOTE_TEXT = (state): string => {
        return state.Practice.quote;
    };
    public static ON_MOUSE_STATE_CHANGED = (state): boolean => {
        return state.Common.mouseState;
    };
    public static ON_MUSIC_STATE_CHANGED = (state): boolean => {
        return state.Practice.musicPlayState;
    };

    public static SCENE_TOP = 'sceneTop';
    public static SCENE_SKETCH = 'sceneSketch';
    public static SCENE_PAUSE = 'scenePause';
}
