// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import  Vuex from 'vuex'
import '../static/js/amazeui.min.js'
import VeeValidate from 'vee-validate';


var VueCookie = require('vue-cookie');

Vue.config.productionTip = false
Vue.use(VueCookie);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: process.env.MAP_KEY
})
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VeeValidate);
//Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  mounted: function () {
  },
  components: { App },
  render: h => h(App)
})



