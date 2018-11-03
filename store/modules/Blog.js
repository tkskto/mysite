const state = {
    articleID: null,
    currentCategory: 'all'
};
const getters = {
    currentArticleID: (_state) => _state.articleID,
    currentCategory: (_state) => _state.currentCategory,
};
const mutations = {
    CHANGE_ARTICLE(_state, _id) {
        _state.articleID = _id;
    },
    CHANGE_CATEGORY(_state, _category) {
        _state.currentCategory = _category;
    },
};
const actions = {
    changeArticleID({commit}, _id) {
        commit('CHANGE_ARTICLE', _id);
    },
    changeCategory({commit}, _category) {
        commit('CHANGE_CATEGORY', _category);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
