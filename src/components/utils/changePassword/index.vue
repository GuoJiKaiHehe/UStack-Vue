<template>
  <!-- 内容区域 -->
  <div>
    <el-dialog title="修改密码" :modal=true  size="tiny"  :visible.sync="display">
      <el-form :model="changePWD" label-position="left" :rules="rules" ref="changePWD" >
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="old">
          <el-input v-model="changePWD.old" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="new">
          <el-input v-model="changePWD.new" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="again">
          <el-input v-model="changePWD.again" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="display = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('changePWD')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'delete',
    props:['display'],
    data () {
      var validateOld = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空 '));
        }else if(this._old) {
          return callback(new Error('旧密码错误 '));
        }else{
          callback()
        }
      };
      var validateNew = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.changePWD.again !== '') {
            this.$refs.changePWD.validateField('again');
          }
          callback();
        }
      };
      var validateAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.changePWD.new) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        msg: 'Welcome to Your Vue.js App1',
        dialogVisible: false,
        changePWD:{
          old:'',
          new:'',
          again:''
        },
        _old: false,
        formLabelWidth:'110px',
        rules: {
          old: [
            { validator: validateOld, trigger: 'blur' }
          ],
          new: [
            { validator: validateNew, trigger: 'blur' }
          ],
          again: [
            { validator: validateAgain, trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // 添加项目类型窗口

      });
    },
    watch:{
      display(newVal){
        this.$emit('update:display', newVal )
        if(newVal){
          var that = this
          setTimeout(function () {
            that.$refs['changePWD'].resetFields();
            that._old = false
          },0)
        }
      }
    },
    computed: {
      ...mapState({
        username: ({ auth }) => auth.user.name,
      })
    },
    methods:{
      ...mapActions([
        'logout',
      ]),
      submitForm(formName){
        var that = this
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            axios.post(process.env.API_ROOT+'auth/signin',{
              name: that.username,
              password: that.changePWD.old
            })
              .then(function (res) {
                axios.put(process.env.API_ROOT+'users/modifyPassword',{
                  password: that.changePWD.new
                })
                  .then(function (response) {
                    that.display = false
                    setTimeout(function () {
                      that.$message('修改成功,请重新登录');
                      that.logout()
                    },0)
                  })
                  .catch(function (error2) {
                  })
              })
              .catch(function (error) {
                that._old = true
                var msg = 'fuck'
                that.$refs[formName].validateField('old',function (msg) {
                })
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
