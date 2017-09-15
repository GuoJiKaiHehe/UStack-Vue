<template>
  <div class="tpl-content-wrapper">
    <!--内部头部-->
    <wrapheader Title="场景类型管理" Name="uconnect" Title_sec="场景类型管理"></wrapheader>
    <!--内部头部结束-->

    <!--内部warper-->
    <div class="row-content am-cf">

      <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf">
            <!--增加按钮 和 表head-->
            <div class="widget-head am-cf">
              <div class="widget-title am-fl">场景类型管理</div>
              <div>
                <div class="widget-function am-fr">
                  <a class="am-btn am-btn-primary am-btn-xs " @click="addForm('form')" href="#" style="color: #fff;">
                    添加
                  </a>
                  <!--添加项目-->

                  <!--添加项目结束-->
                </div>
              </div>
            </div>
            <!--增加按钮 和 表head 结束-->
            <!--表单-->
            <div class="widget-body  widget-body-lg am-fr" style="height: 100%; " id="form-body">
              <template>
                <el-table :data="areaType.data" stripe style="width: 100%">
                  <el-table-column prop="title" label="名称" width="180">
                  </el-table-column>
                  <el-table-column prop="description" label="描述" width="180">
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
            <!--表单结束-->

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
  name: 'areaType',
  data() {
    return {
      editid: "",
      iswait: true,
      dialogFormVisible: false,
      form: {
        title: '',
        description: ''
      },
      form_title: '',
      rules: {
        title: [
          { required: true, message: '请输入场景类型', trigger: 'blur' },
        ]
      },
      formLabelWidth: '80px',
      delDialog: false
    }
  },

  computed: {
    ...mapState({
      setAreaType: ({ areaType }) => areaType.type,
      areaType: ({ areaType }) => areaType.allType,
    })
  },
  mounted: function() {
    this.$nextTick(function() {
      // 添加项目类型窗口

    });
    this.getAllAreaType()
  },
  watch: {
    setAreaType: {
      handler: function(val, oldVal) {
        //          console.log(val,'project_type数据来了');
        this.form = this.setAreaType.data
      },
      deep: true
    },
    devicetypes: {
      handler: function(val, oldVal) {
        //          console.log(val,'project_type数据来了');
        this.iswait = false;
      },
      deep: true
    }

  },
  methods: {
    ...mapActions([
      'addAreaType',
      'del_item_vuex',
      'updateAreaType',
      'getAreaTypeInfo',
      'getAllAreaType',
    ]),
    // 增
    addForm(formName) {
      var that = this
      this.form_title = '添加场景类型'
      this.dialogFormVisible = true
      setTimeout(function() {
        that.$refs[formName].resetFields()
      }, 0)
      this.form = {}
    },
    // 改
    handleEdit(index, row) {
      this.getAreaTypeInfo(row._id)
      this.editid = row._id
      this.form_title = '编辑场景类型'
      this.dialogFormVisible = true

    },
    // 删
    handleDelete(index, row) {
      this.delDialog = true
      this.delid = row._id
      this.del_item_vuex({
        id: row._id,
        type: 'areaType'
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          if (this.form_title === '添加场景类型') {
            this.addAreaType(this.form)
          } else {
            var data = {
              obj: this.form,
              id: this.editid
            }
            this.updateAreaType(data)
          }
          this.dialogFormVisible = false
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
