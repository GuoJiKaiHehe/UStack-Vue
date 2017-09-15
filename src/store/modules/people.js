import api from '../../api'
import Vue from 'vue'
import { showMsg } from '../actions'
import {
  GET_PEOPLE,
} from '../types'
import { getCookie, saveCookie, delCookie } from '../../utils/cookie'
import router from '../../router'
import * as vuex_reset from '../vuex_reset'
import { Notification } from 'element-ui';

const state = {
  user: [
  ],
  iswait: false,
  req_data: {
    page: 1,
    limit: 10,
    projectId: localStorage.projectTypeId
  },
  set_people: {

  }
}
const actions = {
  async get_people_info(store, id) {
    try {
      let res = await api.get_user_info(id)
      store.commit('SET_PEOPLE', res.data.data)
    } catch (error) {
      Notification.error({
        title: '错误',
        message: error.data.error_msg
      });
    }
  },
  async add_people(store, data, obj) {
    try {
      let res = await api.add_people(data)

      // 若添加成功关闭弹框
      store.commit('MODEL_SHOW_FALSE')

      Notification.success({
        title: '成功',
        message: '保存成功!'
      });
      // 获取所有成员
      store.dispatch('get_all_peoples', store.state.req_data)
    } catch (error) {
      // 弹出服务器错误
      Notification.error({
        title: '错误',
        message: error.data.error_msg
      });

      // 若添加失败则保持弹框打开状态
      store.commit('MODEL_SHOW_TRUE')
    }
  },
  async del_people(store, id) {
    try {
      let res = await api.del_people(id)
      Notification.success({
        title: '成功',
        message: '删除成功!'
      });
      store.dispatch('get_all_peoples', store.state.req_data)

    } catch (error) {
      Notification.error({
        title: '错误',
        message: error.data.error_msg
      });
    }

  },
  async update_people(store, data) {
    try {
      let res = await api.update_user(data.id, data.obj)
      Notification.success({
        title: '成功',
        message: '保存成功!'
      });
      store.dispatch('get_all_peoples', store.state.req_data)
    } catch (error) {
      Notification.error({
        title: '错误',
        message: error.data.error_msg
      });
    }
  },
  async get_all_peoples({ commit }, req_data) {
    // console.log('请求参数',req_data)
    var str = "";
    for (var p in req_data) {
      if (req_data[p] == "") {
        continue;
      }
      str += '&';
      str += p;
      str += "=";
      str += req_data[p]
    }
    str = str.substring(1)
    try {
      let res = await api.get_all_people(str)
      commit('GET_PEOPLE', res.data)
      commit('REQDATA', req_data)
    } catch (error) {
        console.log('get_all_peoples出错')
    }
  },

}

const mutations = {
  [GET_PEOPLE](state, action) {
    state.user = action
    state.test = {
      a: 3,
      b: 4
    }
  },
  REQDATA(state, action) {
    state.req_data = action
  },
  LOADING_TRUE(state) {
    state.iswait = true;
  },
  LOADING_FALSE(state) {
    state.iswait = false;
  },
  SET_PEOPLE(state, action) {
    state.set_people = action
  }
}

export default {
  state,
  actions,
  mutations
}
