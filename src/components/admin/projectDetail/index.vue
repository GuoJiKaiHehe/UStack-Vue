<template>
  <div class="tpl-content-wrapper">
    <wrapheader Title="项目首页" Name="uconnect" Title_sec="项目首页"></wrapheader>
    <div class="row-content am-cf">

      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
          <span style="line-height: 36px;">项目名称: {{set_user_project.title}}</span>

        </div>
        <div  class="text item">
          <li>创建时间: {{set_user_project.created_at}}</li>
          <li>项目描述: {{set_user_project.description}}</li>
          <li v-if="set_user_project.projectTypeId">项目类型: {{set_user_project.projectTypeId.title}}</li>
          <li v-for="(value, key) in set_user_project.sysconfigs">{{key}}: {{value}}</li>
          <!--<li>传感器: {{set_user_project.sysconfigs}}</li>-->
        </div>
      </el-card>
    </div>
    <div class="row-content am-cf">

      <div class="row">

        <!--类型选项-->

        <!--类型选项结束-->

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
          <div class="widget am-cf" style="min-height: 536px;">
            <div class="widget-head am-cf" style="position: relative;">
              <div class="widget-title am-fl" >设备管理</div>
              <div>
                <div class="widget-function am-fr" >
                  <a class="am-btn am-btn-primary am-btn-xs js-modal-open" href="#"  style="color: #fff;" >
                    添加
                  </a>
                  <!--添加项目-->
                  <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal">
                    <div class="am-modal-dialog"  >
                      <div class="am-modal-hd">添加设备
                        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                      </div>
                      <div class="am-modal-bd">

                        <form class="am-form tpl-form-line-form">
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">设备名称 </label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.title" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">设备描述</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.description" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">所属项目</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input":disabled="true" :value="set_user_project.title" id="user-name">

                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">设备类型</label>
                            <div class="am-u-sm-9">
                              <select name=""  v-model="add_device_data.deviceTypeId">
                                <option :value="item._id"  v-for="item in devicetypes.data">{{item.title}}</option>
                              </select>
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">设备状态</label>
                            <div class="am-u-sm-9">
                              <select name=""  v-model="add_device_data.state">
                                <option value="1">在线</option>
                                <option value="2">断开</option>
                              </select>
                            </div>
                          </div>

                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">设备编号</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.deviceNum" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">地理位置</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.position" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">经度</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.longitude" id="user-name">
                            </div>
                          </div>
                          <div class="am-form-group">
                            <label for="user-name" class="am-u-sm-3 am-form-label">维度</label>
                            <div class="am-u-sm-9">
                              <input type="text" class="tpl-form-input" v-model="add_device_data.latitude" id="user-name">
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
                  <th>设备名称</th>
                  <th>所属项目</th>
                  <th>设备描述</th>
                  <th>设备状态</th>
                  <th>设备类型</th>
                  <th>设备编号</th>
                  <th>地理位置</th>
                  <th>经度</th>
                  <th>维度</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody style="position: relative;">
                <tr class="gradeX" v-for="item in devices.data" v-if="devices.data">
                  <td>{{ item.title }}</td>
                  <td>{{ set_user_project.title}}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.state==1? '在线':'断开' }}</td>
                  <td>{{ item.deviceTypeId.title }}</td>
                  <td>{{ item.deviceNum }}</td>
                  <td>{{ item.position }}</td>
                  <td>{{ item.longitude }}</td>
                  <td>{{ item.latitude }}</td>
                  <td>
                    <div class="tpl-table-black-operation">
                      <!--<a href="javascript:;" @click="set_item(item._id,item.projectTypeId._id)">-->
                        <!--<i class="am-icon-pencil"></i> 编辑-->
                      <!--</a>-->
                      <!--<a @click="del_item(item._id)" href="javascript:;" class="tpl-table-black-operation-del">-->
                        <!--<i class="am-icon-trash"></i> 删除-->
                      <!--</a>-->
                      <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        操作<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item  :command="item._id + '&edit'">编辑</el-dropdown-item>
                          <el-dropdown-item  :command="item._id + '&delete'">删除</el-dropdown-item>
                          <el-dropdown-item  :command="item._id + '&detail'">详情</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </td>
                </tr>

                <!-- more data -->
                </tbody>
              </table>

            </div>
          </div>
          <el-pagination
            class="am-container"
            style=" color:#20a0ff; text-align: center;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.req_data.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="this.req_data.limit"
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
            <div class="am-modal-hd" >编辑设备
              <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
            </div>
            <div class="am-modal-bd">

              <form class="am-form tpl-form-line-form">
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">设备名称 </label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.title" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">设备描述</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.description" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">所属项目</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input":disabled="true" :value="set_user_project.title" id="user-name">

                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">设备类型</label>
                  <div class="am-u-sm-9">
                    <select name=""  v-model="add_device_data.deviceType_id">
                      <option :value="item._id"  v-for="item in devicetypes.data">{{item.title}}</option>
                    </select>
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">设备状态</label>
                  <div class="am-u-sm-9">
                    <select name=""  v-model="add_device_data.state">
                      <option value="1">在线</option>
                      <option value="2">断开</option>
                    </select>
                  </div>
                </div>

                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">设备编号</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.deviceNum" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">地理位置</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.position" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">经度</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.longitude" id="user-name">
                  </div>
                </div>
                <div class="am-form-group">
                  <label for="user-name" class="am-u-sm-3 am-form-label">维度</label>
                  <div class="am-u-sm-9">
                    <input type="text" class="tpl-form-input" v-model="add_device_data.latitude" id="user-name">
                  </div>
                </div>
                <div class="am-container" style="margin-top: 25px;">

                  <button  type="button" class="am-btn am-btn-primary tpl-btn-bg-color-success" @click="editbtn">提交</button>

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
  import { mapState, mapActions,mapGetters } from 'vuex'
  import deleteitem from '../../utils/delete/index.vue'
  import wrapheader from '../../common/contentHeader.vue'
  export default {
    components: { deleteitem,wrapheader },
    name: 'projectDetail',
    data () {
      return {
        add_project_data:"",
        formInline: {},
        add_device_data: {},
        add_project_sysconfigs_data:{},
        iswait:true,
        req_data: {
          page: 1,
          limit: 10,
          projectId:""
        },
        option_type: "",
        userid: this.$store.state.auth.user._id,
        value5:"",
        device_type:"",
        editid:"",
        device_true:[]
      }
    },
    computed: {
      ...mapState({
        type: ({projectType}) => projectType.type,
        user_project: ({project}) => project.project,
        set_user_project: ({project}) => project.set_user_project,
        set_project: ({projectType}) => projectType.set_project,
        sysconfigs: ({projectConfig}) => projectConfig.sysconfigs,
        devices: ({device}) => device.devices,
        user: ({auth}) => auth.user,
        devicetypes: ({deviceTypes}) => deviceTypes.devicetypes,
        set_device: ({device}) =>
            device.set_device
        ,
      }),
    },
    mounted: function () {
      this.req_data.projectId = this.$route.query.id
      var that = this;
      this.$nextTick(function () {
        // 添加项目类型窗口
        var $modal = $('#your-modal');
        // console.log($modal, 'modaldal')
        $modal.siblings('.am-btn').on('click', function (e) {
            console.log('点击了')
          that.add_device_data = {}
          $modal.modal({
            closeViaDimmer: false,
            dimmer: false,
            closeOnConfirm: true,
            onConfirm: function () {
//              console.log(that.add_project_sysconfigs_data,'data')
              that.add_device_data.projectId = that.req_data.projectId
              var obj = {
                  data: that.add_device_data,
                  req_data: that.req_data
              }
              that.add_device(obj)
              $modal.modal('close');
              that.add_device_data = {};
              that.value5 = ""
            }
          });
        });
        that.get_all_pro()
        that.get_sysconfigs()
        that.get_devicetypes()
      })
    },
    watch:{
      set_device:{
        handler: function (val, oldVal) {
            console.log(val,'set_device改变了');
          this.add_device_data = this.set_device;
          var type  = JSON.stringify(val);

          var arr1=[];
          this.value5 = arr1;
          this.device_type = type
//          this.value5 = this.set_device.subDevices.forEach(function (x,index,array) {
//            //console.log(index,array)
//          })
        },
        deep: true
      },
      set_user_project(){
        this.add_project_data = this.set_user_project
        this.options_type = this.add_project_data.projectTypeId._id;
        this.add_project_sysconfigs_data = this.add_project_data.sysconfigs
      },
      options_type(val){
        this.get_project_sysconfigs(this.req_data)
      },
      user(val){
          this.userid = val._id
//        this.get_user_project({
//          userId: val._id
//        });
      },
      devices:{
        handler: function (val, oldVal) {
            console.log('获取到devicess')
          this.iswait = false;
            console.log('改变状态',this.iswait)
//          this.device_true = val.data || [];
//          this.device_true.forEach(function (item,index,array) {
//            item.state = item.state == 1 ? '在线' : '下线'
//          })
        },
        deep: true
      },
      option_type(val){
        this.req_data.projectTypeId = val;
        this.get_project_sysconfigs(this.req_data)
      }
    },
    methods: {
      ...mapActions([
        'del_item_vuex',
        'update_project',
        'get_user_project_info',
        'get_project_info',
        'get_project_sysconfigs',
        'add_project_sysconfigs',
        'put_project_sysconfigs',
        'del_item_vuex',
        'get_devices',
        'get_user_project',
        'getUserInfo',
        'get_devicetypes',
        'add_device',
        'get_device_info',
        'put_device'
      ]),
      handleCommand(val) {
          console.log(val);
          console.log("点击了")
        var pox = val.indexOf('&')
        var id = val.substring(0,pox);
        var go = val.substring(pox+1);
        if(go === 'edit'){
          this.set_item(id);
        }else if (go === 'delete'){
          this.del_item(id);
        }else if(go === 'detail'){
          this.$router.push('device_detail?id='+id)
        }
      },
      change_type(val){
//        console.log("安徽")
        console.log(val)
      },
      get_type() {
//          console.log('点击了')
        this.req_data.projectTypeId = this.option_type
        this.get_project_sysconfigs(this.req_data);
      },
      get_all_pro() {
          var that = this;
       this.get_user_project_info(this.req_data.projectId)

        this.get_devices(this.req_data);

      },
      get_sysconfigs(){
        //console.log(this.req_data,'test')
        this.get_project_sysconfigs(this.req_data);
      },
      handleSizeChange(val) {

        this.req_data.limit = val;
        this.get_project_sysconfigs(this.req_data);
      },
      handleCurrentChange(val) {
        this.req_data.page = val;
        this.get_project_sysconfigs(this.req_data);
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
          console.log('进入删除逻辑',id)
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
          id:id,
          type:'device'
        })

      },
      set_item(id,typeid){
        var that = this;
        this.editid = id
        this.add_device_data={};
        this.get_device_info(id);
        var $modal = $('#your-modal2');
        $modal.modal({
          closeViaDimmer: false,
          dimmer: false,
          closeOnConfirm: true,
          onConfirm: function () {

//            console.log("")
          }
        });
      },
      editbtn(){
          var that = this
        var $modal = $('#your-modal2');
        var id = this.editid
        that.add_device_data.subDevices = that.value5 || []

        var data = {
          id: id,
          obj:that.add_device_data
        }
//            console.log(data)
        that.put_device(data);
        $modal.modal('close');
        this.value5=""
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
