const state = {
    sceneName: 'load',
    screenSize: {width: 0, height: 0}
};
const getters = {
    sceneName: (_state) => _state.sceneName,
    screenSize: (_state) => _state.screenSize
};
const mutations = {
    CHANGE_SCENE(_state, _scene) {
        _state.sceneName = _scene;
    },
    RESIZE(_state, _size) {
        _state.screenSize = _size;
    }
};
const actions = {
    changeScene({commit}, _scene) {
        commit('CHANGE_SCENE', _scene);
    },
    resize({commit}, _size) {
        commit('RESIZE', _size);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
