import api from '../../api'
import Vue from 'vue'
import {showMsg} from '../actions'
import {
  RESET_VUEX,
  CHANGE_TOKEN_TRUE,
  CHANGE_TOKEN_FALSE,
  GET_USER_INFO
} from '../types'
import { getCookie,saveCookie,delCookie } from '../../utils/cookie'
import router from '../../router'
import  * as vuex_reset from '../vuex_reset'


const state = {
  token: getCookie('token') || null,
  user: JSON.parse(localStorage.getItem("userinfo")) || {}
}

const actions = {
  //退出逻辑
  logout(store){
    // console.log('进入登出逻辑')
    delCookie('token')
    store.commit('CHANGE_TOKEN_FALSE')
    store.commit('RESET_VUEX',{state:vuex_reset.VUEX_RESET})
    //showMsg(store,'退出成功!','success')
    router.push('/login')
  },
  //登录逻辑
  localLogin(store, userInfo){
    //console.log('进入登录逻辑')
   api.localLogin(userInfo)
    .then(function (response) {
      var token= response.data.token
      console.log(token)
      saveCookie('token',token , 30);
      // console.log(token)
     store.dispatch('changetoken')
      showMsg(store,'登录成功,欢迎光临!','success')


    })
     .catch(function (error) {
       // console.log('进入catch',error.data)
       showMsg(store,error.data.error_msg || '登录失败')
     })
  },
  // 若能获取cookie,则 hastoken= true,并更新个人信息,否则false
  changetoken({commit,dispatch}){
    console.log("进入changetoken逻辑")
    if (getCookie('token')) {
      commit('CHANGE_TOKEN_TRUE')
      dispatch('getUserInfo')
    } else {
      commit('CHANGE_TOKEN_FALSE')
    }
  },
  //获取个人信息
  getUserInfo({ state,commit }){
    // console.log('进入到get_me逻辑')
    api.get_me()
      .then(function (response) {
        localStorage.userid = response.data.data._id
        localStorage.username = response.data.data.name
        localStorage.userinfo = JSON.stringify(response.data.data)
        commit('GET_USER_INFO',{user:response.data.data})
        if(state.user.role === 'admin'){
          console.log('进入admin')
          router.push('/admin/adminProject')
        }else if(state.user.role === 'super_admin'){
          console.log('进入super_admin')
          router.push('/superAdmin/superProject')
        }
      })
  },
  //注册逻辑:  获得token ,然后 has_token= true,更新个人信息, 转到个人页
  localsign(store,userInfo){
    console.log(store, userInfo,'输出')
    api.localSign_up(userInfo)
      .then(function (response) {
        console.log(response)
        var token= response.data.token
        saveCookie('token',token , 30);
        store.dispatch('changetoken')
        router.push('/admin')
        showMsg(store,'注册成功,进入到user页面!','success')
        router.push('user')
      })
       .catch(function (error) {
      // console.log('进入catch',error.data)
      showMsg(store,error.data.error_msg || '登录失败')
    })
  },
  get_user_des_info(store,id){
    //console.log('get_user_des',id)
    api.get_me()
      .then(function (response) {
        store.commit('GET_USER_INFO',{user:response.data.data})
        //console.log(store.state)
        api.get_user_info(store.state.user._id).then(function (res) {
          store.commit('GET_USER_INFO',{user:res.data.data})
        })
      })

  },
  find_psd(store,data){
      api.find_psd(data)
        .then(function (res) {
          showMsg(store,'发送成功!','success')
        })
        .catch(function (error) {
          showMsg(store,error.data.error_msg || '发送失败')
        })
  },
  reset_psd(store,data){
    // console.log(data)
      api.reset_psd(data)
        .then(function (res) {
          // console.log(res)
          showMsg(store,'重置成功!','success')
          router.push('/login')
        })
        .catch(function (error) {
          showMsg(store,error.data.error_msg || '重置失败')
        })
  },
  update_user(store,data){
    //console.log(data);
    api.update_user(store.state.user._id,data)
      .then(function (res) {
        // console.log(res.data.data)
        store.commit('GET_USER_INFO',{user:res.data.data})
        showMsg(store,'保存成功!','success')
      })
      .catch(function (error) {
        //console.log(error.data.error_msg)
        showMsg(store,error.data.error_msg || '登录失败')
      })
  }

}

const mutations = {
  GET_USER_INFO: function (state,action) {
    state.user = action.user;
    // console.log('user更新完毕')
    //console.log(state,"statestate")
  },
  CHANGE_TOKEN_TRUE: function (state) {
    state.token = getCookie('token')
  },
  CHANGE_TOKEN_FALSE: function (state) {
    state.token = null
    state.user ={
      headimgurl:'/static/img/user04.png',
      name:'超哥最帅'
    }
  },
  RESET_VUEX: function (state,action) {
    state = action.state
  }
}

export default {
  state,
  actions,
  mutations
}
