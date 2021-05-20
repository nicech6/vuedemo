import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected_reason: {},
    reason_list: []
  },
  mutations: {
    selectReason(state, reason) {
      state.selected_reason = reason;
    },
    setReasonList(state, reasonList) {
      state.reason_list = reasonList;
    }
  }
});
