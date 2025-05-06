export const GLConfig = {
    UNIFORM_TYPE_MATRIX4: 'matrix4fv',
    UNIFORM_TYPE_MATRIX3: 'matrix3fv',
    UNIFORM_TYPE_MATRIX2: 'matrix2fv',
    UNIFORM_TYPE_VECTOR4: '4fv',
    UNIFORM_TYPE_VECTOR3: '3fv',
    UNIFORM_TYPE_VECTOR2: '2fv',
    UNIFORM_TYPE_VECTOR1: '1fv',
    UNIFORM_TYPE_FLOAT: '1f',
    UNIFORM_TYPE_INT_VECTOR: '1iv',
    UNIFORM_TYPE_INT: '1i',
    UNIFORM_TYPE_TEXTURE: 'texture',
    UNIFORM_TYPE_AUDIO_TEXTURE: 'audioTexture',

    DRAW_TYPE_POINT: 'point',
    DRAW_TYPE_LINE: 'line',
    DRAW_TYPE_LINE_STRIP: 'line_strip',
    DRAW_TYPE_LINE_LOOP: 'line_loop',
    DRAW_TYPE_TRIANGLE: 'triangle',
    DRAW_TYPE_TRIANGLE_STRIP: 'triangle_strip',
    DRAW_TYPE_TRIANGLE_FAN: 'triangle_fan',
};

export const AppConfig = {
    SCENE: {
        LOAD: 'load',
        INTRO: 'intro',
        FIRST: 'first',
        READY: 'ready',
    },
    CLASSNAME: {
        show: 'is-show',
        hide: 'is-hide',
        delete: 'will-delete',
    },
    URLS: {
        MICRO_ANIMATION_PATH: '/assets/microAnimations/data/list.json'
    },
    CATEGORY: {
        ALL: 'all',
        SAUNA: 'sauna',
        TECH: 'tech'
    },
};
