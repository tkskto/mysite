const state = {
    sceneName: 'load',
    screenSize: {width: 0, height: 0},
    canvasSize: {width: 0, height: 0},
    ratio: 1,
};
const getters = {
    sceneName: (_state) => _state.sceneName,
    screenSize: (_state) => _state.screenSize,
    canvasSize: (_state) => _state.canvasSize,
    ratio: (_state) => _state.ratio,
};
const mutations = {
    CHANGE_SCENE(_state, _scene) {
        _state.sceneName = _scene;
    },
    RESIZE(_state, _size) {
        if (_size.width) {
            _state.screenSize.width = _size.width;
            _state.canvasSize.width = _size.width * _state.ratio;
        }

        if (_size.height) {
            _state.screenSize.height = _size.height;
            _state.canvasSize.height = _size.height * _state.ratio;
        }
    },
    SET_RATIO(_state, _ratio) {
        _state.ratio = _ratio;
    }
};
const actions = {
    changeScene({commit}, _scene) {
        commit('CHANGE_SCENE', _scene);
    },
    resize({commit}, _size) {
        commit('RESIZE', _size);
    },
    setRatio({commit}, _ratio) {
        commit('SET_RATIO', _ratio);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
