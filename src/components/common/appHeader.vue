<template>
  <div style="min-height: 56px; position: relative; " >
    <!-- logo -->
    <div v-if="! token" class="am-fl tpl-header-logo" style="height: 56px">
      <a  href="javascript:;"><img src="../../../static/img/logo22.png" alt="" style="height: 56px"></a>
    </div>
    <div v-if=" token" class="am-fl tpl-header-logo" style="display: flex; ">
      <a href="" style="width: 80px;display: flex; justify-content: center; align-items: center"><img  class="am-f1" :src="imgurl" alt="" style="width: 35px; height: 35px; border-radius: 50%"></a>
      <div style="width:160px; height: 56px; display: flex" >
        <form class="tpl-header-search-form" action="javascript:;">
          <button class="tpl-header-search-btn am-icon-search"></button>
          <input class="tpl-header-search-box"  style="width: 100px"   type="text" placeholder="搜索内容...">
        </form>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="tpl-header-fluid">
      <!-- 侧边切换 -->
      <div v-if="token" class="am-fl tpl-header-switch-button am-icon-list">
                    <span>

                </span>
      </div>
      <!-- 搜索 -->
      <!--<div v-if="token" class="am-fl tpl-header-search">-->
        <!--<form class="tpl-header-search-form" action="javascript:;">-->
          <!--<button class="tpl-header-search-btn am-icon-search"></button>-->
          <!--<input class="tpl-header-search-box" type="text" placeholder="搜索内容...">-->
        <!--</form>-->
      <!--</div>-->
      <!-- 其它功能-->
      <div class="am-fr tpl-header-navbar">
        <ul id="doc-dropdown-justify-js">
          <!-- 欢迎语 -->

          <li class="am-text-sm tpl-header-navbar-welcome" style="cursor:hand">
            <a id="admin-fullscreen" @mouseover="hand" @click="fuck"><span class="am-icon-arrows-alt"></span> <span
              class="admin-fullText">{{full}}</span></a>
          </li>
          <li v-if="! token" class="am-text-sm tpl-header-navbar-welcome">
            <router-link to="/signUp">注册 </router-link>
          </li>
          <li v-if="!token" class="am-text-sm tpl-header-navbar-welcome">
            <router-link to="/login">登录</router-link>
          </li>
          <!-- 新邮件 -->
          <li v-if="token" class="am-dropdown tpl-dropdown" data-am-dropdown id="doc-dropdown-js">
            <a href="javascript:;" class="am-dropdown-toggle tpl-dropdown-toggle" id="2"data-am-dropdown-toggle>
              <i class="am-icon-envelope"></i>
              <span class="am-badge am-badge-success am-round item-feed-badge">5  </span>
            </a>
            <!-- 弹出列表 -->
            <ul class="am-dropdown-content tpl-dropdown-content zin">
              <li class="tpl-dropdown-menu-messages">
                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                  <div class="menu-messages-ico">
                    <img src="/static/img/user04.png" alt="">
                  </div>
                  <div class="menu-messages-time">
                    3小时前
                  </div>
                  <div class="menu-messages-content">
                    <div class="menu-messages-content-title">
                      <i class="am-icon-circle-o am-text-success"></i>
                      <span>夕风色</span>
                    </div>
                    <div class="am-text-truncate"> Amaze UI 的诞生，依托于 GitHub 及其他技术社区上一些优秀的资源；Amaze UI 的成长，则离不开用户的支持。
                    </div>
                    <div class="menu-messages-content-time">2016-09-21 下午 16:40</div>
                  </div>
                </a>
              </li>

              <li class="tpl-dropdown-menu-messages">
                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                  <div class="menu-messages-ico">
                    <img src="/static/img/user02.png" alt="">
                  </div>
                  <div class="menu-messages-time">
                    5天前
                  </div>
                  <div class="menu-messages-content">
                    <div class="menu-messages-content-title">
                      <i class="am-icon-circle-o am-text-warning"></i>
                      <span>禁言小张</span>
                    </div>
                    <div class="am-text-truncate"> 为了能最准确的传达所描述的问题， 建议你在反馈时附上演示，方便我们理解。 </div>
                    <div class="menu-messages-content-time">2016-09-16 上午 09:23</div>
                  </div>
                </a>
              </li>
              <li class="tpl-dropdown-menu-messages">
                <a href="javascript:;" class="tpl-dropdown-menu-messages-item am-cf">
                  <i class="am-icon-circle-o"></i> 进入列表…
                </a>
              </li>
            </ul>
          </li>
          <!-- 新提示 -->
          <li v-if="token" class="am-dropdown" data-am-dropdown>
            <a href="javascript:;" class="am-dropdown-toggle" data-am-dropdown-toggle>
              <i class="am-icon-bell"></i>
              <span class="am-badge am-badge-warning am-round item-feed-badge">5</span>
            </a>

            <!-- 弹出列表 -->
            <ul class="am-dropdown-content tpl-dropdown-content zin">
              <li class="tpl-dropdown-menu-notifications">
                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                  <div class="tpl-dropdown-menu-notifications-title">
                    <i class="am-icon-line-chart"></i>
                    <span> 有6笔新的销售订单</span>
                  </div>
                  <div class="tpl-dropdown-menu-notifications-time">
                    12分钟前
                  </div>
                </a>
              </li>
              <li class="tpl-dropdown-menu-notifications">
                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                  <div class="tpl-dropdown-menu-notifications-title">
                    <i class="am-icon-star"></i>
                    <span> 有3个来自人事部的消息</span>
                  </div>
                  <div class="tpl-dropdown-menu-notifications-time">
                    30分钟前
                  </div>
                </a>
              </li>
              <li class="tpl-dropdown-menu-notifications">
                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                  <div class="tpl-dropdown-menu-notifications-title">
                    <i class="am-icon-folder-o"></i>
                    <span> 上午开会记录存档</span>
                  </div>
                  <div class="tpl-dropdown-menu-notifications-time">
                    1天前
                  </div>
                </a>
              </li>


              <li class="tpl-dropdown-menu-notifications">
                <a href="javascript:;" class="tpl-dropdown-menu-notifications-item am-cf">
                  <i class="am-icon-bell"></i> 进入列表…
                </a>
              </li>
            </ul>
          </li>
          <li v-if="token" class="am-dropdown" data-am-dropdown v-popover:popover2>
            <a href="javascript:;" class="am-dropdown-toggle" data-am-dropdown-toggle>
               <span class="el-dropdown-link">
                             <img :src="imgurl" alt="" style="width: 35px; height: 35px; border-radius: 50%">
