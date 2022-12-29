import AppConfig from '~/assets/ts/practice/Config.ts';

const state =() => ({
    scene: '',
    id: '',
});
const getters = {
    getScene: (_state) => _state.scene,
    id: (_state) => _state.id,
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
};
const actions = {
    changeScene({commit}, _name) {
        commit('CHANGE_SCENE', _name);
    },
    changeID({commit}, _id) {
        commit('CHANGE_ID', _id);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
