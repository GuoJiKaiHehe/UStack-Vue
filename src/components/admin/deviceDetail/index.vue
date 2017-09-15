<template>
  <div class="tpl-content-wrapper">
    <wrapheader Title="用户设备管理" Name="uconnect" Title_sec="用户设备管理"></wrapheader>
    <div class="row-content am-cf">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
          <span style="line-height: 36px;">设备名称: {{set_device.title}}</span>

        </div>
        <div  class="text item">
          <li>创建时间: {{set_device.created_at}}</li>
          <li>位置: {{set_device.position}}</li>
          <li>设备描述: {{set_device.description}}</li>
          <li>设备编号: {{set_device.deviceNum}}</li>
          <li>经度: {{set_device.latitude}}</li>
          <li>维度: {{set_device.longitude}}</li>
          <li v-if="set_device.projectId">所属项目: {{set_device.projectId.title}}</li>
          <li v-if="set_device.deviceTypeId">设备类型: {{set_device.deviceTypeId.title}}</li>
          <span>传感器: </span>
          <span v-for="item in set_device.sensors">{{item.title}}</span>
          <!--<li>传感器: {{set_device.sysconfigs}}</li>-->
        </div>
      </el-card>
    </div>
    <div class="row-content am-cf">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">月电费统计</div>
          <!--<button type="button" class="am-btn am-btn-primary" value="one" v-model="selected"  v-on:click="greet">一月-->
          <!--</button>-->

          <select v-model="selected" style="color: #4b5357" v-on:click="mon1">
            <option value="Jan">一月</option>
            <option value="Feb">二月</option>
            <option value="Mar">三月</option>
            <option value="Apr">四月</option>
            <option value="May">五月</option>
            <option value="Jun">六月</option>
            <option value="Jul">七月</option>
            <option value="Aug">八月</option>
            <option value="Sep">九月</option>
            <option value="Oct">十月</option>
            <option value="Nov">十一月</option>
            <option value="Dec">十二月</option>
          </select>

          <div class="widget-function am-fr">
            <a href="javascript:;" class="am-icon-cog"></a>
          </div>
        </div>
        <div class="widget-body am-fr">
          <div style="height: 400px" id="tpl-echarts-A">

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import echarts from '../../../../static/js/echarts.min.js'
  import { mapState, mapActions,mapGetters } from 'vuex'
  import deleteitem from '../../utils/delete/index.vue'
  import wrapheader from '../../common/contentHeader.vue'
  export default {
    components: { deleteitem,wrapheader },
    name: 'deviceDetail',
    data () {
      return {
        formInline: {},
        add_device_data: {},
        add_project_sysconfigs_data:{},
        iswait:true,
        req_data: {
          page: 1,
          limit: 10,
          deviceId: '',
        },
        option_type: "",
        userid: this.$store.state.auth.user._id,
        value5:"",
        device_type:"",
        editid:"",
        selected: "Jan",
        mon: {
          Jan: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Feb: [ 1, 8, 3, 33, 22, 1, 20, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22,10],
          Mar: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Apr: [2, 3, 4, 5, 6, 3, 1, 3, 1, 8, 3, 33, 22, 1, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          May: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Jun: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 1, 8, 3, 33, 22, 1, 10, 17, 22],
          Jul: [2, 3, 4, 5, 6, 1, 8, 3, 33, 22, 1, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Aug: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 1, 8, 3, 33, 22, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Sep: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Oct: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1,1, 8, 3, 33, 22, 1, 1, 20, 10, 17, 22,11],
          Nov: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 1, 8, 3, 33, 22, 1, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
          Dec: [2, 3, 4, 5, 6, 3, 1, 1, 8, 3, 33, 22, 1, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
        },
        optionA:{
          tooltip: {
            trigger: 'axis'
          },

          legend: {
            data: ['平均温度']
          },
          xAxis: [{
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
          }],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 33,

              axisLabel: {
                formatter: '{value} $'
              }
            },

            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 33,

              axisLabel: {
                formatter: '{value} $'
              }
            }
          ],
          series: [
            {
              name: '电费',
              type: 'line',
              yAxisIndex: 1,
              data: [2, 3, 4, 5, 6, 3, 1, 3, 4, 4, 6, 5, 7, 6, 2, 2, 3, 1, 4, 1, 1, 8, 3, 33, 22, 1, 20, 10, 17, 22],
            }
          ]
        },
        activeNames: ['1'],
        tableData5: [],
        device_true:[]
      }
    },
    computed: {
      ...mapState({
        type: ({project}) => project.type,
        user_project: ({project}) => project.project,
        set_project: ({project}) => project.set_project,
        sysconfigs: ({project_p}) => project_p.sysconfigs,
        devices: ({device}) => device.devices,
        user: ({auth}) => auth.user,
        devicetypes: ({devicetypes}) => devicetypes.devicetypes,
        set_device: ({device}) =>
          device.set_device
        ,
      }),

    },
    mounted: function () {
      this.req_data.deviceId = this.$route.query.id
      var that = this;
      this.$nextTick(function () {
        // 添加项目类型窗口
        var $modal = $('#your-modal');
        // console.log($modal, 'modaldal')
        $modal.siblings('.am-btn').on('click', function (e) {
          that.add_device_data = {}
//          console.log('点击了')
          $modal.modal({
            closeViaDimmer: false,
            dimmer: false,
            closeOnConfirm: true,
            onConfirm: function () {
//              console.log(that.add_project_sysconfigs_data,'data')

              that.add_device(that.add_device_data)
              $modal.modal('close');
              that.add_device_data = {};
              that.value5 = ""
            }
          });
        });
        that.get_all_pro()
        that.get_sysconfigs()
        that.get_devicetypes()
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        echartsA.setOption(this.optionA);
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
      user(val){
        this.userid = val._id
        this.get_user_project({
          userId: val._id
        });
      },
      devices:{
        handler: function (val, oldVal) {
          this.iswait = false;
          this.device_true = val.data;
          this.device_true.forEach(function (item,index,array) {
             item.state = item.state == 1 ? '在线' : '下线'
          })



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
      mon1: function (event) {
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        this.optionA.series[0].data = this.mon[this.selected]
        echartsA.setOption(this.optionA);
//        console.log(this.optionA)
      },
      handleCommand(val) {
        var pox = val.indexOf('&')
        var id = val.substring(0,pox);
        var go = val.substring(pox+1);
        if(go === 'edit'){
          this.set_item(id);
        }else if (go === 'delete'){
          this.del_item(id);
        }else if(go === 'detail'){
          this.$router.push('index')
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
        this.get_device_info(this.req_data.deviceId)
//        console.log(this.$store.state.auth,'11')
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
        console.log('进入删除逻辑')
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

</style>
