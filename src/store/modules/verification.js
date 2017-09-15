import {
  VERIFICATION_SUCCESS,
  VERIFICATION_FALSE
} from '../types'
import { Notification } from 'element-ui'
const state = {
  success: false
}
const actions = {
  test_email(store,val){
    var p = new Promise(function(resolve, reject){
      //做一些异步操作
      var myreg_email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (!myreg_email.test(val)) {
        Notification.error({
          title: '错误',
          message: '邮箱格式错误'
        })
        store.commit('VERIFICATION_FALSE')
      }else{
        store.commit('VERIFICATION_SUCCESS')
        resolve();
      }
    });
    return p;
  },
  test_phone(store,val){
    var p = new Promise(function(resolve, reject){
      //做一些异步操作
      var myerg_phone = /^((1[0-9][0-9]{1})|159|153)+\d{8}$/;
      if (!myerg_phone.test(val)) {
        store.commit('SHOW_MSG', {
          content: '请输入有效的手机号'
        })
        store.commit('VERIFICATION_FALSE')
      }else{
        store.commit('VERIFICATION_SUCCESS')
        resolve();
      }
    });
    return p;
  },
  test_password(store,val){
    var p = new Promise(function(resolve, reject){
      //做一些异步操作
      if (val.password1 !== val.password2) {
        store.commit('SHOW_MSG', {
          content: '两次密码不一致'
        })
        store.commit('VERIFICATION_FALSE')
      }else{
        store.commit('VERIFICATION_SUCCESS')
        resolve();
      }
    });
    return p;
  }
}
const mutations = {
  [VERIFICATION_SUCCESS](state , action){
    state.success = true;
  },
  [VERIFICATION_FALSE](state, action){
    state.success = false;
  }
}
export default {
  state,
  mutations,
  actions
}
