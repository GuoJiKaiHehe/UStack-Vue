import api from '../../api'
import Vue from 'vue'
import {
  SET_ALL_DEVICETYPE,
  SET_DEVICETYPE
} from '../types'
import { getCookie, saveCookie, delCookie } from '../../utils/cookie'
import router from '../../router'
import * as vuex_reset from '../vuex_reset'
import { msg } from '../../utils/message';


const state = {
  allType: [
  ],
  type: {
  }
}
const actions = {
  // 增
  async addDeviceType(store, data) {
    try {
      let res = await api.deviceType.addDeviceType(data)
      await msg('success', '成功', '添加成功')
      await store.commit('VALID_TRUE')
      store.dispatch('getAllDeviceType')
    } catch (error) {
      console.log(error)
      if (error.data.error_msg)
        msg('error', '错误', error.data.error_msg)
      store.commit('VALID_FALSE')
    }
  },
  // 删
  async delDeviceType(store, id) {
    try {
      let res = await api.deviceType.delDeviceType(id)
      msg('success', '成功', '删除成功')
      store.dispatch('getAllDeviceType')
    } catch (error) {
      msg('error', '错误', error.data.error_msg)
    }
  },
  // 改
  async updateDeviceType(store, data) {
    try {
      let res = await api.deviceType.updateDeviceType(data.id, data.obj)
      store.commit('VALID_TRUE')
      msg('success', '成功', '保存成功')
      store.dispatch('getAllDeviceType')
    } catch (error) {
      msg('error', '错误', error.data.error_msg)
      store.commit('VALID_FALSE')
    }
  },
  // 查-个体
  async getDeviceTypeInfo(store, id) {
    try {
      let res = await api.deviceType.getDeviceTypeInfo(id)
      store.commit('SET_DEVICETYPE', res.data)
    } catch (error) {
      console.log(error, '获取设备类型失败')
    }
  },
  // 查-总体
  async getAllDeviceType({ commit }) {
    let res = await api.deviceType.getAllDeviceType()
    commit('SET_ALL_DEVICETYPE', res.data)
  },
}
const mutations = {
  [SET_ALL_DEVICETYPE](state, action) {
    state.allType = action
  },
  [SET_DEVICETYPE](state, action) {
    state.type = action
  }
}

export default {
  state,
  actions,
  mutations
}
