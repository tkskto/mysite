const state = {
    items: [],
    showDialog: false,
};

const getters = {
    getAllItemData: (_state) => _state.items,
    dialogState: (_state) => _state.showDialog,
};

const mutations = {
    SET_ALL_ITEMS(_state, _items) {
        _state.items = _items;
    },
    CHANGE_DIALOG_STATE(_state, _flg) {
        _state.showDialog = _flg;
    }
};

const actions = {
    setAllItems({commit}, _items) {
        commit('SET_ALL_ITEMS', _items);
    },
    changeDialogState({commit}, _flg) {
        commit('CHANGE_DIALOG_STATE', _flg);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}
