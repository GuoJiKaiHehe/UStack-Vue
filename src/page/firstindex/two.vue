<template>
  <div id="index">
    <section>
      <p>2</p>
      <p>让开发变得更简单</p>
      <div class="gongneng">
        <span>代码托管</span>
        <span>代码托管</span>
        <span>代码托管</span>
      </div>
    </section>
    <span></span>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  #index{

    height: calc(100vh - 56px)!important;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >section{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        font-size: 40px;
        font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
        font-weight: 400;
        color: #323A45
      }
    }
    .gongneng{
      display: flex;
      span{
        padding:0 40px;
        margin: 10px 0;
        border-right: 1px dotted #BBB;
        font-family:"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
        font-size:14px;
        color: #323A45;
      }
    }

  }
</style>
