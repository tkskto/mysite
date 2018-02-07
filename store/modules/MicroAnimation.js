const state = {
    animation: {},
    category: []
};
const getters = {
    getAnimation: (_state) => _state.animation,
    getCategory: (_state) => _state.category
};
const mutations = {
    SET_ANIMATION(_state, _animation) {
        _state.animation = _animation;
    }
};
const actions = {
    setAnimation({commit}, _animation) {
        commit('SET_ANIMATION', _animation);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
