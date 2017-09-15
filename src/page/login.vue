<template>
  <div class="am-g tpl-g" id="wr" style="min-height: calc(100vh - 56px);background-image: url(/static/img/bg-20.jpg);">
    <!-- 风格切换 -->
    <div class="tpl-login">
      <div class="tpl-login-content">

        <div class="tpl-login-logo">
          <img src="../../static/img/logob.png" alt="">
        </div>
        <!--<div class="tpl-login-logo">

        </div>-->



        <div class="tpl-login-title">用户登录</div>

        <form class="am-form tpl-form-line-form">
          <div class="am-form-group">
            <input type="text" class="tpl-form-input"  v-model="user.name" placeholder="用户名/手机/邮箱">

          </div>

          <div class="am-form-group">
            <input type="password" class="tpl-form-input"  v-model="user.password" placeholder="密码">

          </div>
          <div id="pass" class="am-form-group tpl-login-remember-me">
            <input id="remember-me" type="checkbox">
            <label for="remember-me">

              记住密码
            </label>
            <label id="label_right" style="cursor: pointer">找回密码</label>

          </div>

          <div class="am-form-group">

            <button  @click="login" type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn">登录</button>

          </div>
          <div class="am-form-group">
            <router-link to="/sign-up"><p>还没有账户,马上注册 !</p></router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="am-modal am-modal-no-btn" tabindex="-1" id="findpwd-modal">
      <div class="am-modal-dialog" style="background-color: #333">
        <div class="am-modal-hd" style="color: #0e90d2;">找回密码
          <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd">

          <form class="am-form tpl-form-line-form">
            <div class="am-form-group">
              <label for="user-name" class="am-u-sm-3 am-form-label">邮箱</label>
              <div class="am-u-sm-9">
                <input type="text" class="tpl-form-input" v-model="psd.email" id="user-name" placeholder="请填写您注册时的邮箱">

              </div>
            </div>
            <div class="am-form-group " >
              <div class="am-container">
                <button  type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success" data-am-modal-confirm>发送邮件</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'b',
    data () {
      return {
        msg: '',
        user:{
          name: "",
          password:""

        },
        psd:{
            email:''
        }
      }
    },

    mounted: function () {
      var that = this;
      this.$nextTick(function () {
        var $modal = $('#findpwd-modal');
        $('#label_right').on('click', function(e) {
          $modal.modal({
            closeViaDimmer:false,
            dimmer: false,
            closeOnConfirm:true,
            onConfirm: function () {
              that.find_psd(that.psd)
              $modal.modal('close');
            }
          });
        });
      })
    },
    methods:{
      ...mapActions([
        'localLogin',
        'find_psd'
      ]),
      login (){
        this.localLogin(this.user)
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
