import api from '../../api'
import Vue from 'vue'
import {showMsg} from '../actions'
import {
  GET_PROJECT_TYPE,
} from '../types'
import { getCookie,saveCookie,delCookie } from '../../utils/cookie'
import router from '../../router'
import  * as vuex_reset from '../vuex_reset'


const state = {
  projectTypes:[
  ],
  set_projectType: {
  }
}
const actions = {
  get_projectType_info(store,id){
    api.get_projectType_info(id)
      .then(function (res) {
        store.commit('SET_PROJECT_TYPE',res.data.data)
      })
  },
  add_projectType(store,data,obj){
    api.add_projectType(data)
      .then(function (res) {
        // console.log(res)
        showMsg(store,'保存成功!','success')
        store.dispatch('get_projectTypes')

      })
      .catch(function (error) {
        showMsg(store,error.data.error_msg || '添加失败')
      })
  },
  del_projectType(store,id){
    // console.log('进入删除逻辑')
    api.del_projectType(id)
      .then(function (res) {
        //console.log(res)
        showMsg(store,'删除成功!','success')
        store.dispatch('get_projectTypes')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '删除失败')
      })
  },
  get_projectTypes({commit}){
    api.get_projectTypes()
      .then(function (res) {
        // console.log(res.data.data)
        commit('GET_PROJECT_TYPE',res.data.data)
      })
  },
  update_projectType(store,data){
    // console.log(data);
    api.update_projectType(data.id,data.obj)
      .then(function ()  {
        showMsg(store,'更改成功!','success')
        store.dispatch('get_projectTypes')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '更改失败')
      })
  },

}

const mutations = {
  [GET_PROJECT_TYPE](state , action){
    state.projectTypes = action
  },
  SET_PROJECT_TYPE(state,action){
    state.set_projectType = action
  }
}

export default {
  state,
  actions,
  mutations
}
