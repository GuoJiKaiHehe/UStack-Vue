<template>
  <div class="am-g tpl-g" id="wr">
    <!-- 风格切换 -->
    <div class="tpl-login">
      <div class="tpl-login-content">
        <div class="tpl-login-logo">

        </div>



        <form class="am-form tpl-form-line-form">
          <div class="am-form-group">
            <input type="password" class="tpl-form-input"  v-model="user.password" placeholder="请输入新密码">

          </div>

          <div class="am-form-group">
            <input type="password" class="tpl-form-input"   v-model="password1" placeholder="请再次输入密码">

          </div>

          <div class="am-form-group">

            <button  @click="reset" type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn">重置密码</button>

          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'psd',
    data () {
      return {
          user:{
              key:this.$route.query.key,
              password:'',

          },
          password1:""
      }

    },

    mounted: function () {
      var that = this;
      this.$nextTick(function () {
        document.getElementById("wr").style.height=window.screen.height -56 + 'px'
      })
    },
    methods:{
      ...mapActions([
        'reset_psd',
        'test_password'
      ]),
      reset:function () {
          var that = this;
        Promise
          .all([that.test_password({
            password1: that.user.password,
            password2: that.password1
          })])
          .then(function () {
              that.reset_psd(that.user)
          })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pass{
    position: relative;
  }
  #label_right{
    position: absolute;
    right:0;
  }
  .am-form-group p{
    color: #B3B3B3;
    font-size:14px;
    text-rendering:optimizeLegibility;
    font-family:"Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    line-height:1.6;
    text-align: center;
    font-weight:700;
    text-decoration: underline;
    cursor:pointer;
  }
</style>
