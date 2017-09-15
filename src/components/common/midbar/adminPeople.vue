<template>
<div class="midbar">
    <header>
      <span>项目成员 (2/20)</span>
      <el-input
        style="margin-top:20px"
        placeholder="搜索..."
        icon="search"
      >
      </el-input>
    </header>
    <ul class="people-show">
      <a v-for="item in items">
        <img :src="item.imgurl" alt="">
        <span>{{item.name}}</span>
      </a>
    </ul>
</div>

</template>

<script>


  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'adminPeople',
    data () {
      return {
        items:[
          {
            imgurl:'https://assets.lambda-study.com/images/123.jpg',
            name: 'cfliu',
          },
          {
            imgurl:'https://assets.lambda-study.com/images/123.jpg',
            name: 'KingJeason'
          }
        ]
      }
    },
    computed: {
      ...mapState({

      }),
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .midbar{
    width:100%;
    height: calc( 100vh - 56px );
  }
  .midbar header {
    padding: 20px
  }
  .midbar header span{
    font-family:"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
    font-size:18px;
    font-weight: bold;
  }
  .people-show{
    display: flex;
    flex-direction: column;

  }
  .people-show a {
    height: 50px;
    padding: 5px;
  }
  .people-show img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .people-show span{
    color:#333;
    font-family:"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
  }

</style>
