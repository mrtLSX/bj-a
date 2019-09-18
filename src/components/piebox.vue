<template>
  <div class="piebox">
    <div class="lable">{{ val }}<span v-if="percent">%</span></div>
    <div ref="pie" id="pie_wrap"></div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
export default {
  name: 'piebox',
  props: {
    title: { type: String, required: true }, //标题
    val: { type: Number, required: true }, //半分比
    percent: { type: Boolean, required: true, default: false } //是否显示百分比
  },
  mounted() {
    // 初始化饼图
    this.initPie();
  },
  watch: {
    // 监听val变化,变化饼图变化
    val: function() {
      this.initPie();
    }
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    // 初始化饼图方法
    initPie() {
      let data = [];
      if (this.percent) {
        //空中饼状图的显示方式
        // data: [{ value: 30, name: "" }, { value: 100, name: "" }]
        data.push({ value: this.val, name: '' });
        data.push({ value: 100 - this.val, name: '' });
      } else {
        data.push({ value: 0, name: '' });
        data.push({ value: 100, name: '' });
      }
      // 基于准备好的dom，初始化echarts实例,必须设置盒子宽高
      let myChart = echarts.init(this.$refs.pie);
      // 绘制图表
      myChart.setOption({
        color: ['green', '#ccc'],
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['95%', '100%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
                textStyle: {
                  fontSize: '48',
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin hwwrap {
  width: px2rem(175);
  height: px2rem(175);
}
.piebox {
  position: relative;
  text-align: center;
  .lable {
    line-height: px2rem(175);
    @include hwwrap;
    left: 0;
    top: 0;
    position: absolute;
    font-size: px2rem(48);
    font-weight: 700;
    color: #000000;
    // 设置饼图宽高
    span {
      vertical-align: super;
      font-size: $text-size-small;
      font-weight: normal;
    }
  }
  #pie_wrap {
    @include hwwrap;
    position: relative;
  }
  h3 {
    text-align: center;
    font-size: $text-size;
    font-family: 'PingFang SC';
    padding: px2rem(27) 0 px2rem(52);
  }
}
</style>
