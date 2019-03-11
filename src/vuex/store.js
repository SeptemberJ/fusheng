import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import { Notification } from 'element-ui'
// import * as types from './types.js'
// import router from '../router/index'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  userName: null,
  userCode: null,
  userId: null,
  pathName: null,
  btLoading: false,
  menuIdx: '1-1',
  moduleIdx: 1
}
// actions dispatch触发
const actions = {
  unitUserInfo ({commit, state}, Info) {
    commit('setUserInfo', Info)
  },
  // unitCode ({commit, state}, CODE) {
  //   commit('setCode', CODE)
  // },
  // unitUserName ({commit, state}, UserName) {
  //   commit('setUserName', UserName)
  // },
  changePath ({commit, state}, PATH) {
    commit('setPath', PATH)
  },
  toggleLoadingBt ({commit, state}, STATUS) {
    commit('setLoadingBt', STATUS)
  },
  changeMenuIdx ({commit, state}, IDX) {
    commit('setMenu', IDX)
  },
  changeModuleIdx ({commit, state}, IDX) {
    commit('setModuleIdx', IDX)
  },
  showNotice ({commit, state}, overDateStr) {
    Notification.closeAll()
    Notification({
      title: '提示',
      message: '请及时修改如下证件的有效期： ' + overDateStr,
      offset: 50,
      type: 'warning',
      duration: 0
    })
  }
}

// mutations commit触发
// const mutations = {
// }
// mutations[types.setCode] = (state, CODE) => {
//   state.userCode = CODE
// }
// mutations[types.setUserName] = (state, UserName) => {
//   state.userName = UserName
// }
// mutations[types.setPath] = (state, PATH) => {
//   state.pathName = PATH
// }
// mutations[types.setLoadingBt] = (state, STATUS) => {
//   state.btLoading = STATUS
// }

const mutations = {
  setUserInfo (state, Info) {
    state.userCode = Info.code
    state.userName = Info.name
    state.userId = Info.id
  },
  // setCode (state, CODE) {
  //   state.userCode = CODE
  // },
  // setUserName (state, UserName) {
  //   state.userName = UserName
  // },
  setPath (state, PATH) {
    state.pathName = PATH
  },
  setLoadingBt (state, STATUS) {
    state.btLoading = STATUS
  },
  setMenu (state, IDX) {
    state.menuIdx = IDX
  },
  setModuleIdx (state, IDX) {
    state.moduleIdx = IDX
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexAlong]
  // plugins: debug ? [createLogger()] : []
})
