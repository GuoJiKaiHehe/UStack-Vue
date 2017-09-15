
import {
  GET_CAPTCHAURL,
  RESET_HEADER_NO,
  RESET_HEADER,
  PROJECT_IN,
  PROJECT_OUT,
  VALID_TRUE,
  VALID_FALSE
} from '../types'

const state = {
  captchaUrl: process.env.API_ROOT + 'users/getCaptcha?',
  inProject: false,
  validSuccess: false
}
const actions = {
  changeProjectState({ commit }) {
    if (localStorage.projectId !== "") {
      commit('PROJECT_IN')
    } else {
      commit('PROJECT_OUT')
    }
  },
  getCaptchaUrl({ commit }) {
    let str = process.env.API_ROOT + 'users/getCaptcha'
    commit('GET_CAPTCHAURL', str)
  }
}

const mutations = {
  [GET_CAPTCHAURL](state, str) {
    state.captchaUrl = str
  },
  [PROJECT_IN](state) {
    state.inProject = true
  },
  [PROJECT_OUT](state) {
    state.inProject = false
  },
  [VALID_TRUE](state) {
    state.validSuccess = true
  },
  [VALID_FALSE](state) {
    state.validSuccess = false
  }
}

export default {
  actions,
  state,
  mutations
}
