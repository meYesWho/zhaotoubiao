import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sso_sessionid: '',
    count: 0,
    userName: '',
    userInfo: '',
  },
  getters: {
    testFn: function (state) {
      return state.count
    }
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    assignmentSSO(state, id) {
      state.sso_sessionid = id;
    },
    userName(state, name) {
      state.userName = name;
    },
    userInfo(state, params) {
      state.userInfo = params
    },

  }
})