const state = {
    Araz: {
        images: 9,
        movies: 3
    },
    currentAlbumName: 'Araz'
};
const getters = {
    getCurrentAlbumData: (_state) => _state[_state.currentAlbumName]
};
const mutations = {
    CHANGE_ALBUM(_state, _name) {
        _state.currentAlbumName = _name;
    }
};
const actions = {
    changeAlbum({commit}, _name) {
        commit('CHANGE_ALBUM', _name);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
