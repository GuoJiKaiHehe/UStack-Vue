<template>

  <div id="app">
    <app_header></app_header>
    <router-view></router-view>
    <Toaster></Toaster>
  </div>

</template>

<script>
  import '../static/js/echarts.min.js'
  import '../static/js/app.js'
  import '../static/js/echarts.min'
  import '../static/js/jquery.min'
  import app_header from './components/common/appHeader'
  import app_left from './components/common/appLeft'
  import  * as cookiefc from './utils/cookie'
  import Toaster from './components/utils/Toaster/index.vue'
export default {
  data(){
    return {
      msg: '数据',
      saveSelectColor:{
        'Name': 'SelcetColor',
        'Color': 'theme-black'
      }

    }
  },
  name: 'app',
  components:{app_header,app_left,Toaster},
  mounted: function () {

      var that = this;
    that.autoLeftNav();
    $(window).resize(function() {
      that.autoLeftNav();
    });
    $('#app').attr('class', 'theme-white')
    this.$nextTick(function () {
       //代码保证 this.$el 在 document 中

    })
  },
  methods:{
      autoLeftNav: function () {
      $('.tpl-header-switch-button').on('click', function() {
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
      })

      if ($(window).width() < 1024) {
          $('.left-sidebar').addClass('active');
        } else {
          $('.left-sidebar').removeClass('active');
        }
    },

  }

  }

</script>

<style></style>
