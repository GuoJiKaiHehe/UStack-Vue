<template>
  <div class="am-g tpl-g" id="wr2" style="min-height: calc(100vh - 56px);background-image: url(/static/img/bg-20.jpg);">
    <div class="tpl-login">
      <div class="tpl-login-content">

        <div class="tpl-login-title">加入UStack,体验物联网之美</div>
        <!--<span class="tpl-login-content-info">创建一个新的用户</span>-->
        <form class="am-form tpl-form-line-form">
          <div class="am-form-group">
            <input type="text" v-model="user.name" class="tpl-form-input" placeholder="用户名">
          </div>

          <div class="am-form-group">
            <input type="text" v-model="user.email" class="tpl-form-input" placeholder="邮箱">
          </div>

          <div class="am-form-group">
            <input type="password" v-model="user.password" class="tpl-form-input" placeholder="密码">
          </div>

          <div class="am-form-group">
            <input type="password" v-model="password1" class="tpl-form-input" placeholder="确认密码">
          </div>
          <div class="am-form-group tpl-login-remember-me">
            <input type="text" v-model="user.captcha" class="tpl-form-input" placeholder="验证码">
            <img style="display: inline-block" v-bind:src="captchaUrl" @click="getCaptchaUrl" alt="22">
          </div>
          <div class="am-form-group">

            <button type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn" @click="login">注册</button>

          </div>
          <div class="am-form-group">
            <router-link to="/login">
              <P>已有账户?马上登录~</P>
            </router-link>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'b',
  data() {
    return {
      msg: '',
      user: {
        name: "",
        email: "",
        password: "",
        captcha: ""
      },
      password1: ""

    }
  },
  mounted: function() {
    var that = this;
  },
  computed: {
    ...mapState({
      captchaUrl: ({ global }) => global.captchaUrl,
    })
  },
  methods: {
    ...mapActions([
      'getCaptchaUrl',
      'localsign',
      'test_password',
      'test_email'
    ]),
    login () {
      let that = this
      Promise
        .all([
          that.test_password({
            password1: that.user.password,
            password2: that.password1
          }),
          that.test_email(that.user.email)
        ])
        .then(() => {
          that.localsign(that.user)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.am-form-group p {
  padding: 5px;
  color: #B3B3B3;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
  line-height: 1.6;
  text-align: center;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}
</style>
