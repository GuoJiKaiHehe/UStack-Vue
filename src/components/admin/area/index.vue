<template>
  <div class="tpl-content-wrapper">
    <wrapheader Title="场景管理" Name="uconnect" Title_sec="场景管理"></wrapheader>
    <div class="row-content am-cf">

      <div class="row">

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf" >
            <div class="widget-head am-cf" >
              <div class="widget-title am-fl" >场景管理</div>
              <div>
                <div class="widget-function am-fr">
                  <a class="am-btn am-btn-primary am-btn-xs js-modal-open" href="#"  style="color: #fff;">
                    添加
                  </a>
                  <!--添加项目-->
                  <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal">
                    <div class="am-modal-dialog" >
                      <div class="am-modal-hd">添加场景
                        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                      </div>
                      <div class="am-modal-bd">

                        <form class="am-form tpl-form-line-form">
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">创建场景 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_area_data.title" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">场景简介 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_area_data.description" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">行政区划代码 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_area_data.government_id" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">建筑类别编码 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_area_data.type" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">建筑识别编码 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_area_data.build_verify_id" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">所属项目 </label>
                            <div class="am-u-sm-9">
                              <select name="" id="" v-model="options_type">
                                <option   :value="item._id" v-for="item in type" style="background: #424b4f; color: white;">{{item.title}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">包含的设备 </label>
                            <div class="am-u-sm-9">
                              <el-select v-model="value5" multiple placeholder="请选择" style="width: 100%;">
                                <el-option
                                  v-for="item in sensortypes_type"
                                  :key="item._id"
                                  :label="item.title"
                                  :value="item._id">
                                </el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="am-container" style="margin-top: 25px;">

                            <button  type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success" data-am-modal-confirm>提交</button>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!--添加项目结束-->
                </div>
              </div>
            </div>

            <div class="widget-body  widget-body-lg am-fr" >
              <!--loading开始-->
              <table
                width="100%"
                class="am-table am-table-compact am-table-striped tpl-table-black "
                id="example-r"
                v-loading = iswait
                element-loading-text="拼命加载中"
              >
                <!--loading结束-->
                <!--表头-->
                <thead>
                <tr>
                  <th>设备类型</th>
                  <th>设备类型简介</th>
                  <th>设备类型编号</th>
                  <th>传感器类型</th>
                </tr>
                </thead>
                <tbody style="position: relative;">
                <tr class="gradeX" v-for="item in devicetypes.data">
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.typeNum }}</td>
                  <td><span v-for="sen in item.sensortypes">{{sen.title}} </span></td>
                  <td>
                    <div class="tpl-table-black-operation">
                      <a href="javascript:;" @click="set_item(item._id)">
                        <i class="am-icon-pencil"></i> 编辑
                      </a>
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
          <el-pagination
            class="am-container"
            style=" color:#20a0ff; text-align: center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="10">
          </el-pagination>
          <!--分页结束-->
        </div>
        <!--删除弹窗-->
        <deleteitem></deleteitem>
        <!--删除弹窗结束-->
        <!--编辑弹框-->
        <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal2">
          <div class="am-modal-dialog" >
            <div class="am-modal-hd" >编辑项目
              <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
            </div>
            <div class="am-modal-bd">

              <form class="am-form tpl-form-line-form">
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">项目类型 <span class="tpl-form-line-small-title">name</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_area_data.title"  id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">项目简介 <span class="tpl-form-line-small-title">des</span></label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_area_data.description"  id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">传感器类型 </label>
                  <div class="am-u-sm-9">
                    <el-select v-model="value5" multiple placeholder="请选择" style="width: 100%;">
                      <el-option
                        v-for="item in sensortypes_type"
                        :key="item._id"
                        :label="item.title"
                        :value="item._id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-container" style="margin-top: 25px;">

                  <button  @click="edit_btn" type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success"> 提交</button>

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
    components: { deleteitem,wrapheader },
    name: 'deviceType',
    data () {
      return {
        editid:"",
        formInline: {},
        add_area_data: {},
        iswait:true,
        value5: []
      }
    },

    computed: {
      ...mapState({
        type: ({projectType}) => projectType.type,
        set_devicetype: ({deviceTypes}) => deviceTypes.set_devicetype,
        sensortypes_type: ({sensorTypes}) => sensorTypes.type,
        devicetypes: ({deviceTypes}) => deviceTypes.devicetypes,

      })
    },
    mounted: function () {
      var that = this;
      this.$nextTick(function () {
        // 添加项目类型窗口
        var $modal = $('#your-modal');
        // console.log($modal, 'modaldal')
        $modal.siblings('.am-btn').on('click', function (e) {
          that.add_area_data = {}
//          console.log('点击了')
          $modal.modal({
            closeViaDimmer: false,
            dimmer: false,
            closeOnConfirm: true,
            onConfirm: function () {
//                console.log(that.add_area_data)
              var str = "["+that.value5.join()+"]"
              that.add_area_data.sensortypes = that.value5;
              that.add_devicetype(that.add_area_data)
              $modal.modal('close');
            }
          });
        });
        that.get_all_pro()
      })
    },
    watch:{
      set_devicetype:{
        handler: function (val, oldVal) {
//          console.log(val,'project_type数据来了');
          this.add_area_data = this.set_devicetype
          this.value5 = this.set_devicetype.sensortypes
        },
        deep: true
      },
      devicetypes:{
        handler: function (val, oldVal) {
//          console.log(val,'project_type数据来了');
          this.iswait = false;
        },
        deep: true
      }

    },
    methods: {
      ...mapActions([
        'get_all_project',
        'add_project',
        'add_devicetype',
        'del_item_vuex',
        'update_project',
        'get_devicetype_info',
        'get_devicetypes',
        'get_all_sensortypes',
        'del_devicetype',
        'put_devicetype'
      ]),
      get_all_pro() {
        this.get_devicetypes()
        this.get_all_sensortypes()
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
      onCancel(){
//        var obj = {}
//        obj.page = this.req_data.page,
//          obj.limit = this.req_data.limit;
//        this.get_all_people(obj);
      },

      del_item(id){
//          console.log(id);
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
          type:'devicetype'
        })

      },
      set_item(id){
        var that = this;
        this.editid = id;
        this.add_area_data={};
        console.log('get的id1',id);
        this.get_devicetype_info(id);
        var $modal = $('#your-modal2');
        console.log('get的id2',id);
        $modal.modal({
          closeViaDimmer: false,
          dimmer: false,
          closeOnConfirm: true,
        });
      },
      edit_btn(){
        var $modal = $('#your-modal2');
        var id = this.editid;
        var that= this;
        var data = {
          id: id,
          obj: {
            title: that.add_area_data.title,
            description: that.add_area_data.description,
            sensortypes : that.value5
          }
        }
        that.put_devicetype(data);
        $modal.modal('close');
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
