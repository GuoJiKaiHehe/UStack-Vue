
import Vue from 'vue'
import axios from 'axios'
import * as cookiefc from '../utils/cookie'
import Vuex from 'vuex'
import store from '../store'
export default {
  // 传感器类型
  sensorType: {
    // 增
    addSensorType: function (data) {
      return axios.post(process.env.API_ROOT + 'sensortypes', data)
    },
    // 删
    delSensorType: function (id) {
      return axios.delete(process.env.API_ROOT + 'sensortypes/' + id)
    },
    // 改
    updateSensorType: function (id, data) {
      return axios.put(process.env.API_ROOT + 'sensortypes/' + id, data)
    },
    // 查-个体
    getSensorTypeInfo: function (id) {
      return axios.get(process.env.API_ROOT + 'sensortypes/' + id)
    },
    // 查-总体
    getAllSensorType: function () {
      return axios.get(process.env.API_ROOT + 'sensortypes')
    },
  },
  // 设备类型
  deviceType: {
    // 增
    addDeviceType: function (obj) {
      return axios.post(process.env.API_ROOT + 'devicetypes', obj)
    },
    // 删
    delDeviceType: function (id, obj) {
      return axios.delete(process.env.API_ROOT + 'devicetypes/' + id)
    },
    // 改
    updateDeviceType: function (id, obj) {
      return axios.put(process.env.API_ROOT + 'devicetypes/' + id, obj)
    },
    // 查-个体
    getDeviceTypeInfo: function (id) {
      return axios.get(process.env.API_ROOT + 'devicetypes/' + id)
    },
    // 查-总体
    getAllDeviceType: function (data) {
      return axios.get(process.env.API_ROOT + 'devicetypes?' + data)
    },

  },
  // 场景类型
  areaType: {
    // 增
    addAreaType: function (data) {
      return axios.post(process.env.API_ROOT + 'areatypes/', data)
    },
    // 删
    delAreaType: function (id) {
      return axios.delete(process.env.API_ROOT + 'areaTypes/' + id)
    },
    // 改
    updateAreaType: function (id, obj) {
      return axios.put(process.env.API_ROOT + 'areaTypes/' + id, obj)
    },
    // 查-个体
    getAreaTypeInfo: function (id) {
      return axios.get(process.env.API_ROOT + 'areaTypes/' + id)
    },
    // 查-总体
    getAllAreaType: function (data) {
      return axios.get(process.env.API_ROOT + 'areatypes?' + data)
    },
  },

  localLogin: function (data) {
    return axios.post(process.env.API_ROOT + 'auth/signin', data)
  },
  localSign_up: function (data) {
    return axios.post(process.env.API_ROOT + 'users/signUp', data)
  },
  get_me: function () {
    return axios.get(process.env.API_ROOT + 'users/me')
  },
  get_user_info: function (id) {
    return axios.get(process.env.API_ROOT + 'users/' + id)
  },
  update_user: function (id, data) {
    return axios.put(process.env.API_ROOT + 'users/' + id, data)
  },
  add_people: function (data) {
    return axios.post(process.env.API_ROOT + 'users', data)
  },
  del_people: function (id) {
    return axios.delete(process.env.API_ROOT + 'users/' + id)
  },
  get_all_people: function (str) {
    return axios.get(process.env.API_ROOT + 'users?' + str)
  },
  find_psd: function (data) {
    return axios.post(process.env.API_ROOT + 'users/sendResetMail', data)
  },
  reset_psd: function (data) {
    return axios.post(process.env.API_ROOT + 'users/sendResetPassword', data)
  },
  get_projectTypes: function () {
    return axios.get(process.env.API_ROOT + 'protypes')
  },
  add_projectType: function (data) {
    return axios.post(process.env.API_ROOT + 'protypes', data)
  },
  del_projectType: function (id) {
    return axios.delete(process.env.API_ROOT + 'protypes/' + id)
  },
  update_projectType: function (id, data) {
    return axios.put(process.env.API_ROOT + 'protypes/' + id, data)
  },
  get_projectType_info: function (id) {
    return axios.get(process.env.API_ROOT + 'protypes/' + id)
  },
  get_sysconfig_info: function (id) {
    return axios.get(process.env.API_ROOT + 'sysconfig/' + id)
  },
  get_sysconfigs: function (data) {
    return axios.get(process.env.API_ROOT + 'sysconfigs?' + data)
  },
  add_sysconfig: function (data) {
    return axios.post(process.env.API_ROOT + 'sysconfigs', data)
  },
  update_sysconfig: function (id, data) {
    return axios.put(process.env.API_ROOT + 'sysconfigs/' + id, data)
  },
  del_sysconfig: function (id) {
    return axios.delete(process.env.API_ROOT + 'sysconfigs/' + id)
  },
  get_projects: function (data) {
    return axios.get(process.env.API_ROOT + 'projects?' + data)
  },
  add_project: function (data) {
    return axios.post(process.env.API_ROOT + 'projects', data)
  },
  del_project: function (id) {
    return axios.delete(process.env.API_ROOT + 'projects/' + id)
  },
  get_project_info: function (id) {
    return axios.get(process.env.API_ROOT + 'projects/' + id)
  },
  update_user_project: function (id, data) {
    return axios.put(process.env.API_ROOT + 'projects/' + id, data)
  },

  /*
  用户设备
   */
  add_device: function (obj) {
    return axios.post(process.env.API_ROOT + 'devices', obj)
  },
  update_device: function (id, obj) {
    return axios.put(process.env.API_ROOT + 'devices/' + id, obj)
  },
  del_device: function (id, obj) {
    return axios.delete(process.env.API_ROOT + 'devices/' + id)
  },
  get_devices: function (data) {
    return axios.get(process.env.API_ROOT + 'devices?' + data)
  },
  get_device_info: function (id) {
    return axios.get(process.env.API_ROOT + 'devices/' + id)
  },
  add_areaType: function (data) {
    return axios.post(process.env.API_ROOT + 'areatypes/', data)
  },
  get_areaTypes: function (data) {
    return axios.get(process.env.API_ROOT + 'areatypes?' + data)
  },
  get_areaType_info: function (id) {
    return axios.get(process.env.API_ROOT + 'areaTypes/' + id)
  },
  update_areaType: function (id, obj) {
    return axios.put(process.env.API_ROOT + 'areaTypes/' + id, obj)
  },
  del_areaType: function (id) {
    return axios.delete(process.env.API_ROOT + 'areaTypes/' + id)
  },

  add_classification: function (data) {
    return axios.post(process.env.API_ROOT + 'classifications/', data)
  },
  get_classifications: function (data) {
    return axios.get(process.env.API_ROOT + 'classifications?' + data)
  },
  get_classification_info: function (id) {
    return axios.get(process.env.API_ROOT + 'classifications/' + id)
  },
  update_classification: function (id, obj) {
    return axios.put(process.env.API_ROOT + 'classifications/' + id, obj)
  },
  del_classification: function (id) {
    return axios.delete(process.env.API_ROOT + 'classifications/' + id)
  },
  // 检测字段
  validate: {
    // 添加
    userInfo: (data) => {
      return axios.post(process.env.API_ROOT + 'users/validateUserInfo', data)
    },
    // 修改
    UpdateInfo: (data) => {
      return axios.post(process.env.API_ROOT + 'users/validateUserUpdateInfo/' + data.id, data.obj)
    }
  }

}


axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true

//Vue.use(VueAxios, axios)
axios.interceptors.request.use(
  config => {
    if (cookiefc.getCookie('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log('http请求拦截器,已找到token并附加到头部')
      config.headers.Authorization = 'Bearer ' + cookiefc.getCookie('token').replace(/(^")|("$)/g, '')

    } else {
      // console.log('http请求拦截器,没找到toeken')
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch('logout')
      }
    }
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

