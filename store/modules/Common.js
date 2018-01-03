const state = {
    sceneName: ''
};
const getters = {
    sceneName: (_state) => _state.sceneName
};
const mutations = {
    CHANGE_SCENE(_state, _scene) {
        _state.sceneName = _scene;
    }
};
const actions = {
    changeScene({commit}, _scene) {
        commit('CHANGE_SCENE', _scene);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
};
