export class GLConfig {
    public static UNIFORM_TYPE_MATRIX4 = 'matrix4fv';
    public static UNIFORM_TYPE_MATRIX3 = 'matrix3fv';
    public static UNIFORM_TYPE_MATRIX2 = 'matrix2fv';
    public static UNIFORM_TYPE_VECTOR4 = '4fv';
    public static UNIFORM_TYPE_VECTOR3 = '3fv';
    public static UNIFORM_TYPE_VECTOR2 = '2fv';
    public static UNIFORM_TYPE_VECTOR1 = '1fv';
    public static UNIFORM_TYPE_FLOAT = '1f';
    public static UNIFORM_TYPE_INT_VECTOR = '1iv';
    public static UNIFORM_TYPE_INT = '1i';
    public static UNIFORM_TYPE_TEXTURE = 'texture';

    public static DRAW_TYPE_POINT = 'point';
    public static DRAW_TYPE_LINE = 'line';
    public static DRAW_TYPE_LINE_STRIP = 'line_strip';
    public static DRAW_TYPE_LINE_LOOP = 'line_loop';
    public static DRAW_TYPE_TRIANGLE = 'triangle';
    public static DRAW_TYPE_TRIANGLE_STRIP = 'triangle_strip';
    public static DRAW_TYPE_TRIANGLE_FAN = 'triangle_fan';
}

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

    public static SCENE_TOP = 'sceneTop';
    public static SCENE_SKETCH = 'sceneSketch';
    public static SCENE_PAUSE = 'scenePause';
}
