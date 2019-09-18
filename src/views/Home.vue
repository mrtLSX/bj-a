<template>
  <div class="home">
    <tophead title="SFA">
      <router-link
        to="/user"
        class="icon iconfont icon-user"
        slot="r"
      ></router-link>
    </tophead>
    <div class="main-body">
      <!-- 头部日期盒子 -->
      <div class="date-wrap">{{ getDate }}</div>
      <!-- 顶部饼状图盒子 -->
      <div class="top_pie">
        <piebox
          :val="getDayOfMonth"
          title="月时间进度"
          :percent="true"
        ></piebox>
        <piebox
          :val="mouthSalePercent"
          title="月销售完成度"
          :percent="true"
        ></piebox>
        <piebox :val="shops" title="有效商店数" :percent="false"></piebox>
      </div>
    </div>
    <!-- 主导航区域 -->
    <div class="main-nav">
      <div class="nav-cell" v-for="i in 9" :key="i">
        <template v-if="i <= menuList.length">
          <menu-cell
            :url="menuList[i - 1].url"
            :img-url="menuList[i - 1].imgUrl"
            :menu-name="menuList[i - 1].menuName"
          >
          </menu-cell>
        </template>
      </div>
    </div>

    <div ref="pie" id="pie_wrap"></div>
  </div>
</template>

<script>
import tophead from '../components/TopHead';
import piebox from '../components/piebox';
import service from '../server/service';
import MenuCeilVue from '../components/MenuCeil.vue';
const menuList = [
  {
    menuName: '公司通告',
    imgUrl: require('@/assets/img/gstg.png'),
    url: '/notice'
  },
  {
    menuName: '进店拜访',
    imgUrl: require('@/assets/img/jdbf.png'),
    url: '/visitshop'
  },
  {
    menuName: '电话订单',
    imgUrl: require('@/assets/img/dhdd.png'),
    url: '/phoneorder'
  },
  {
    menuName: '订单状态',
    imgUrl: require('@/assets/img/ddzt.png'),
    url: '/orders'
  },
  {
    menuName: '培训资料',
    imgUrl: require('@/assets/img/pxzl.png'),
    url: '/training'
  },
  {
    menuName: '消息中心',
    imgUrl: require('@/assets/img/xxzx.png'),
    url: '/message'
  },
  {
    menuName: '新增门店',
    imgUrl: require('@/assets/img/xzmd.png'),
    url: '/addedshop'
  },
  {
    menuName: '数据同步',
    imgUrl: require('@/assets/img/sjtb.png'),
    url: '/asyncdata'
  }
];
export default {
  name: 'home',
  components: {
    tophead: tophead,
    piebox: piebox,
    menuCell: MenuCeilVue
  },
  computed: {
    // 获取当前时间年月
    getDate() {
      let time = new Date();
      return `${time.getFullYear()}年${time.getMonth() + 1}月`;
    },
    // 获取当月时间进度
    getDayOfMonth() {
      let time = new Date();
      return parseInt((time.getDate() / 30) * 100);
    }
  },
  data() {
    return {
      mouthSalePercent: 0,
      shops: 0,
      menuList: menuList
    };
  },
  created() {
    // 请求后台数据获取饼图数据
    service.getpieData().then(res => {
      this.mouthSalePercent = parseInt(res.data.monthPercent * 100);
      this.shops = res.data.totalShops;
    });
  },
  mounted() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  // 九宫格css
  .main-nav {
    flex: 1;
    padding: 0 px2rem(30);
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    align-items: stretch;
    border-top: 1px solid #ccc;
    .nav-cell {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      flex: 1 1 30%;
    }
    .nav-cell:nth-child(3n) {
      border-right: none;
    }
  }
}
.main-body {
  background-color: #fff;
  // 日期盒子css
  .date-wrap {
    font-size: $text-size-mid;
    color: #000000;
    text-align: center;
    padding: px2rem(40) 0 px2rem(22);
  }
  // 饼图css
  .top_pie {
    display: flex;
    justify-content: space-around;
  }

  #pie_wrap {
    width: px2rem(500);
    height: px2rem(400);
  }
}
</style>
