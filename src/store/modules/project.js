import api from '../../api'
import Vue from 'vue'
import {showMsg} from '../actions'
import {
  GET_PROJECTS,
} from '../types'
import { getCookie,saveCookie,delCookie } from '../../utils/cookie'
import router from '../../router'
import  * as vuex_reset from '../vuex_reset'


const state = {
  projects:[
  ],
  set_project: {

  },
  req_data:{
    page:1,
    limit:10,
  },
}
const actions = {
  get_project_info({commit},id){
    api.get_project_info(id)
      .then(function (res) {
        commit('SET_USER_PROJECT',res.data.data)
      })
  },
  add_project(store,data,obj){
    api.add_project(data)
      .then(function (res) {
        // console.log(res)
        showMsg(store,'保存成功!','success')
        store.dispatch('get_projects')

      })
      .catch(function (error) {
        // console.log(error)
        //console.log(error.data.error_msg)
        showMsg(store,error.data.error_msg || '添加失败')
      })
  },
  del_project(store,id){

    api.del_project(id)
      .then(function (res) {
        //console.log(res)
        showMsg(store,'删除成功!','success')
        store.dispatch('get_project')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '删除失败')
      })
  },
  get_projects({commit},req_data){
    var str = "";
    for(var p in req_data){
      // console.log(req_data[p])
      if(req_data[p] == "" || req_data[p] == " "){
        continue;
      }
      str += '&';
      str += p;
      str += "=";
      str += req_data[p]
    }
    // console.log(str);
    str = str.substring(1)
    api.get_projects(str)
      .then(function (res) {
        // console.log(res.data)
        commit('GET_PROJECTS',res.data)
        commit('REQDATA',req_data)
      })
  },
  update_project(store,data){
    // console.log(data);
    api.update_project(data.id,data.obj)
      .then(function () {
        showMsg(store,'更改成功!','success')
        store.dispatch('get_project')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '更改失败')
      })
  },

}

const mutations = {
  [GET_PROJECTS](state , action){
    state.projects = action
  },
  SET_USER_PROJECT(state,action){
    state.set_user_project = action
  },
  REQDATA(state,action){
    state.req_data = action
  }
}

export default {
  state,
  actions,
  mutations
}
