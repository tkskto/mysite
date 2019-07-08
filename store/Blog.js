const state =() => ({
    articleID: null,
    currentCategory: 'all',
    articles: [],
});
const getters = {
    allArticleData: (_state) => _state.articles,
    currentArticleID: (_state) => _state.articleID,
    currentCategory: (_state) => _state.currentCategory,
};
const mutations = {
    SET_ARTICLE_DATA(_state, _data) {
        _state.articles = _data;
    },
    CHANGE_ARTICLE(_state, _id) {
        _state.articleID = _id;
    },
    CHANGE_CATEGORY(_state, _category) {
        _state.currentCategory = _category;
    },
};
const actions = {
    setArticles({commit}, _data) {
        commit('SET_ARTICLE_DATA', _data);
    },
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