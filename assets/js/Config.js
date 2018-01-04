import modules from "../../store/modules/index";

modules.exports = {
    SCENE: {
        LOAD: 'load',
        INTRO: 'intro',
        FIRST: 'first',
    },
    GLConfig: {
        UNIFORM_TYPE_MATRIX4: 'matrix4fv',
        UNIFORM_TYPE_MATRIX3: 'matrix3fv',
        UNIFORM_TYPE_MATRIX2: 'matrix2fv',
        UNIFORM_TYPE_VECTOR4: '4fv',
        UNIFORM_TYPE_VECTOR3: '3fv',
        UNIFORM_TYPE_VECTOR2: '2fv',
        UNIFORM_TYPE_VECTOR1: '1fv',
        UNIFORM_TYPE_FLOAT: '1f',
        UNIFORM_TYPE_INT_VECTOR: '1iv',
        UNIFORM_TYPE_INT: '1i'
    }
};

