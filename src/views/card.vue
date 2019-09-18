<template>
  <div class="card">
    <div class="card-bd">
      <TopHead :title="shopsName">
        <div slot="r">编辑</div>
      </TopHead>
      <warehouse
        :Curwarehouse="Curwarehouse"
        v-for="Curwarehouse in curShopCart.warehouse"
        :key="Curwarehouse.warehouseId"
      >
      </warehouse>
    </div>
    <div class="bottom-wrap">
      <div class="fl">
        <CheckBox @change="changeAllCheck" v-model="AllCheck"></CheckBox>
        <span class="label">全选</span>
        <span>合计:</span>
        <span class="num">{{ getTotalPrice }}</span>
      </div>
      <div class="fr">
        <router-link to="/subcart" class="comfirm">确认 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import warehouse from '../components/warehouse';
import { mapState } from 'vuex';
import CheckBox from '../components/checkbox';
export default {
  name: 'card',
  created() {
    this.shopsName = this.$store.state.curOrderShop.name;
    // 获取当前购物车信息
    this.curShopCart = this.Cards.find(
      item => item.shopId == this.curOrderShop.id
    );
  },
  computed: {
    ...mapState(['Cards', 'curOrderShop']),
    // 获取总价
    getTotalPrice() {
      let totalPrice = 0;
      this.curShopCart.warehouse.forEach(warehouse => {
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
    return {
      shopsName: '',
      curShopCart: null, //当前为warehouse仓库信息
      AllCheck: true
    };
  },
  methods: {
    // 全选
    changeAllCheck(value) {
      console.log(value);
      // 修改整个仓库中的商品的checked状态为true
      this.$store.commit('selectAllGoods', value);
    }
  },
  components: {
    TopHead,
    warehouse,
    CheckBox
  }
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  height: 100%;
  background-color: #fff;
  flex-flow: column nowrap;
  .card-bd {
    flex: 1;
  }
  .bottom-wrap {
    padding: 0 px2rem(28);
    flex: 0 0 px2rem(110);
    line-height: px2rem(110);
    font-size: px2rem(28);
    border-top: px2rem(1) solid #ccc;
    .label {
      margin: 0 px2rem(62) 0 px2rem(18);
    }
    .num {
      color: red;
      font-weight: 700;
    }
    .comfirm {
      display: block;
      margin-top: px2rem(20);
      width: px2rem(168);
      height: px2rem(70);
      line-height: px2rem(70);
      text-align: center;
      color: #fff;
      background-color: #10903d;
      border-radius: 5%;
    }
  }
}
</style>
