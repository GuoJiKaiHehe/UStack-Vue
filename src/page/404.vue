<template>




    <!-- 内容区域 -->
    <div id="wrap"class="tpl-content-wrapper">

      <div class="row-content am-cf">
        <div class="widget am-cf">
          <div class="widget-body">
            <div class="tpl-page-state">
              <div class="tpl-page-state-title am-text-center tpl-error-title">404</div>
              <div class="tpl-error-title-info">Page Not Found</div>
              <div class="tpl-page-state-content tpl-error-content">

                <p>对不起,没有找到您所需要的页面,可能是URL不确定,或者页面已被移除。</p>
                <button type="button" class="am-btn am-btn-secondary am-radius tpl-error-btn">Back Home</button></div>

            </div>
          </div>
        </div>



      </div>
    </div>
</template>

<script>
  export default {
    name: 'b',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrap{
  margin-left:0px;
}
</style>
