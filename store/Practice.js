import {AppConfig} from '~/assets/ts/practice/Config';

const state =() => ({
    scene: '',
    id: '',
    cameraPosition: null,
    quote: '',
    vertexShaderString: '',
    fragmentShaderString: '',
    isMusicMode: false,
    musicPlayState: false,
});
const getters = {
    getScene: (_state) => _state.scene,
    id: (_state) => _state.id,
    cameraPosition: (_state) => _state.cameraPosition,
    quote: (_state) => _state.quote,
    vertexShaderString: (_state) => _state.vertexShaderString,
    fragmentShaderString: (_state) => _state.fragmentShaderString,
    isMusicMode: (_state) => _state.isMusicMode,
    musicPlayState: (_state) => _state.musicPlayState,
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
    SET_MUSIC_MODE(_state, _mode) {
        _state.isMusicMode = _mode;
    },
    SET_MUSIC_PLAY_STATE(_state, _flg) {
        _state.musicPlayState = _flg;
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
    setMusicMode({commit}, _mode) {
        commit('SET_MUSIC_MODE', _mode);
    },
    setMusicPlayState({commit}, _flg) {
        commit('SET_MUSIC_PLAY_STATE', _flg);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
