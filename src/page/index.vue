<template>
  <div id="index" v-if="begin" @mousewheel="down">
    <transition name="fade">
      <one v-if="index[0].active"></one>
      <two v-if="index[1].active"></two>
      <three v-if="index[2].active"></three>
    </transition>
      <span @click="down">
        <i class="el-icon-arrow-down" ></i>
      </span>
    <el-steps :space="100" direction="vertical" :active="pageIndex" style="position: absolute; top: 50%;transform: translateY(-50%); left: 40px;">

      <el-step v-for="(x,pageindex) in index"   style="cursor: pointer;"></el-step>
    </el-steps>
  </div>
</template>

<script>
  import one from './firstindex/one.vue'
  import two from './firstindex/two.vue'
  import three from './firstindex/three.vue'
  export default {
    name: 'index',
    components: { one,two,three},
    mounted(){
        for(let i = 0; i < 3; i++){
          let obj = {}
            obj.id = i + 1;
            if(i === 0){
                obj.active = true
            }else{
                obj.active = false
            }
            this.index.push(obj)
        }
        this.begin = true
      this.$nextTick(function () {
          var that = this;
        $('.el-step__icon').click(function (e) {
         let toIndex = e.target.firstChild.data
          that.pageIndex = toIndex
          console.log(that.index )
          for(let i = 0; i < that.index.length; i++ ){
             that.index[i].active = false
          }
          that.index[toIndex-1].active = true
        })

      })

   },
    data () {
      return {
        index: [],
        msg: 'Welcome to Your Vue.js App',
        pageIndex: 1,
        begin: false
      }
    },
    methods:{
      down(){
            var index = this.index.findIndex(function (value) {
              return  value.active === true
            })
            console.log(index)
          //如果index 是最后一个
        if(index === this.index.length - 1){
                console.log('最后一个 ')
                this.$set(this.index, index, {
                    id: index + 1,
                    active: false
                })
                this.$set(this.index, 0,  {
                    id: index + 1,
                    active: true
                })
                this.pageIndex = 1;
          }else if(index !== this.index.length -1){
            this.$set(this.index, index, {
                  id: index + 1,
                  active: false
            })
            this.$set(this.index, index+1, {
                  id: index + 1 + 1,
                  active: true
            })
            this.pageIndex += 1
          }


            },
      changePage(index){
            this.pageIndex = index + 1;
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .is-text.is-finish{
      background-color: #323A45;
    border-color: #323A45;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
#index{
  overflow-y: hidden;
  height: calc(100vh - 56px)!important;
  width: 100%;
  background-color: #fff;
  position: relative;
  span{
    display: inline-block;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    border:1px solid #323A45;
    box-sizing: border-box;
    text-align:center;
    line-height:36px;
    position: fixed;
    left: 50%;
    margin-left: -18px;
    bottom:100px;
    color: #323A45;
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
    cursor: pointer ;
  }
}
</style>
