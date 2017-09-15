<template>
  <!-- 内容区域 -->
  <div>
    <el-dialog
      title="提示"
      :visible="display"
      size="tiny"
      :before-close="handleClose"
     >
      <span>确认删除?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="user_cancel">取 消</el-button>
    <el-button type="primary" @click="user_confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'delete',
    props:['display'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App1',
        dialogVisible: false
      }
    },
    watch:{
      display(newVal){
        this.$emit('update:display', newVal )
      }
    },
    computed: {
      ...mapState({
        delete_id: ({ delete_item }) => delete_item.id,
        delete_type: ({ delete_item }) => delete_item.type,
      })
    },
    methods:{
      ...mapActions([
        'del_people',
        'del_project',
        'del_projectType',
        'del_sysconfig',
        'del_sensortypes',
        'del_user_project',
        'delDeviceType',
        'del_device',
        'delAreaType',
        'del_classification',
        'del_people',
        'delSensorType'
      ]),
      handleClose(done) {
        this.display = false
      },
      user_cancel(){
        this.display = false
      },
      user_confirm(){

        if(this.delete_type === 'people'){
          this.del_people(this.delete_id)
        }else if(this.delete_type === 'project'){
          //console.log('删除组件:',this.delete_id)
          this.del_project(this.delete_id)
        }else if(this.delete_type === 'sysconfig'){
          this.del_sysconfig(this.delete_id)
        }else if(this.delete_type ==='sensortypes'){
          this.del_sensortypes(this.delete_id)
        }else if(this.delete_type ==='user_project'){
          this.del_user_project(this.delete_id)
        }else if(this.delete_type ==='deviceType'){
          this.delDeviceType(this.delete_id)
        }else if(this.delete_type === 'device'){
          this.del_device(this.delete_id)
        }else if(this.delete_type === 'areaType'){
          this.delAreaType(this.delete_id)
        }else if(this.delete_type === 'classification'){
          this.del_classification(this.delete_id)
        }else if(this.delete_type === 'projectType'){
          this.del_projectType(this.delete_id)
        }else if(this.delete_type === 'people'){
          this.del_people(this.delete_id)
        }else if(this.delete_type === 'sensorType'){
          this.delSensorType(this.delete_id)
        }


        this.display = false
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
