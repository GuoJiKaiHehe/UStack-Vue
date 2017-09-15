import api from '../../api'
import Vue from 'vue'
import { showMsg } from '../actions'
import {
  SET_ALL_AREATYPE,
  SET_AREATYPE,
  REQDATA
} from '../types'
import { getCookie, saveCookie, delCookie } from '../../utils/cookie'
import router from '../../router'
import { msg } from '../../utils/message'


const state = {
  reqData: {
    page: 1,
    limit: 10,
  },
  allType: [],
  type: ""
}
const actions = {
  // 增
  async addAreaType(store, data) {
    try {
      let res = await api.areaType.addAreaType(data)
      msg('success', '成功', '添加成功')
      store.commit('VALID_TRUE')
      store.dispatch('getAllAreaType')
    } catch (error) {
      if (error.data.error_msg) {
        store.commit('VALID_FALSE')
        msg('error', '错误', '添加失败')
      }
    }
  },
  // 删
  async delAreaType(store, id) {
    try {
      let res = await api.areaType.delAreaType(id)
      msg('success', '成功', '失败成功')
      store.dispatch('getAllAreaType')
    } catch (error) {
      if (error.data.error_msg) {
        msg('error', '失败', error.data.error_msg)
      }

    }
  },
  // 改
  async updateAreaType(store, data) {
    try {
      let res = await api.areaType.updateAreaType(data.id, data.obj)
      msg('success', '成功', '修改成功')
      store.commit('VALID_TRUE')
      store.dispatch('getAllAreaType')
    } catch (error) {
      if (error.data.error_msg) {
        store.commit('VALID_FALSE')
        msg('error', '失败', error.data.error_msg)
      }
      // store.commit('MODEL_SHOW_TRUE')
    }
  },
  // 查-个体
  async getAreaTypeInfo(store, id) {
    try {
      let res = await api.areaType.getAreaTypeInfo(id)
      store.commit('SET_AREATYPE', res.data)
    } catch (error) {
      console.log(error)
    }
  },
  // 查-总体
  async getAllAreaType({ commit }, reqData) {
    var str = "";
    for (var p in reqData) {
      if (reqData[p] == "" || reqData[p] == " ") {
        continue;
      }
      str += '&';
      str += p;
      str += "=";
      str += reqData[p]
    }
    str = str.substring(1)
    try {
      let res = await api.areaType.getAllAreaType(str)
      // console.log(res.data)
      commit('SET_ALL_AREATYPE', res.data)
      commit('REQDATA', reqData)
    } catch (error) { }
  },
}




const mutations = {
  [SET_ALL_AREATYPE](state, action) {
    state.allType = action
  },
  [SET_AREATYPE](state, action) {
    state.type = action
  },
  [REQDATA](state, action) {
    state.reqAata = action
  }
}

export default {
  state,
  actions,
  mutations
}
