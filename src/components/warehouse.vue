<template>
  <div class="warehouse">
    <div class="warehouse-hd">
      <div class="warehouse-name">
        <checkbox
          @change="handlerWarehouseCheckedChange"
          :value="Curwarehouse.checked"
        ></checkbox>
        <span class="warehouse-text">{{ Curwarehouse.warehouseName }}</span>
      </div>
      <div class="remark-box">
        <div class="edit">
          <router-link :to="`/cartremark/${Curwarehouse.warehouseId}`"
            >备注</router-link
          >
        </div>
        <i class="icon iconfont icon-bianji"></i>
      </div>
    </div>
    <div class="warehouse-bd">
      <ul>
        <li
          class="goods-item-wrap"
          v-for="good in Curwarehouse.goods"
          :key="good.goodsInfo.id"
        >
          <CartGoodsRow
            :Curwarehouse="Curwarehouse"
            :goods="good"
          ></CartGoodsRow>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import checkbox from '../components/checkbox';
import CartGoodsRow from '../components/CartGoodsRow';
export default {
  props: ['Curwarehouse'],
  name: 'warehouse',
  data() {
    return {};
  },
  methods: {
    handlerWarehouseCheckedChange(value) {
      this.$store.commit('changeWarehouseChecked', {
        warehouseId: this.Curwarehouse.warehouseId,
        checked: value
      });
    }
  },
  components: {
    checkbox,
    CartGoodsRow
  }
};
</script>
<style lang="scss" scoped>
.warehouse {
  background-color: #fff;
  i {
    font-size: px2rem(28);
  }
  .warehouse-hd {
    padding: 0 px2rem(28);
    display: flex;
    justify-content: space-between;
    color: #fafafa;
    height: px2rem(84);
    line-height: px2rem(84);
    font-size: px2rem(28);
    border-bottom: px2rem(1) solid #ccc;
    background-color: #fafafa;
    .warehouse-name {
      color: #000;
      .warehouse-text {
        padding-left: px2rem(28);
      }
    }
    .remark-box {
      color: #10903d;
      display: flex;
      .edit {
        padding-right: px2rem(18);
      }
    }
  }
}
</style>
