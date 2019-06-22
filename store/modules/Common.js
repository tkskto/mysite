const state = {
    sceneName: 'load',
    screenSize: {width: 0, height: 0},
    canvasSize: {width: 0, height: 0},
    ratio: 1,
    mouseState: false,
    mousePosition: { x: 0, y: 0},
};
const getters = {
    sceneName: (_state) => _state.sceneName,
    screenSize: (_state) => _state.screenSize,
    canvasSize: (_state) => _state.canvasSize,
    ratio: (_state) => _state.ratio,
    mouseState: (_state) => _state.mouseState,
    mousePosition: (_state) => _state.mousePosition,
};
const mutations = {
    CHANGE_SCENE(_state, _scene) {
        _state.sceneName = _scene;
    },
    SET_SCREEN_SIZE(_state, _size) {
        if (_size.width) {
            _state.screenSize.width = _size.width;
        }

        if (_size.height) {
            _state.screenSize.height = _size.height;
        }
    },
    SET_CANVAS_SIZE(_state, _size) {
        if (_size.width) {
            _state.canvasSize.width = _size.width * _state.ratio;
        }

        if (_size.height) {
            _state.canvasSize.height = _size.height * _state.ratio;
        }
    },
    RESIZE(_state, _size) {
        const screenSize = {
            width: _state.screenSize.width,
            height: _state.screenSize.height,
        };
        const canvasSize = {
            width: _state.canvasSize.width,
            height: _state.canvasSize.height,
        };

        if (_size.width) {
            screenSize.width = _size.width;
            canvasSize.width = _size.width * _state.ratio;
        }

        if (_size.height) {
            screenSize.height = _size.height;
            canvasSize.height = _size.height * _state.ratio;
        }

        _state.screenSize = screenSize;
        _state.canvasSize = canvasSize;
    },
    SET_RATIO(_state, _ratio) {
        _state.ratio = _ratio;
    },
    SET_MOUSE_STATE(_state, _flg) {
        _state.mouseState = _flg;
    },
    SET_MOUSE_POS(_state, _pos) {
        _state.mousePosition = _pos;
    },
};
const actions = {
    changeScene({commit}, _scene) {
        commit('CHANGE_SCENE', _scene);
    },
    setScreenSize({commit}, _size) {
        commit('SET_SCREEN_SIZE', _size);
    },
    setCanvasSize({commit}, _size) {
        commit('SET_CANVAS_SIZE', _size);
    },
    resize({commit}, _size) {
        commit('RESIZE', _size);
    },
    setRatio({commit}, _ratio) {
        commit('SET_RATIO', _ratio);
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
