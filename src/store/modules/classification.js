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
  classifications:[],
  set_classification:""
}
const actions = {
  get_classification_info(store,id){
    api.get_classification_info(id)
      .then(function (res) {
        store.commit('SET_CLASSIFICATION',res.data.data)
      })
  },
  add_classification(store,data){
    api.add_classification(data)
      .then(function (res) {
        // console.log(res)
        showMsg(store,'保存成功!','success')
        store.dispatch('get_classifications',store.state.req_data)

      })
      .catch(function (error) {
        // console.log(error)
        //console.log(error.data.error_msg)
        showMsg(store,error.data.error_msg || '添加失败')
      })
  },
  del_classification(store,id){
    // console.log('进入删除逻辑')
    api.del_classification(id)
      .then(function (res) {
        //console.log(res)
        showMsg(store,'删除成功!','success')
        store.dispatch('get_classifications',store.state.req_data)
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '删除失败')
      })
  },
  get_classifications({commit}, req_data){
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
    api.get_classifications(str)
      .then(function (res) {
        // console.log(res.data)
        commit('GET_CLASSIFICATION',res.data)
        commit('REQDATA',req_data)
      })
  },
  update_classification(store,data){
    console.log(data);
    api.update_classification(data.id,data.obj)
      .then(function () {
        showMsg(store,'更改成功!','success')
        store.dispatch('get_classifications')
      })
      .catch(function (error) {
        showMsg(store,error.data.err_msg || '更改失败')
      })
  }
}




const mutations = {
  GET_CLASSIFICATION(state,action){
    state.classifications = action
  },
  SET_CLASSIFICATION(state,action){
    state.set_classification = action
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
