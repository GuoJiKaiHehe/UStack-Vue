<template>
  <div class="tpl-content-wrapper">
    <el-row>
      <el-col :span="3" class="wrapper-mid">
        <midbar></midbar>
      </el-col>
      <el-col :span="21" class="wrapper-right">
        <div class="tpl-content-wrapper">
          <!--内部头部-->
          <wrapheader Title="成员管理" Name="uconnect" Title_sec="成员管理"></wrapheader>
          <!--内部头部结束-->

          <!--内部warper-->
          <div class="row-content am-cf">

            <div class="row">
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                <div class="widget am-cf">
                  <!--增加按钮 和 表head-->
                  <div class="widget-head am-cf">
                    <div class="widget-title am-fl">成员管理</div>
                    <div>
                      <div class="widget-function am-fr">
                        <a class="am-btn am-btn-primary am-btn-xs " @click="add_form('form')" href="#" style="color: #fff;">
                          添加
                        </a>
                        <!--添加项目-->

                        <!--添加项目结束-->
                      </div>
                    </div>
                  </div>
                  <!--增加按钮 和 表head 结束-->
                  <!--表单展示-->
                  <div class="widget-body  widget-body-lg am-fr" style="height: 100%; " id="form-body">
                    <template>
                      <el-table :data="user.data" stripe style="width: 100%">
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column label="操作">
                          <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                    <!--分页开始-->
                    <el-pagination class="am-container" style=" color:#20a0ff; " @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="10">
                    </el-pagination>
                    <!--分页结束-->
                  </div>
                  <!--表单展示结束-->

                </div>
              </div>
            </div>
          </div>
          <!--内部warper结束-->

          <!--增加&编辑弹框-->
          <el-dialog :title="form_title" :modal=true size="tiny" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-position="left" ref="form" :rules="rules">
              <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="form.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="微信" :label-width="formLabelWidth" prop="weixin">
                <el-input v-model="form.weixin" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="支付宝" :label-width="formLabelWidth" prop="alipay">
                <el-input v-model="form.alipay" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="位置" :label-width="formLabelWidth" prop="position">
                <el-input v-model="form.position" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('form')">提 交</el-button>
            </div>
          </el-dialog>
          <!--增加&编辑弹框结束-->

          <!--删除弹窗-->
          <deleteitem :display.sync="delDialog"></deleteitem>
          <!--删除弹窗结束-->
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import deleteitem from '../../utils/delete/index.vue'
import wrapheader from '../../common/contentHeader.vue'
import midbar from '../../common/midbar/adminPeople.vue'
import api from '../../../api'
export default {
  components: { deleteitem, wrapheader, midbar },
  name: 'userManage',
  data() {
    let validateName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('name不能为空'))
      }
      try {

        let data = this.vaildData('name', value)
        // 判断用户名是否存在
        let valid = await api.validate[this.vaildMethod](data)
        callback()
      } catch (error) {
        // console.log(error)
        callback(new Error(error.data.error_msg))
      }
    };
    let validateEmail = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email不能为空'))
      }
      try {
        let data = this.vaildData('email', value)
        // 判断邮箱是否存在
        let valid = await api.validate[this.vaildMethod](data)
        callback()
      } catch (error) {
        callback(new Error(error.data.error_msg))
      }
    };
    let validatePhone = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'))
      }
      try {
        let data = this.vaildData('phone', value)
        // 判断邮箱是否存在
        let valid = await api.validate[this.vaildMethod](data)
        callback()
      } catch (error) {
        callback(new Error(error.data.error_msg))
      }
    };
    return {
      editid: "",
      iswait: true,
      dialogFormVisible: false,
      form: {
        name: '',
        email: '',
        phone: '',
        weixin: '',
        alipay: '',
        position: '',
        projectId: localStorage.projectId
      },
      form_title: '',
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' },
        ],
      },
      vaildMethod: '',
      formLabelWidth: '80px',
      delDialog: false,
      req_data: {
        page: 1,
        limit: 10,
        projectId: localStorage.projectId
      },
    }
  },

  computed: {
    ...mapState({
      set_people: ({ people }) => people.set_people,
      user: ({ people }) => people.user,
      modelShow: ({ global }) => global.modelShow
    })
  },
  mounted: async function() {
    this.$nextTick(function() {
      // 添加项目类型窗口

    });
    console.log(this.req_data)
    this.get_all_peoples(this.req_data)
  },
  watch: {
    set_people: {
      handler: function(val, oldVal) {
        this.form = this.set_people
      },
      deep: true
    },
    devicetypes: {
      handler: function(val, oldVal) {
        this.iswait = false;
      },
      deep: true
    },
    form_title: {
      handler: function(val, oldVal) {
        if (val === '添加人员') {
          this.vaildMethod = 'userInfo'
        } else {
          this.vaildMethod = 'UpdateInfo'
        }
      },
      deep: true
    }

  },
  methods: {
    ...mapActions([
      'del_item_vuex',
      'add_people',
      'get_all_peoples',
      'get_people_info',
      'update_people'
    ]),
    // 增
    add_form(formName) {
      var that = this
      this.form_title = '添加人员'
      this.dialogFormVisible = true
      setTimeout(function() {
        that.$refs[formName].resetFields()
      }, 0)
    },
    // 改
    handleEdit(index, row) {
      this.get_people_info(row._id)
      this.editid = row._id
      this.form_title = '编辑人员'
      this.dialogFormVisible = true
    },
    // 删
    handleDelete(index, row) {
      this.delDialog = true
      this.delid = row._id
      this.del_item_vuex({
        id: row._id,
        type: 'people'
      })
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.form_title === '添加人员') {
            await this.add_people(this.form)
          } else {
            var data = {
              obj: this.form,
              id: this.editid
            }
            await this.update_people(data)
          }
          this.dialogFormVisible = this.modelShow
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 返回表单检测数据
    vaildData(prop, value) {
      console.log(prop)
      let data;
      if (this.form_title === '添加人员') {
        data = {
          [prop]: value
        }
      } else {
        data = {
          id: this.editid,
          obj: {
            [prop]: value
          }
        }
      }
      console.log(data,'返回的数据')
      return data
    },
    handleSizeChange(val) {
      //
      //        this.req_data.limit = val;
      //        this.get_all_people(this.req_data);
    },
    handleCurrentChange(val) {
      //        this.req_data.page = val;
      //        this.get_all_people(this.req_data);
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
