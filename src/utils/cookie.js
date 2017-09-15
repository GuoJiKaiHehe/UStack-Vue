import Vue from 'vue'
var VueCookie = require('vue-cookie');
let cookieConfig = {
  expires: 30,
  //domain: 'localhost'   // 加了这个属性就cookie就保存不成功
}
// let CookieDomain = process.env.COOKIE_DOMAIN
//
// if(CookieDomain !== ''){
//   cookieConfig = { domain: CookieDomain } //path:'/',maxAge:365*24*60*60
// }
Vue.use(VueCookie);
export function saveCookie(name,value) {
//cookie.save(name, value)
  //console.log('cookiue')
  console.log('进入saveCookie')
  Vue.cookie.set(name, value,1);
}
export function getCookie(name) {
  return Vue.cookie.get(name,cookieConfig);
}
export function delCookie(name) {
  return Vue.cookie.delete(name,cookieConfig);
}
