<template lang="">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>统计图表</span>
      </div>
    </template>

    <el-row>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" id="left" style="width: 600px;height:400px;" />
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light" id="right" style="width: 600px;height:400px;" />
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import * as echarts from 'echarts';
  export default {
    name: "Dashboard",
    mounted() {
      this.initLeftChart();
      this.initRightChart();
    },
    data() {
      return {
        course: [],
        favoriteList: [],
        course2: [],
        favoriteList2: [],
      }
    },
    methods: {
      initLeftChart() {
        this.$http('course').then(res => {
          if (res.status === 200) {
            res.data.forEach(item => {
              this.course.push(item.name);
              this.favoriteList.push(item.favorite);
            })
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('left'));

            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '收藏人数'
              },
              tooltip: {},
              legend: {
                data: ['人数']
              },
              xAxis: {
                data: this.course.slice(0,3)
              },
              yAxis: {},
              series: [{
                name: '人数',
                type: 'bar',
                data: this.favoriteList.slice(0,3)
              }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          } else {
            console.log(res);
          }
        }).catch(err => {
          console.log(err);
        })

      },
      initRightChart() {
        this.$http('course').then(res => {
          if (res.status === 200) {
            res.data.forEach(item => {
              this.course2.push({
                name: item.name,
                value: item.favorite
              });
            })
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('right'));

            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '课程收藏人数',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [{
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: this.course2,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          } else {
            console.log(res);
          }
        }).catch(err => {
          console.log(err);
        })

      }
    },
  }
</script>
<style lang="">

</style>