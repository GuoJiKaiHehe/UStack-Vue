<template>
  <div class="container-fluid am-cf" style="border-bottom: 1px solid #CCC;">
    <div class="row">
      <div class="am-u-sm-12 am-u-md-12 am-u-lg-9">
        <div class="page-header-heading"><span class="am-icon-home page-header-heading-icon"></span> {{Title}} <small>{{Name}}</small></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'wrap_header',
    data () {
      return {
        msg: 'Welcome to wrap_header'
      }
    },
    props:['Title','Name','Title_sec']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrap{
    margin-left:0px;
  }
</style>
