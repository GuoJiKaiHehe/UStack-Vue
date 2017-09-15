<template>
  <div class="tpl-content-wrapper">
    <!--内部头部-->
    <wrapheader Title="设备类型管理" Name="uconnect" Title_sec="设备类型管理"></wrapheader>
    <!--内部头部结束-->
    <!--内部warper-->
    <div class="row-content am-cf">

      <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf">
            <!--增加按钮 和 表head-->
            <div class="widget-head am-cf">
              <div class="widget-title am-fl">设备类型管理</div>
              <div>
                <div class="widget-function am-fr">
                  <a class="am-btn am-btn-primary am-btn-xs " @click="add_form('form')" href="#" style="color: #fff;">
                    添加
                  </a>
                </div>
              </div>
            </div>
            <!--增加按钮 和 表head 结束-->
            <!--表单展示-->
            <div class="widget-body  widget-body-lg am-fr" style="height: 100%; " id="form-body">
              <template>
                <el-table :data="allDeviceType.data" stripe style="width: 100%">
                  <el-table-column prop="title" label="名称" width="180">
                  </el-table-column>
                  <el-table-column prop="description" label="描述" width="180">
                  </el-table-column>
                  <el-table-column prop="typeNum" label="设备类型编号" width="180">
                  </el-table-column>
                  <el-table-column label="传感器类型" prop="sensortypes" >
                    <template scope="scope">
                      <span v-for="item in scope.row.sensortypes" :key="item._id">{{item.title}} </span>
                    </template>
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
        <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" :label-width="formLabelWidth" prop="typeNum">
          <el-input v-model="form.typeNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="传感器类型" :label-width="formLabelWidth" prop="formSensortypes">
          <el-select v-model="formSensortypes" multiple placeholder="请选择" style="width: 100%">
            <el-option v-for="item in allSensorType.data" :key="item._id" :label="item.title" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="str1" :label-width="formLabelWidth" prop="str1">
          <el-input v-model="form.str1" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="str2" :label-width="formLabelWidth" prop="str2">
          <el-input v-model="form.str2" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="str3" :label-width="formLabelWidth" prop="str3">
          <el-input v-model="form.str3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="str4" :label-width="formLabelWidth" prop="str4">
          <el-input v-model="form.str4" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="num1" :label-width="formLabelWidth" prop="num1">
          <el-input v-model="form.num1" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="num2" :label-width="formLabelWidth" prop="num2">
          <el-input v-model="form.num2" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="num3" :label-width="formLabelWidth" prop="num3">
          <el-input v-model="form.num3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="num4" :label-width="formLabelWidth" prop="num4">
          <el-input v-model="form.num4" auto-complete="off"></el-input>
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import deleteitem from '../../utils/delete/index.vue'
import wrapheader from '../../common/contentHeader.vue'
export default {
  components: { deleteitem, wrapheader },
  name: 'deviceType',
  data() {
    return {
      editid: "",
      iswait: true,
      dialogFormVisible: false,
      form: {
        a: []
      },
      formSensortypes: [],
      form_title: '',
      rules: {
        title: [
          { required: true, message: '请输入设备类型', trigger: 'blur' },
        ],
      },
      formLabelWidth: '80px',
      delDialog: false
    }
  },

  computed: {
    ...mapState({
      deviceType: ({ deviceType }) => deviceType.type,
      allDeviceType: ({ deviceType }) => deviceType.allType,
      allSensorType: ({ sensorType }) => sensorType.allType,
      validSuccess: ({ global }) => global.validSuccess,
    })
  },
  mounted() {
    // this.$nextTick(function() {
    // });
    // 获取所有传感器类型
    this.getAllSensorType()
    // 获取所有设备类型
    this.getAllDeviceType()
  },
  watch: {
    deviceType: {
      handler: function(val, oldVal) {
        this.form = this.deviceType.data
        this.formSensortypes = this.deviceType.data.sensortypes
      },
      deep: true
    },
  },
  methods: {
    ...mapActions([
      'addDeviceType',
      'del_item_vuex',
      'updateDeviceType',
      'getAllSensorType',
      'getAllDeviceType',
      'getDeviceTypeInfo',
    ]),
    // 增
    add_form(formName) {
      var that = this
      this.form_title = '添加设备类型'
      this.dialogFormVisible = true
      setTimeout(function() {
        that.$refs[formName].resetFields()
      }, 0)
      this.form = {}
    },
    // 改
    handleEdit(index, row) {
      this.getDeviceTypeInfo(row._id)
      this.editid = row._id
      this.form_title = '编辑设备类型'
      this.dialogFormVisible = true

    },
    // 删
    handleDelete(index, row) {
      this.delDialog = true
      this.delid = row._id
      this.del_item_vuex({
        id: row._id,
        type: 'deviceType'
      })
    },
    // 提交
    submitForm(formName) {
      this.form.sensortypes = this.formSensortypes
      this.$refs[formName].validate(async (valid) => {
        console.log(valid)
        if (valid) {
          if (this.form_title === '添加设备类型') {
            await this.addDeviceType(this.form)
          } else {
            await this.updateDeviceType({
              id: this.editid,
              obj: this.form
            })
          }
          this.dialogFormVisible = !this.validSuccess
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
<style scoped lang="scss">
#form-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  >div:nth-child(1) {}
  >div:nth-child(2) {

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
