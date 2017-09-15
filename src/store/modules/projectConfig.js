import api from '../../api'
import Vue from 'vue'
import {showMsg} from '../actions'
import {

} from '../types'
import { getCookie,saveCookie,delCookie } from '../../utils/cookie'
import router from '../../router'


const state = {
  req_data:{
    page:1,
    limit:10,
  },
  sysconfigs:[]
}
const actions = {
  get_sysconfig_info(store,id){
    api.get_sysconfig_info(id)
      .then(function (res) {
        store.commit('SET_SYSCONFIG',res.data.data)
      })
  },
  add_sysconfig(store,data){
    api.add_sysconfig(data)
      .then(function (res) {
        showMsg(store,'保存成功!','success')
        store.dispatch('get_sysconfigs',store.state.req_data)

      })
      .catch(function (error) {
        showMsg(store,error.data.error_msg || '添加失败')
      })
  },
  del_sysconfig(store,id){
    // console.log('进入删除逻辑')
    api.del_sysconfig(id)
      .then(function (res) {
        //console.log(res)
        showMsg(store,'删除成功!','success')
        store.dispatch('get_sysconfigs',store.state.req_data)
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '删除失败')
      })
  },
  get_sysconfigs({commit}, req_data){
    // console.log('请求参数',req_data)
    var str = "";
    for(var p in req_data){
      if(req_data[p] == "" || req_data[p] == " "){
        continue;
      }
      str += '&';
      str += p;
      str += "=";
      str += req_data[p]
    }
    str = str.substring(1)
    api.get_sysconfigs(str)
      .then(function (res) {
        // console.log(res.data)
        commit('GET_SYSCONFIGS',res.data)
        commit('REQDATA',req_data)
      })
  },
  update_sysconfig(store,data){
    api.update_sysconfig(data.id,data.obj)
      .then(function () {
        showMsg(store,'更改成功!','success')
        store.dispatch('get_sysconfigs')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '更改失败')
      })
  }
}




const mutations = {
  GET_SYSCONFIGS(state,action){
    state.sysconfigs = action
  },
  SET_SYSCONFIG(state,action){
    state.set_sysconfig = action
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
