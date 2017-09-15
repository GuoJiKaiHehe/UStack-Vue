<template>
  <div class="tpl-content-wrapper">

    <div class="container-fluid am-cf">
      <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-9">
          <div class="page-header-heading"><span class="am-icon-home page-header-heading-icon"></span> 欢迎!
            <small>{{this.user.name}}</small>
          </div>
          <p class="page-header-description">您与{{this.user.created_at}}入驻 U Connect</p>
        </div>
        <div class="am-u-lg-3 tpl-index-settings-button">
          <button type="button" class="page-header-button"><span class="am-icon-paint-brush"></span> 设置</button>
        </div>
      </div>

    </div>

    <div class="row-content am-cf">


      <div class="row">

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf">
            <div class="widget-head am-cf">
              <div class="widget-title am-fl">用户设置</div>
              <div class="widget-function am-fr">
                <a href="javascript:;" class="am-icon-cog"></a>
              </div>
            </div>
            <div class="widget-body am-fr">

              <form class="am-form tpl-form-line-form">
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">用户名 <span class="tpl-form-line-small-title">name</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input"  v-model="user_info.name" id="user-name" :placeholder="this.user.name">
                    <small>请输入字母+数字的组合{{user_info.name}}</small>
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">邮箱 <span class="tpl-form-line-small-title">email</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" id="user-name" v-model="user_info.email" :placeholder="this.user.email">
                    <small>请输入正确的邮箱格式</small>
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">电话 <span class="tpl-form-line-small-title">phone</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" id="user-name" v-model="user_info.phone" :placeholder="this.user.phone">
                    <small>请输入正确的手机号</small>
                  </div>
                </div>
                <div class="am-form-group">
                <label for="user-name" class="am-u-sm-3 am-form-label">微信 <span class="tpl-form-line-small-title">weixin</span></label>
                <div class="am-u-sm-9">
                  <input type="text" class="tpl-form-input" id="user-name"  v-model="user_info.weixin" :placeholder="this.user.weixin">
                  <small>微信号哦</small>
                </div>
              </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">公司 <span class="tpl-form-line-small-title">company</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" id="user-name" v-model="user_info.company"  :placeholder="this.user.company">
                    <small>公司哦</small>
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">支付宝 <span class="tpl-form-line-small-title">alipay</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" id="user-name"  v-model="user_info.alipay"  :placeholder="this.user.alipay">
                    <small>支付宝</small>
                  </div>
                </div>



                <div class="am-form-group">
                  <label for="user-intro" class="am-u-sm-3 am-form-label">是否开通短信</label>
                  <div class="am-u-sm-9">
                    <div class="tpl-switch">
                      <input type="checkbox" class="ios-switch bigswitch tpl-switch-btn" checked="">
                      <div class="tpl-switch-btn-view">
                        <div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="am-form-group">
                  <div class="am-u-sm-9 am-u-sm-push-3">
                    <button @click="update" type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success ">提交</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import router from '../../router/index'
  export default {
    name: ' ',
    data () {
      return {
        user_info: {
        }


      }
    },
    computed: {
      ...mapState({
        id: ({auth}) => auth.user._id,
        user: ({auth}) => auth.user,
      })
    },
    mounted: function () {

      var that = this;
      this.$nextTick(function () {
        // console.log('id===',that.id)
        that.get_user_des_info(that.id)
      })
    },
    methods: {
      ...mapActions([
        'get_user_des_info',
        'update_user'
      ]),
      update: function () {
//          console.log('update')
        this.update_user(this.user_info)
        this.user_info={}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
