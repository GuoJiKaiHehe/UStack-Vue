<template>
  <div>
  <div class="left-sidebar" style="width: 80px; background-color: #333; height:calc(100vh - 56px)">
    <!-- 用户信息 -->
    <div style="height: 60px;" @click="gotoProject">
      <a href="" style="width: 80px; height: 60px;" class="flex-center"><i  class="am-icon-btn am-secondary am-icon-cloud "></i></a>
    </div>
    <!-- 菜单 -->
    <ul class="sidebar-nav">
      <div v-if="!super1" id="nav">

          <router-link v-if="!inProject" to="/admin/adminProject" class=""> <i class="am-icon-asterisk sidebar-nav-link-logo"> </i> <span>项目</span></router-link>


          <router-link v-if="inProject" to="/admin/" ><i class="am-icon-home sidebar-nav-link-logo"></i> 首页</router-link>
          <!--<router-link to="/admin/map" class=""><i class="am-icon-calendar sidebar-nav-link-logo"></i> 地图</router-link>-->
          <router-link v-if="inProject" to="/admin/chart" class=""> <i class="am-icon-bar-chart sidebar-nav-link-logo"></i> 统计</router-link>
          <router-link v-if="inProject" to="/admin/userManage" class=""> <i class="am-icon-child sidebar-nav-link-logo"></i> 用户</router-link>
          <router-link v-if="inProject"to="/admin/area" class=""> <i class="am-icon-building sidebar-nav-link-logo"></i> 场景</router-link>


      </div>

      <div class="" v-if="super1" id="super_nav">
        <router-link to="/superAdmin/superProject" class=""> <i class=" "></i> 项目</router-link>
        <router-link to="/superAdmin/projectType" class=""> <i class=""></i> 项目类型</router-link>
            <router-link to="/superAdmin/projectConfig" class=""> <i class="o"></i> 系统配置参数</router-link>
            <router-link to="/superAdmin/sensortypes" class=""> <i class=""></i> 传感器类型</router-link>
        <router-link to="/superAdmin/devicetype" class=""> <i class=""></i> 设备类型</router-link>
        <router-link to="/superAdmin/areaType" class=""> <i class=""></i> 场景类型</router-link>
        <router-link to="/superAdmin/classification" class=""> <i class=""></i> 设备分组类型</router-link>
      </div>
    </ul>
  </div>
  <router-view></router-view>
    <!--<Toaster></Toaster>-->
  </div>

</template>

<script>
  import '../../../static/js/amazeui.min.js'

  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'app_left',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        super_me:false
      }
    },
    computed: {
      ...mapState({
        imgurl: ({ auth }) => auth.user.headimgurl,
        username: ({ auth }) => auth.user.name,
        super1: ({ auth }) => auth.user.role === 'super_admin',
        inProject: ({ global }) => global.inProject
      }),
    },
    methods: {
      gotoProject(){
        this.$router.push('adminProject');
        console.log('进入project')
      },

      clickclick: function (e) {
        console.log('1')

        $(e.target).siblings('.sidebar-nav-sub').slideToggle(80)
          .end()
          .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
      },
      click2:function (e) {
        $('#tab').slideToggle(80);
        $('#b').toggleClass('sidebar-nav-sub-ico-rotate');
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #nav, #super_nav{
    display: flex;
    flex-direction: column;

  }
  #nav > a, #super_nav > a {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 12px;
  }
  #nav > a:hover, #super_nav > a:hover{
    background-color: rgba(255,255,255,.1)
  }
  #nav > a > i, #super_nav > a > i {
    width: 25px;
    height: 25px;
    text-align: center;
  }

</style>
