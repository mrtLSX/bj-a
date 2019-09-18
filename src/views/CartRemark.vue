<template>
  <div class="cart-remark">
    <div class="cart-remark-bd">
      <TopHead :title="$store.state.curOrderShop.name">
        <div slot="r"></div>
      </TopHead>
      <textarea
        @input="changeRemark"
        v-model="remark"
        class="text"
        placeholder="请填写备注信息"
      ></textarea>
      <span class="tetx-len fr">字数 ({{ getlen }}/20)</span>
    </div>
    <div class="cart-remark-bt" @click="addRemark">
      <span class="btn">确定</span>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
export default {
  name: 'CartRemark',
  created() {
    //   获取当前仓库的备注信息,首先定位到当前仓库
    // let curOrderShop = this.$store.state.$curOrderShop;
    // let warehouseId = this.$route.params.id;
    // let ShopIndex = this.$store.state.Cards.findIndex(
    //   shop => shop.shopId == curOrderShop.id
    // );
    // let newShop = { ...this.$store.state.Cards[ShopIndex] };
    // let warehouse = newShop.warehouse.find(
    //   warehouse => warehouse.warehouseId == warehouseId
    // );
    // this.remark = warehouse.ramark;
    this.remark = this.$store.getters.getRemarkByWarehouseId(
      this.$route.params.id
    );
  },
  data() {
    return {
      remark: ''
    };
  },
  methods: {
    //   处理文本域长度不超过20个字符
    changeRemark(e) {
      let txt = e.target.value;
      console.log(txt);
      if (txt.length > 20) {
        this.remark = txt.slice(0, 20);
      }
    },
    addRemark() {
      console.log(this.remark);
      this.$store.commit('addRemarkToWarehouse', {
        warehouseId: this.$route.params.id,
        remark: this.remark
      });
    }
  },
  computed: {
    getlen() {
      return this.remark.length;
    }
  },
  components: {
    TopHead
  }
};
</script>
<style lang="scss" scoped>
.cart-remark {
  display: flex;
  height: 100%;
  line-height: 1.5;
  background-color: #fff;
  flex-flow: column nowrap;
  .cart-remark-bd {
    font-size: px2rem(28);
    flex: 1;
    .text {
      padding: 0 px2rem(28);
      width: 100%;
      height: px2rem(380);
      line-height: 1.5;
      border: none;
      box-sizing: border-box;
      font-size: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
      background-color: #fafafa;
    }
  }
  .cart-remark-bt {
    border-top: px2rem(1) solid #ccc;
    flex: 0 0 px2rem(110);
    line-height: px2rem(110);
    font-size: px2rem(36);
    color: #10903d;
    text-align: center;
  }
}
</style>
