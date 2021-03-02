import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemData: null,
    appeal_category_list: [],
    trial_res_list: [],
    win_open: false
  },
  getters: {
    getItemData: state => state.itemData,
    getAppealCategoryList: state => state.appeal_category_list,
    getWinOpen: state => state.win_open,
    getTrialList: state => state.trial_res_list
  },
  mutations: {
    SETITEMDATA: (state, data) => {
      state.itemData = data;
    },
    SETAPPEALLIST: (state, list) => {
      state.appeal_category_list = list
    },
    SETWINSLIP: (state, data) => {
      state.win_open = data
    },
    SETTRIALLIST: (state, list) => {
      state.trial_res_list = list
    }
  },
  actions: {
    setItemData({ commit }, data) {
      commit('SETITEMDATA', data)
    },
    setAppealList({ commit }, list) {
      commit('SETAPPEALLIST', list)
    },
    setWinSlip({ commit }, list) {
      commit('SETWINSLIP', list)
    },
    setTrialList({ commit }, list) {
      commit('SETTRIALLIST', list)
    }
  }
})

export default store
