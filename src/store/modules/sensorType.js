import api from '../../api'
import Vue from 'vue'
import {
  SET_ALL_SENSORTYPE,
  SET_SENSORTYPE
} from '../types'
import { getCookie, saveCookie, delCookie } from '../../utils/cookie'
import { msg } from '../../utils/message'
import router from '../../router'
import * as vuex_reset from '../vuex_reset'
const state = {
  allType: [

  ],
  type: {

  }
}
const actions = {
  // 增
  async addSensorType(store, data) {
    try {
      let res = await api.sensorType.addSensorType(data)
      msg('success', '成功', '添加成功')
      store.commit('VALID_TRUE')
      store.dispatch('getAllSensorType')
    } catch (error) {
      console.log(error)
      if (error.data.error_msg)
        msg('error', '错误', error.data.error_msg)
      store.commit('VALID_FALSE')
    }
  },
  // 删
  async delSensorType(store, id) {
    try {
      let res = await api.sensorType.delSensorType(id)
      msg('success', '成功', '删除成功')
      store.dispatch('getAllSensorType')
    } catch (error) {
      msg('error', '错误', error.data.error_msg)
    }
  },
  // 改
  async updateSensorType(store, data) {
    try {
      let res = await api.sensorType.updateSensorType(data.id, data.obj)
      store.commit('VALID_TRUE')
      msg('success', '成功', '保存成功')
      store.dispatch('getAllSensorType')
    } catch (error) {
      msg('error', '错误', error.data.error_msg)
      store.commit('VALID_FALSE')
    }
  },
  // 查-个体
  async getSensorTypeInfo(store, id) {
    try {
      let res = await api.sensorType.getSensorTypeInfo(id)
      store.commit('SET_SENSORTYPE', res.data)
    } catch (error) {
      console.log(error, '获取传感器类型失败')
    }
  },
  // 查-总体
  async getAllSensorType({ commit }) {
    let res = await api.sensorType.getAllSensorType()
    commit('SET_ALL_SENSORTYPE', res.data)
  },
}
const mutations = {
  [SET_ALL_SENSORTYPE](state, action) {
    state.allType = action
  },
  [SET_SENSORTYPE](state, action) {
    state.type = action
  }
}

export default {
  state,
  actions,
  mutations
}
