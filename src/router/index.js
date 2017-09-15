import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'

import  login from '@/page/login'
import  index from '@/page/index'
import  signUp from '@/page/signUp'
import  page404 from '@/page/404'
import setUserInfo from '@/components/common/setUserInfo'
import resetPassWord from '@/page/resetPassWord'

import adminProject from '@/components/admin/project/index.vue'
import  map from '@/components/admin/map/index'
import  area from '@/components/admin/area/index'
import  chart from '@/components/common/chart'
import  app_left from '@/components/common/appLeft'

import  userManage from '@/components/admin/userManage'
import adminIndex from '@/components/index'
import projectDetail from '@/components/admin/projectDetail'


import projectType from '@/components/superAdmin/projectType/index'
import projectConfig from '@/components/superAdmin/projectConfig/index'
import sensorTypes from '@/components/superAdmin/sensorTypes/index'
import superAdminProject from '@/components/superAdmin/project/index'
import deviceType from '@/components/superAdmin/deviceType'
import areaType from '@/components/superAdmin/areaType'
import classification from '@/components/superAdmin/classification'
Vue.use(Router)
import  * as cookiefc from '../utils/cookie'
const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        // ...
        if(store.state.auth.token){
          router.push('/admin/adminProject')
        }else{
          next()
        }
      }
    },
    {
      path: '*',
      component: page404,
      name:'404'
    },

    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp,
    },
    {
      path: '/resetPassWord',
      name: 'resetPassWord',
      component: resetPassWord,
    },
    {
      path: '/:level/',
      component: app_left,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        { path: '', component: adminIndex,name:'adminIndex' },
        { path: 'map', component: map,name:'map' },
        { path: 'chart', component: chart,name:'chart' },
        { path: 'userManage', component: userManage,name:'userManage' },
        {path:'setUserInfo', component:setUserInfo,name:'setUserInfo'},
        {path:'projectType', component:projectType,name:'projectType'},
        {path:'projectConfig', component:projectConfig,name:'projectConfig'},
        {path:'sensorTypes', component:sensorTypes,name:'sensorTypes'},
        {path:'superProject', component:superAdminProject,name:'superAdminProject'},
        {
          path:'adminProject',
          component:adminProject,
          name:'adminProject',
          beforeEnter: (to, from, next) => {
            // ...
            localStorage.projectId = ""
            next()
          }
        },
        {path:'deviceType', component: deviceType,name:'deviceType'},
        {path:'projectDetail', component: projectDetail,name:'projectDetail'},
        {path:'area', component: area,name:'area'},
        {path:'areaType', component: areaType,name:'areaType'},
        {path:'classification', component: classification,name:'classification'},
      ]
    }
  ]
})
export default router
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    if (store.state.auth.token) {  // 通过vuex state获取当前的token是否存在
      // console.log('已登录,进入个人页')
      next();
    }
    else {
      // console.log('未登录,转到登录页')
      next({
        path: '/login',
      })
    }
  }
  //若不需要登录权限 ,则先判断有没有token,若有token,则强制返回 admin 页
  else {
    // console.log('不需要登录权限')
    if (store.state.auth.token){
      router.push('admin/adminProject')
    }else{
      next();
    }

  }
})

