<template>
  <div class="goodsIitem">
    <div class="img-box">
      <img :src="goods.img" :alt="goods.title" />
    </div>
    <div class="desc-wr">
      <div class="goods-title">{{ goods.title }}</div>
      <div class="goods-num">
        <span>编码:{{ goods.serial }}</span>
        <span>规格:{{ goods.packageDimensions }}</span>
      </div>
      <div class="goods-price">
        <div class=" fl">
          价格:
          <span class="goodsMonery">{{ goods.monery }} </span>
        </div>
        <div class="fr" v-if="showKuChun">
          <span
            >库存:{{ goods.warehouseId }}
            <i class="icon iconfont icon-icon-refresh"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsIitem',
  props: ['goods', 'showKuChun'],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.goodsIitem {
  display: flex;
  padding: px2rem(20) 0;
  border-top: px2rem(1) solid #ccc;
  font-size: px2rem(22);
  .img-box {
    width: px2rem(124);
    height: px2rem(124);
    border: px2rem(1) solid #ccc;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc-wr {
    margin-left: px2rem(28);
    color: #757575;
    .goods-title {
      font-size: px2rem(28);
      height: px2rem(28);
      line-height: px2rem(28);
      color: #000;
    }
    .goods-num {
      height: px2rem(20);
      line-height: px2rem(20);
      margin-top: px2rem(12);
      span:first-child {
        margin-right: px2rem(56);
      }
    }
    .goods-price {
      overflow: hidden;
      width: px2rem(484);
      height: px2rem(30);
      margin-top: px2rem(34);
      .goodsMonery {
        font-size: px2rem(30);
        color: #ff0000;
      }
    }
  }
}
</style>