<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
            </a>
            <el-popover
              ref="popover2"
              placement="bottom"
              width="530"
              trigger="hover">
              <div id="userSet">
                <section>
                  <header>
                    <div>
                      <i class="el-icon-star-off"></i>
                      <span>常用项目</span>
                    </div>
                    <div class="flex-center">
                      <el-tooltip class="item" effect="dark" content="常用项目" placement="top">
                        <i class="el-icon-setting" style="height: 16px; line-height: 16px;"></i>
                      </el-tooltip>
                    </div>
                  </header>
                </section>
                <section>
                  <ul>
                    <li >
                      <a >
                        <i class="el-icon-edit"></i>
                        <span>个人设置</span>
                      </a>
                    </li>
                    <li @click="changePWD = true">
                      <a >
                        <i class="el-icon-document"></i>
                        <span>修改密码</span>
                      </a>
                    </li>
                    <li @click="logout">
                      <a><i class="el-icon-d-arrow-right"></i>
                        <span>退出</span></a>

                    </li>
                  </ul>
                </section>
              </div>
            </el-popover>
          </li>
        </ul>
      </div>
    </div>
    <changepassword  :display.sync="changePWD"></changepassword>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import  * as cookiefc from '../../utils/cookie'
  import  * as vuex_reset from '../../store/vuex_reset'
  import changePWD from '../utils/changePassword/index.vue'
  export default {
    components:{
      changepassword:changePWD
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        full: '开启全屏',
        isshow: false,
        activeIndex: '1',
        activeIndex2: '1',
        changePWD:false

      }
    },

    computed: {
      ...mapState({
        token: ({auth}) => auth.token,
        username: ({auth}) => auth.user.name,
        imgurl: ({ auth }) => auth.user.headimgurl,
      })
    },
    created:function () {
      $('#doc-dropdown-js').dropdown({justify: '#doc-dropdown-justify-js'});
    },
    mounted: function () {

      this.$nextTick(function () {
       //$('#doc-dropdown-js').dropdown({justify: '#doc-dropdown-justify-js'});
      })

    },

    methods: {
      ...mapActions([
        'logout'
      ]),
      header_click(){
        if ($('.left-sidebar').is('.active')) {
          if ($(window).width() > 1024) {
            $('.tpl-content-wrapper').removeClass('active');
          }
          $('.left-sidebar').removeClass('active');
        } else {
          $('.left-sidebar').addClass('active');
          if ($(window).width() > 1024) {
            $('.tpl-content-wrapper').addClass('active');
          }
        }
        if ($(window).width() < 1024) {
          $('.left-sidebar').addClass('active');
        } else {
          $('.left-sidebar').removeClass('active');
        }
      },
      handleCommand(command){
            if(command === 'a'){
                this.gotoset();
            }else if(command === 'b'){
                this.log_out();
        }
      },
      userout(){

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      person(e){
        if(this.isshow){
            return ;
        }else{
            this.isshow = true;
        }
      },
      personout(e){
          if(!this.isshow){
              return;
          }else{
              this.isshow = false;
          }
      },
      log_out (){
        this.logout()
      },
      fuck: function () {
        if ($.AMUI.fullscreen.enabled) {
          if (this.full === '开启全屏') {
            this.full = '关闭全屏'
          } else {
            this.full = '开启全屏'
          }
          $.AMUI.fullscreen.toggle();
        } else {
        }
      },
      gotoset:function () {
        this.$router.push('/admin/set_info')
      },
      hand: function () {
        document.getElementById('superAdmin-fullscreen').style.cursor = 'pointer'
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.zin{
  z-index:9999;
}
.addshow{
  display: block;
}
  .addnone{
    display: none;
  }
  #userSet{
    display: flex;
    box-sizing: border-box;
    color:rgba(0,0,0,.95);
    font-family:"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
    -webkit-font-smoothing:antialiased;
    font-weight:400;
    font-size:14px;
    > section:nth-child(1){
      padding: 10px;
      border-right:1px solid #DDD;
      width: 400px;
      header{
        display: flex;
        justify-content:space-between;

      }
    }
    > section:nth-child(2){
      width: 130px;
      ul{
        display: flex;
        flex-direction: column;
        li{
          color:rgba(0,0,0,.95);
          a{
            color:rgba(0,0,0,.95);
            padding: 10px;
            display: flex;
            i{
              width: 30%;
            }
          }
          cursor: pointer;
          :hover{
            background-color:#f7f6f2 ;
          }
        }
      }
    }
  }
  #per:hover{
    background-color:  rgba(0,0,0,.02)
  }
</style>
