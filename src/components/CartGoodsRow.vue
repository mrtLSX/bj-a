<template>
  <div class="cart-goods-row">
    <div class="check-btn">
      <CheckBox @change="goodCheckedChange" :value="goods.checked"></CheckBox>
    </div>
    <div class="goods-info-wrap">
      <div class="img-box">
        <img :src="goods.goodsInfo.img" :alt="goods.goodsInfo.title" />
      </div>
      <div class="goods-text-box">
        <h3 class="goods-title">
          {{ goods.goodsInfo.title }}
        </h3>
        <p>选中仓库:{{ Curwarehouse.warehouseName }}</p>
        <div class="bottom-wrap">
          <div class="price-wrap fl">
            价格:<span>{{ getPrice }}元</span>
          </div>
          <div class="count-box fr">
            <a @click="addGoodsCount(-1)" href="javascript:">-</a>
            <input type="text" v-model="goods.count" />
            <a @click="addGoodsCount(1)" href="javascript:">+</a>
          </div>
        </div>
      </div>
      <!-- {{ Curwarehouse.warehouseId }}{{ Curwarehouse }} -->
      <!-- {{ goods.count }}
      {{ goods.checked }} -->
    </div>
  </div>
</template>

<script>
import CheckBox from '../components/checkbox';
// import { mapMutations } from 'vuex';
export default {
  name: 'CartGoodsRow',
  props: ['goods', 'Curwarehouse'],
  data() {
    return {};
  },
  created() {
    // console.log(this.Curwarehouse.warehouseId);
  },
  methods: {
    goodCheckedChange(value) {
      // console.log(value);
      this.$store.commit('changeGoodsChecked', {
        goodsId: this.goods.goodsInfo.id,
        warehouseId: this.Curwarehouse.warehouseId,
        checked: value
      });
    },
    addGoodsCount(num) {
      this.$store.commit('addGoodsCount', {
        goodsId: this.goods.goodsInfo.id,
        warehouseId: this.Curwarehouse.warehouseId,
        count: parseInt(num)
      });
    }
  },
  components: {
    CheckBox
  },
  computed: {
    getPrice() {
      return this.goods.goodsInfo.monery * this.goods.count;
    }
  }
};
</script>
<style lang="scss" scoped>
.cart-goods-row {
  padding: px2rem(28);
  height: px2rem(180);
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  overflow: hidden;
  .check-btn {
    // width: px2rem(50);
    // height: px2rem(50);
    padding-top: px2rem(23);
    float: left;
  }
  .goods-info-wrap {
    margin-left: px2rem(50);
    .img-box {
      float: left;
      width: px2rem(125);
      height: px2rem(125);
      // margin-right: px2rem(28);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-text-box {
      font-size: px2rem(24);
      color: #000;
      margin-left: px2rem(153);
      h3 {
        height: px2rem(24);
        line-height: px2rem(24);
      }
      p {
        height: px2rem(18 * 2+24);
        line-height: px2rem(18 * 2+24);
      }
      .bottom-wrap {
        // overflow: hidden;
        .price-wrap {
          height: px2rem(24);
          line-height: px2rem(24);
          margin-top: px2rem(17);
          span {
            color: red;
          }
        }
        .count-box {
          line-height: px2rem(46);
          text-align: center;
          overflow: hidden;
          a,
          input {
            height: px2rem(46);
            border: px2rem(1) solid #ccc;
            border-radius: 5%;
            display: inline-block;
            font-size: px2rem(24);
          }
          a {
            width: px2rem(46);
          }
          input {
            width: px2rem(88);
            text-align: center;
            margin: 0 px2rem(16);
          }
        }
      }
    }
  }
}
</style>
