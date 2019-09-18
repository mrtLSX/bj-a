<template>
  <div class="sub-cart">
    <div class="sub-cart-bd">
      <TopHead title="提交订单">
        <div slot="r"></div>
      </TopHead>
      <div class="shopInfo-wrap">
        <div class="receive-wrap">
          <span>收货人:{{ curOrderShop.bossName }}</span>
          <span>{{ curOrderShop.phone }}</span>
        </div>
        <div class="adress-wrap">
          <span>
            <i class="icon iconfont icon-location"></i>
            {{ curOrderShop.address }}
          </span>
        </div>
      </div>
      <div
        v-for="warehouse in getCurOrderShop.warehouse"
        :key="warehouse.warehouseId"
      >
        <div
          class="goods-wrap"
          v-for="goods in warehouse.goods"
          :key="goods.goodsInfo.id"
        >
          <img
            class="goods-img"
            :src="goods.goodsInfo.img"
            :alt="goods.goodsInfo.title"
          />
          <div class="desc-wrap">
            <h3>{{ goods.goodsInfo.title }}</h3>
            <p class="warehouse-name">{{ warehouse.warehouseName }}</p>
            <div class="price-wrap">
              <div class="price fl">
                价格:<span class="num">
                  {{ goods.goodsInfo.monery * goods.count }}</span
                >
              </div>
              <div class="count fr">数量: {{ goods.count }}</div>
            </div>
          </div>
        </div>
        <div class="remark-wrap">备注:{{ warehouse.remark }}</div>
      </div>
    </div>
    <div class="sub-cart-bt">
      <div class="price-wrap fl">
        <div class="fl">
          合计: <span class="total">{{ getTotalPrice }}</span>
        </div>
      </div>
      <div class="sub-btn fr">
        <span @click="subOrder" class="ok-btn">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import service from '../server/service';
import { Toast } from 'mint-ui';
export default {
  name: 'SubCart',
  computed: {
    ...mapState(['curOrderShop']),
    ...mapGetters(['getCurOrderShop']), //购物车里面当前下单的商店
    getTotalPrice() {
      let totalPrice = 0;
      this.getCurOrderShop.warehouse.forEach(warehouse => {
        if (!warehouse.checked) {
          return;
        }
        warehouse.goods.forEach(goods => {
          if (!goods.checked) {
            return;
          }
          totalPrice += goods.count * goods.goodsInfo.monery;
        });
      });
      return totalPrice;
    }
  },
  data() {
    return {};
  },
  methods: {
    subOrder() {
      service.subOrder(this.getCurOrderShop).then(() => {
        this.$store.commit('subOrderClear');
        Toast('提交订单成功');
        // 跳转页面
        this.$router.push('/home');
      });
      // 清理已经添加订单的  购物车中的数据
    }
  }
};
</script>
<style lang="scss" scoped>
.sub-cart {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  background-color: #fff;
  .sub-cart-bd {
    flex: 1;
    font-size: px2rem(28);
    .shopInfo-wrap {
      padding: 0 px2rem(28);
      box-sizing: border-box;
      height: px2rem(170);
      background-color: #fafafa;
      border-bottom: px2rem(1) solid #ccc;
      .receive-wrap {
        height: px2rem(80);
        line-height: px2rem(80);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }
      .adress-wrap {
        font-size: px2rem(24);
        color: #757575;
        i {
          font-size: px2rem(28);
        }
      }
    }
    .goods-wrap {
      margin-left: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
      padding: px2rem(28) 0;
      overflow: hidden;
      .goods-img {
        width: px2rem(124);
        height: px2rem(124);
        float: left;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
      }
      .desc-wrap {
        margin-left: px2rem(124);
        padding: 0 px2rem(28);
        font-size: px2rem(24);
        color: #000;
        h3 {
          height: px2rem(24);
          line-height: px2rem(24);
        }
        .warehouse-name {
          height: px2rem(54);
          line-height: px2rem(54);
          color: #757575;
        }
        .price-wrap {
          height: px2rem(47);
          line-height: px2rem(47);
          .num {
            color: red;
          }
        }
      }
    }
    .remark-wrap {
      height: px2rem(80);
      line-height: px2rem(80);
      font-size: px2rem(20);
      padding: 0 px2rem(28);
      border-bottom: 1px solid #ccc;
    }
  }
  .sub-cart-bt {
    font-size: px2rem(28);
    flex: 0 0 px2rem(110);
    line-height: px2rem(110);
    padding: 0 px2rem(28);
    border-top: px2rem(1) solid #ccc;
    .price-wrap {
      .total {
        color: red;
      }
    }
    .sub-btn {
      width: px2rem(168);
      height: px2rem(70);
      line-height: px2rem(70);
      background-color: #10903d;
      border-radius: 5%;
      color: #fff;
      text-align: center;
      margin-top: px2rem(20);
    }
  }
}
</style>
