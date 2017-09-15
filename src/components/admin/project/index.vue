<template>
  <div class="tpl-content-wrapper">
    <!--内部头部-->
    <wrapheader Title="用户项目管理" Name="uconnect" Title_sec="用户项目管理"></wrapheader>
    <!--内部头部结束-->
    <!--内部warper-->
    <div class="row-content am-cf">

      <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf">
            <!-- 表head-->
            <div class="widget-head am-cf">
              <div class="widget-title am-fl">用户项目管理</div>
            </div>
            <!--增加按钮 和 表head 结束-->
            <!--表单-->
            <div class="widget-body  widget-body-lg am-fr" style="height: 100%; " id="form-body">
              <template>
                <el-row :gutter="20">
                  <el-col :span="6" v-for="item in projects.data" :key="item._id" style="position: relative">
                    <el-dropdown style="position: absolute; right: 60px; top: 10px; color:#3bb4f2">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
                      <el-dropdown-menu slot="dropdown" style="">
                        <el-dropdown-item :command="item._id + '&edit'">编辑</el-dropdown-item>
                        <el-dropdown-item divided :command="item._id + '&delete'">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <div class="grid-content bg-purple" style="height: 250px;" @click="ProjectDetail(item._id)">
                      <img :src="item.img" alt="" style="width: 80%; height: 200px;">
                      <div class="project_font">
                        <span> {{item.title}}/ </span>
                        <span> {{item.projectTypeId.title}} </span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div @click="add_form('form')" class="grid-content bg-purple list_end"
                         style="height: 250px; font-size: 65px;  font-weight:bold;">+
                    </div>
                  </el-col>
                </el-row>
              </template>
              <!--分页开始-->
              <!--<el-pagination-->
              <!--class="am-container"-->
              <!--style=" color:#20a0ff; "-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="1"-->
              <!--:page-sizes="[10, 20, 30, 40]"-->
              <!--:page-size="10"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="10">-->
              <!--</el-pagination>-->
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
        <el-form-item label="项目名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否订制" :label-width="formLabelWidth">
          <el-switch
            v-model="form.top"
            on-text=""
            off-text="">
          </el-switch>
        </el-form-item>
        <el-form-item label="项目类型" :label-width="formLabelWidth">
          <el-select v-model="form.projectTypeId" placeholder="请选择" style="width: 100%"  change="changeProjectType">
            <el-option
              v-for="item in projectTypes"
              :key="item._id"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
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
  import {mapState, mapActions} from 'vuex'
  import deleteitem from '../../utils/delete/index.vue'
  import wrapheader from '../../common/contentHeader.vue'

  export default {
    components: {deleteitem, wrapheader},
    name: 'project',
    data() {
      return {
        editid: "",
        iswait: true,
        dialogFormVisible: false,
        form: {
          title: '',
          description: '',
          top:false,
          projectTypeId: '',
          sysconfigs:[]
        },
        form_title: '',
        rules: {
          title: [
            {required: true, message: '请输入用户项目', trigger: 'blur'},
          ],
//          type: [
//            { required: true, message: '请选择项目类型', trigger: 'change' },
//          ]
        },
        formLabelWidth: '80px',
        delDialog: false
      }
    },

    computed: {
      ...mapState({
        set_project: ({project}) => project.set_project,
        projects: ({project}) => project.projects,
        projectTypes: ({projectType}) => projectType.projectTypes,
        sysconfigs: ({projectConfig}) => projectConfig.sysconfigs,
      })
    },
    mounted: function () {
      this.$nextTick(function () {
        // 添加项目类型窗口

      });
      // 获取所有项目类型
      this.get_projectTypes()
      this.get_projects()
      this.get_sysconfigs()
    },
    watch: {
      set_project: {
        handler: function (val, oldVal) {
//          console.log(val,'project_type数据来了');
          this.form = this.set_project
        },
        deep: true
      },
    },
    methods: {
      ...mapActions([
        'del_item_vuex',
        'get_projectTypes',
        'add_project',
        'get_projects',
        'get_project_info',
        'update_project',
        'get_sysconfigs',
        'changeProjectState'
      ]),
      // 增
      add_form(formName) {
        var that = this
        this.form_title = '添加用户项目'
        this.dialogFormVisible = true
        setTimeout(function () {
          that.$refs[formName].resetFields()
        }, 0)
      },
      // 改
      handleEdit(index, row) {
        this.get_project_info(row._id)
        this.editid = row._id
        this.form_title = '编辑用户项目'
        this.dialogFormVisible = true

      },
      // 删
      handleDelete(index, row) {
        this.delDialog = true
        this.delid = row._id
        this.del_item_vuex({
          id: row._id,
          type: 'project'
        })
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            if (this.form_title === '添加用户项目') {
              this.add_project({
                title: this.form.title,
                description: this.form.description,
                projectTypeId: this.form.projectTypeId
              })
            } else {
              var data = {
                obj: {
                  title: this.form.title,
                  description: this.form.description,
                  projectTypeId: this.form.projectTypeId
                },
                id: this.editid
              }
              this.update_project(data)
            }
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ProjectDetail(id){
        var that = this
        setTimeout(function () {
          console.log(id)
          localStorage.projectId = id
          that.changeProjectState()
        },0)

        this.$router.push('userManage')
      },
      changeProjectType(value){
        console.log(value+'1111')
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
    > div:nth-child(1) {

    }
    > div:nth-child(2) {

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .bg-purple {
    border-radius: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .grid-content {
    min-height: 36px;
  }

  .grid-content img {
    border-radius: 10px;
  }

  .list_end {
    border: 1px dashed black;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .project_font {
    font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", "微软雅黑", sans-serif;
  }

  .bg-purple:hover {
    background: rgba(200, 200, 200, 0.2);
  }
</style>
