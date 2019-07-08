import {AppConfig} from '~/assets/ts/practice/Config';

const state =() => ({
    scene: '',
    id: '',
    cameraPosition: null,
    quote: '',
    vertexShaderString: '',
    fragmentShaderString: '',
});
const getters = {
    getScene: (_state) => _state.scene,
    id: (_state) => _state.id,
    cameraPosition: (_state) => _state.cameraPosition,
    quote: (_state) => _state.quote,
    vertexShaderString: (_state) => _state.vertexShaderString,
    fragmentShaderString: (_state) => _state.fragmentShaderString,
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
};

export default {
    state,
    getters,
    mutations,
    actions
};
