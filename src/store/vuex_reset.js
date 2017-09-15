export const  VUEX_RESET = {
 global:{
   captchaUrl: process.env.API_ROOT + 'users/getCaptcha?',
 },
  auth:{
    token: null,
    user:{
      headimgurl:'/static/assets/img/user04.png',
      name:'超哥最帅'
    },
  }
}
