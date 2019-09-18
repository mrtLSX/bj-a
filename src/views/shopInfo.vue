<template>
  <div class="shopInfo">
    <!-- 顶部导航 -->
    <TopHead title="店内活动">
      <div slot="r"><span @click="visitStop">结束拜访</span></div>
    </TopHead>
    <!-- 内容区域 -->
    <div class="shopInfo-wrap">
      <!-- 标题 -->
      <h3 class="shop-name">
        {{ shopInfo.name }}
      </h3>
      <!-- 销量区域 -->
      <div class="shop-sales-wrap">
        <div class="shop-salse">
          <div class="fl">
            <i class="icon iconfont icon-xiaoliangzuigao"></i>本月至今销量
          </div>
          <div class="fr">
            {{ sales.MonthSales.toFixed(0) }}
          </div>
        </div>
        <div class="shop-salse">
          <div class="fl">
            <i class="icon iconfont icon-xiaoliangpaixu"></i
            >过往半年月平均销售量
          </div>
          <div class="fr">
            {{ sales.MonthAvgSales.toFixed(0) }}
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-hd">
            <div class="fl">
              <i class="icon iconfont icon-80"></i>核心分销完成率
            </div>
            <div class="fr">
              {{ sales.DivSalesPercent.toFixed(0) }}
            </div>
          </div>
          <div class="progress-bar">
            <div
              class="progress-bar-val"
              :style="`width:${sales.DivSalesPercent}%`"
            ></div>
          </div>
        </div>
      </div>
      <!-- 历史拜访 -->
      <div class="visited-rd pd28">
        历史拜访备注
      </div>
      <textarea
        placeholder="点击填写拜访记录~"
        class="textarea-wrap pd28"
        name=""
        id=""
        cols="30"
        rows="10"
      >
      </textarea>
      <div class="btn-wrap">
        <div class="btn" @click="$router.push('/order/' + $route.params.id)">
          下单
        </div>
        <div class="btn active">
          <router-link :to="`/shopsignIn/${id}`">商店签到</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import Service from '../server/service';

import { mapState, mapMutations } from 'vuex';
export default {
  name: 'shopInfo',
  created() {
    Service.getShopInfo(this.id).then(res => {
      // console.log(res.data);
      // this.sales = res.data;
      //eslint-disable-next-line
      // 动画实现数据赋值
      TweenLite.to(this.sales, 1, res.data);

      // console.log(this.sales);
    });
    // 获取vuex中id对应商铺信息
    this.shopInfo = this.shops.find(item => this.id == item.id);
    // 当前id的商店信息放到vuex中
    this.initShopInfo({ ...this.shopInfo });
  },
  data() {
    return {
      id: this.$route.params.id,
      shopInfo: [],
      sales: { id: 0, MonthSales: 0, MonthAvgSales: 0, DivSalesPercent: 0 }
    };
  },
  computed: {
    ...mapState(['shops'])
  },

  methods: {
    ...mapMutations(['initShopInfo']),
    visitStop() {
      this.$router.go(-1);
    }
  },
  components: {
    TopHead
  }
};
</script>
<style lang="scss" scoped>
.pd-l {
  padding-left: px2rem(28);
}
.pd-r {
  padding-right: px2rem(28);
}
.pd28 {
  padding: 0 px2rem(28);
}
.shopInfo {
  height: 100%;
  background-color: #fff;
  .shopInfo-wrap {
    font-size: px2rem(28);
    color: #000;
    background: #ffffff;
    .shop-name {
      padding: 0 px2rem(28);
      height: px2rem(84);
      line-height: px2rem(84);
      background-color: #fafafa;
      border-bottom: px2rem(1) solid #e8e8e8;
    }
    // 商品销售详情css
    .shop-sales-wrap {
      padding: 0 px2rem(28);
      .shop-salse {
        border-bottom: px2rem(1) solid #e8e8e8;
        line-height: px2rem(110);
        height: px2rem(110);
        display: flex;
        justify-content: space-between;
        i {
          padding-right: px2rem(28);
          font-size: px2rem(28);
          color: #000;
        }
      }
      .progress-wrap {
        padding-bottom: px2rem(32);
        .progress-hd {
          border-bottom: px2rem(1) solid #e8e8e8;
          height: px2rem(96);
          line-height: px2rem(96);
          display: flex;
          justify-content: space-between;
          i {
            padding-right: px2rem(28);
            font-size: px2rem(28);
            color: #000;
          }
        }
        .progress-bar {
          height: px2rem(12);
          border-radius: px2rem(6);
          background-color: #e4e4e4;
          .progress-bar-val {
            height: px2rem(12);
            border-radius: px2rem(6);
            background: linear-gradient(to right, #1c5ef5, #22be66);
          }
        }
      }
    }
    // 历史拜访备注
    .visited-rd {
      height: px2rem(66);
      line-height: px2rem(66);
      font-size: px2rem(22);
      background-color: #fafafa;
      border-top: px2rem(1) solid #e8e8e8;
      border-bottom: px2rem(1) solid #e8e8e8;
    }
    //
    .textarea-wrap {
      border: none;
      padding-top: px2rem(18);
      font-size: px2rem(24);
      width: 100%;
      height: px2rem(182);
      line-height: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
    }
    .btn-wrap {
      padding-top: px2rem(168);
      .btn {
        width: px2rem(480);
        height: px2rem(84);
        line-height: px2rem(84);
        text-align: center;
        margin: 0 auto px2rem(52);
        font-size: px2rem(36);
        color: #10903d;
        border: px2rem(2) solid #10903d;
        border-radius: px2rem(2);
      }
      .btn.active {
        background: #10903d;
        color: #fff;
      }
    }
  }
}
</style>
