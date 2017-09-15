<template>
  <div class="tpl-content-wrapper">

    <div class="container-fluid am-cf">
      <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-9">
          <div class="page-header-heading"><span class="am-icon-home page-header-heading-icon"></span> 图表
            <small>Amaze UI</small>
          </div>
          <p class="page-header-description">图表组件使用的是 <a href="http://echarts.baidu.com">百度图表echarts</a>。</p>
        </div>

      </div>

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
    <div class="row-content am-cf">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">电费统计</div>

          <div class="widget-function am-fr">
            <a href="javascript:;" class="am-icon-cog"></a>
          </div>
        </div>
        <div class="widget-body am-fr">
          <div style="height: 400px" id="tpl-echarts-C">

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import echarts from '../../../static/js/echarts.min.js'
  export default {
    name: 'b',
    data () {
      return {
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
        }



      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中

        var echartsC = echarts.init(document.getElementById('tpl-echarts-C'));
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        var optionC = {
          tooltip: {
            trigger: 'axis'
          },

          legend: {
            data: ['平均温度']
          },
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 1000,

              axisLabel: {
                formatter: '{value} $'
              }
            },

            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 1000,

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
              data: [300, 200, 400, 199, 333, 255, 200, 600, 700, 180, 190, 900]
            }
          ]
        };

        echartsC.setOption(optionC);
        echartsA.setOption(this.optionA);

      })
    },
    methods: {
      mon1: function (event) {
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
       this.optionA.series[0].data = this.mon[this.selected]
        echartsA.setOption(this.optionA);
//        console.log(this.optionA)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
