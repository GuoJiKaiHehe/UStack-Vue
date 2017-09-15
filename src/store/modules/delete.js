/**
 * Created by Jeason on 2017/6/7.
 */
/*
 用于验证表单中的各种字段
 */
import {
  CHANGE_DEL_ID,
  CHANGE_DEL_TYPE
} from '../types'

const state = {
  id:'',
  type:''
}
const actions = {
  del_item_vuex({commit},obj){
      commit('CHANGE_DEL_ID',obj.id);
      commit('CHANGE_DEL_TYPE',obj.type)
  }
}

const mutations = {
  [CHANGE_DEL_ID](state , id){
    state.id = id
  },
  [CHANGE_DEL_TYPE](state , type){
    state.type = type
  }
}

export default {
  state,
  mutations,
  actions
}
