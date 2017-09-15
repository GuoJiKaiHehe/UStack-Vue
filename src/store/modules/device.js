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
  devices:{
    data:[]
  },
  set_device:{}

}
const getters ={
}
const actions = {
  get_device_info(store,id){
    api.get_device_info(id)
      .then(function (res) {
        store.commit('SET_DEVICE',res.data.data)
      })
  },
  add_device(store,obj){
    api.add_device(obj.data)
      .then(function (res) {
        // console.log(res)
        showMsg(store,'保存成功!','success')
        store.dispatch('get_devices',obj.req_data)
      })
      .catch(function (error) {
        // console.log(error)
        //console.log(error.data.error_msg)
        showMsg(store,error.data.error_msg || '添加失败')
      })
  },
  del_device(store,id){
    console.log()
    // console.log('进入删除逻辑')
    api.del_device(id)
      .then(function (res) {
        //console.log(res)
        showMsg(store,'删除成功!','success')
        store.dispatch('get_devices',store.state.req_data)
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '删除失败')

      })
  },
  get_devices({commit}, req_data){
    console.log('请求参数',req_data)
    var str = "";
    for(var p in req_data){

      if(req_data[p] === "" || req_data[p] === " "){
        console.log('跳出循环   ')
        continue;
      }
      str += '&';
      str += p;
      str += "=";
      str += req_data[p]
    }
    str = str.substring(1)
    console.log(str)
    api.get_devices(str)
      .then(function (res) {
        // console.log(res.data)
        commit('GET_DEVICES',res.data)
        console.log(req_data)
        commit('REQDATA',req_data)
      })
  },
  put_device(store,data){
    api.update_device(data.id,data.obj)
      .then(function () {
        showMsg(store,'更改成功!','success')
        store.dispatch('get_devices',req_data)
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '更改失败')
      })
  }
}




const mutations = {
  GET_DEVICES(state,action){
    state.devices = action
  },
  SET_DEVICE(state,action){
    state.set_device = action
  },
  REQDATA(state,action){
    console.log('REQDATA',action);
    state.req_data = action
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
