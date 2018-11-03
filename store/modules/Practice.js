import {AppConfig} from '~/assets/ts/practice/Config';

const state = {
    scene: '',
    id: '',
    cameraPosition: null,
    quote: '',
    vertexShaderString: '',
    fragmentShaderString: '',
    mouseState: false,
    mousePosition: { x: 0, y: 0},
};
const getters = {
    getScene: (_state) => _state.scene,
    id: (_state) => _state.id,
    cameraPosition: (_state) => _state.cameraPosition,
    quote: (_state) => _state.quote,
    vertexShaderString: (_state) => _state.vertexShaderString,
    fragmentShaderString: (_state) => _state.fragmentShaderString,
    mouseState: (_state) => _state.mouseState,
    mousePosition: (_state) => _state.mousePosition,
};
const mutations = {
    CHANGE_SCENE(_state, _scene) {
        _state.scene = _scene;
    },
    CHANGE_ID(_state, _id) {
        if (_id) {
            _state.id = _id;
            _state.scene = AppConfig.SCENE_SKETCH;
        } else {
            _state.scene = AppConfig.SCENE_TOP;
        }
    },
    SET_CAM_POSITION(_state, _pos) {
        _state.cameraPosition = _pos;
    },
    SET_QUOTE_TEXT(_state, _text) {
        _state.quote = _text;
    },
    SET_VS_TEXT(_state, _text) {
        _state.vertexShaderString = _text;
    },
    SET_FS_TEXT(_state, _text) {
        _state.fragmentShaderString = _text;
    },
    SET_MOUSE_STATE(_state, _flg) {
        _state.mouseState = _flg;
    },
    SET_MOUSE_POS(_state, _pos) {
        _state.mousePosition = _pos;
    },
};
const actions = {
    changeScene({commit}, _name) {
        commit('CHANGE_SCENE', _name);
    },
    changeID({commit}, _id) {
        commit('CHANGE_ID', _id);
    },
    setCameraPosition({commit}, _pos) {
        commit('SET_CAM_POSITION', _pos);
    },
    setQuoteText({commit}, _text) {
        commit('SET_QUOTE_TEXT', _text);
    },
    setVSText({commit}, _text) {
        commit('SET_VS_TEXT', _text);
    },
    setFSText({commit}, _text) {
        commit('SET_FS_TEXT', _text);
    },
    setMouseState({commit}, _flg) {
        commit('SET_MOUSE_STATE', _flg);
    },
    setMousePos({commit}, _pos) {
        commit('SET_MOUSE_POS', _pos);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
