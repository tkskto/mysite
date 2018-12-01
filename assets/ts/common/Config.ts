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
    public static SCENE = {
        LOAD: 'load',
        INTRO: 'intro',
        FIRST: 'first',
        SECOND: 'second'
    };

    public static CLASSNAME = {
        show: 'is-show',
        hide: 'is-hide',
        delete: 'will-delete',
    };

    public static URLS = {
        MICRO_ANIMATION_PATH: '/assets/microAnimations/data/list.json'
    };

    public static CATEGORY = {
        ALL: 'all',
        SAUNA: 'sauna',
        TECH: 'tech'
    };
}
