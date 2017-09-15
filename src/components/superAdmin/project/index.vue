<template>
  <div class="tpl-content-wrapper">
    <wrapheader Title="用户项目管理" Name="uconnect" Title_sec="用户项目管理"></wrapheader>
    <div class="row-content am-cf">

      <div class="row">

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf" style="min-height: 536px;">
            <div class="widget-head am-cf" style="position: relative;">
              <div class="widget-title am-fl">用户项目管理</div>
              <div>
                <div class="widget-function am-fr">
                  <!--<a class="am-btn am-btn-primary am-btn-xs js-modal-open" href="#"  style="color: #fff;">-->
                  <!--添加-->
                  <!--</a>-->
                  <!--添加项目-->
                  <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal">
                    <div class="am-modal-dialog" style="background-color: #333">
                      <div class="am-modal-hd">添加项目
                        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                      </div>
                      <div class="am-modal-bd">

                        <form class="am-form tpl-form-line-form">
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">项目名称 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" id="user-name" v-model="add_project_data.title">

                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">项目描述 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" id="user-name" v-model="add_project_data.description">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-intro" class="am-u-sm-3 am-form-label">置顶</label>
                            <div class="am-u-sm-9">
                              <div class="tpl-switch">
                                <input type="checkbox" style="left: 0;" class="ios-switch bigswitch tpl-switch-btn" v-model="add_project_data.top">
                                <div class="tpl-switch-btn-view">
                                  <div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">项目类型 </label>
                            <div class="am-u-sm-9">
                              <select name="" id="" v-model="options_type">
                                <option :value="item._id" v-for="item in type">{{item.title}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="am-form-group" v-for="item in sysconfigs.data " v-show="options_type">
                            <label for="user-name" class="am-u-sm-3 am-form-label">{{item.value}} </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" id="user-name" v-model="add_project_sysconfigs_data[item.key]">
                            </div>
                          </div>

                          <div class="am-container" style="margin-top: 25px;">

                            <button type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success" data-am-modal-confirm>提交</button>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!--添加项目结束-->
                </div>
              </div>
            </div>

            <div class="widget-body  widget-body-lg am-fr">
              <!--loading开始-->
              <table width="100%" class="am-table am-table-compact am-table-striped tpl-table-black " id="example-r" v-loading=i swait element-loading-text="拼命加载中">
                <!--loading结束-->
                <!--表头-->
                <thead>
                  <tr>
                    <th>项目名称</th>
                    <th>项目类型</th>
                    <th>项目简介</th>
                    <th>项目所属者</th>
                  </tr>
                </thead>
                <tbody style="position: relative;">
                  <tr class="gradeX" v-for="item in project.data">
                    <td>{{ item.title }}</td>
                    <td>{{ item.projectTypeId.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.userId.name }}</td>
                    <td>
                      <div class="tpl-table-black-operation">
                        <!--<a href="javascript:;" @click="set_item(item._id)">-->
                        <!--<i class="am-icon-pencil"></i> 编辑-->
                        <!--</a>-->
                        <a @click="del_item(item._id)" href="javascript:;" class="tpl-table-black-operation-del">
                          <i class="am-icon-trash"></i> 删除
                        </a>
                      </div>
                    </td>
                  </tr>
                  <!-- more data -->
                </tbody>
              </table>

            </div>
          </div>
          <!--分页开始-->
          <el-pagination class="am-container" style=" color:#20a0ff; text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="10">
          </el-pagination>
          <!--分页结束-->
        </div>
        <!--删除弹窗-->
        <deleteitem></deleteitem>
        <!--删除弹窗结束-->
        <!--编辑弹框-->
        <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal2">
          <div class="am-modal-dialog" style="background-color: #333">
            <div class="am-modal-hd" style="color: #fff;">编辑项目
              <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
            </div>
            <div class="am-modal-bd">

              <form class="am-form tpl-form-line-form">
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">项目类型
                    <span class="tpl-form-line-small-title">name</span>
                  </label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_project_data.title" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">项目简介
                    <span class="tpl-form-line-small-title">des</span>
                  </label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_project_data.description" id="user-name">
                  </div>
                </div>
                <div class="am-container" style="margin-top: 25px;">

                  <button type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success" data-am-modal-confirm>提交</button>

                </div>
              </form>
            </div>
          </div>
        </div>

        <!--编辑弹框结束-->
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import deleteitem from '../../utils/delete/index.vue'
import wrapheader from '../../common/contentHeader.vue'
export default {
  components: { deleteitem, wrapheader },
  name: 'superAdminProject',
  data() {
    return {
      formInline: {},
      add_project_data: {},
      add_project_sysconfigs_data: {},
      iswait: true,
      req_data: {
        page: 1,
        limit: 10,
        projectTypeId: '',
      },
      options_type: "",
      sysconfigs_data: {}
    }
  },
  computed: {

    ...mapState({
      type: ({ projectType }) => projectType.type,
      set_project: ({ projectType }) => projectType.set_project,
      sysconfigs: ({ projectConfig }) => projectConfig.sysconfigs,
      project: ({ project }) => project.project,
    })
  },
  mounted: function() {
    var that = this;
    this.$nextTick(function() {
      // 添加项目类型窗口
      var $modal = $('#your-modal');
      $modal.siblings('.am-btn').on('click', function(e) {
        that.options_type = ""
        that.add_project_data = {}
        //          console.log('点击了')
        $modal.modal({
          closeViaDimmer: false,
          dimmer: false,
          closeOnConfirm: true,
          onConfirm: function() {

            that.add_project_data.projectTypeId = that.options_type;
            var sysconfigs = JSON.stringify(that.add_project_sysconfigs_data)
            that.add_project_data.sysconfigs = sysconfigs;
            //console.log(that.add_project_data)
            that.add_user_project(that.add_project_data)
            $modal.modal('close');
          }
        });
      });
      that.get_all_pro()
    })
  },
  watch: {
    set_project() {
      this.add_project_data = this.set_project
    },
    options_type(val) {
      this.req_data.projectTypeId = val;
      this.get_project_sysconfigs(this.req_data)
    },
    project: {
      handler: function(val, oldVal) {
        this.iswait = false;
      },
      deep: true
    }

  },
  methods: {
    ...mapActions([
      'get_all_project',
      'add_project',
      'del_item_vuex',
      'update_project',
      'get_project_info',
      'get_project_sysconfigs',
      'get_user_project',
      'add_user_project'
    ]),
    get_all_pro() {
      this.get_user_project(this.req_data);
      this.get_all_project();
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
    onSubmit() {
      // this.get_all_people(this.req_data);
    },
    onCancel() {
      //        var obj = {}
      //        obj.page = this.req_data.page,
      //          obj.limit = this.req_data.limit;
      //        this.get_all_people(obj);
    },

    del_item(id) {
      //        console.log(id);
      var $modal2 = $('.my-confirm');
      var that = this
      $modal2.modal({
        closeViaDimmer: false,
        dimmer: false,
        closeOnConfirm: true,
        relatedTarget: this,
      })
      this.del_item_vuex({
        id: id,
        type: 'user_project'
      })

    },
    set_item(id) {
      var that = this;
      this.add_project_data = {};
      this.get_project_info(id);
      var $modal = $('#your-modal2');
      $modal.modal({
        closeViaDimmer: false,
        dimmer: false,
        closeOnConfirm: true,
        onConfirm: function() {
          var data = {
            id: id,
            obj: {
              title: that.add_project_data.title,
              description: that.add_project_data.description
            }

          }
          that.update_project(data);
          $modal.modal('close');
          //            console.log("")
        }
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
