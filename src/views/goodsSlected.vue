<template>
  <div class="goodsSlected">
    <!-- 商品页主体部分 -->
    <div class="goodsSlected-bd">
      <TopHead title="产品选择">
        <div slot="r"></div>
      </TopHead>
      <!-- 商品详情 -->
      <div class="GoodsInfo">
        <GoodsListItem :goods="goods" :showKuChun="false"></GoodsListItem>
      </div>
      <div class="des-item">
        <div class="fl">仓库</div>
        <div class="fr">{{ warehouseName }}</div>
      </div>
      <div class="des-item">
        <div class="fl">库存</div>
        <div class="fr">{{ goods.number }}</div>
      </div>
      <div class="des-item">
        <div class="fl">数量</div>
        <div class="fr">
          <i @click="addCount(-1)" class="countBtn">-</i>
          <input
            @input="countChange"
            class="count-text"
            type="text"
            v-model="count"
          />
          <i @click="addCount(1)" class="countBtn">+</i>
        </div>
      </div>
    </div>
    <!-- 底部按钮部分 -->
    <div class="goodsSlected-bottom">
      <div class="btn-wrap">
        <input
          @click="$store.commit('initCards')"
          type="text"
          value="清空购物车"
        />
        <div @click="$router.go(-1)" class="btn act">取消</div>
        <div @click="addToCard" class="btn">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import GoodsListItem from '../components/goodsListItem';
import service from '../server/service';
export default {
  name: 'goodsSlected',
  created() {
    // 获取vuex中的商品信息放到goods中
    this.goods = this.$store.state.goodsList.find(
      item => item.id == this.$route.params.id
    );
    // console.log(this.goods);
    // 发送请求
    // vuex中仓库数据不存在
    if (this.$store.state.warehouse.length <= 0) {
      service
        .getWarehouse()
        .then(res => {
          // 获取当前id对应仓库信息,放到vuex中
          // vuex中数据不存在则触发initWarehouse方法存放数据
          this.$store.commit('initWarehouse', res.data);
          // 仓库信息
          let warehouse = this.$store.state.warehouse.find(
            item => item.id == this.goods.warehouseId
          );
          // 放到本地
          this.warehouseName = warehouse.reponame;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 仓库信息
      let warehouse = this.$store.state.warehouse.find(
        item => item.id == this.goods.warehouseId
      );
      // 放到本地
      this.warehouseName = warehouse.reponame;
    }
  },
  data() {
    return {
      goods: {},
      count: 1,
      warehouseName: '' //仓库名称
    };
  },
  methods: {
    addCount(num) {
      let total = parseInt(this.count + num);
      if (total > this.goods.number || total < 1) {
        return;
      } else {
        this.count = total;
      }
    },
    countChange() {
      console.log(this.count);
      // 去除数量前端的0
      this.count = this.count.replace(/\b(0+)/gi, '');
      if (this.count > this.goods.number) {
        this.count = parseInt(this.goods.number);
      } else if (this.count < 1) {
        this.count = 1;
      }
    },
    addToCard() {
      // 把购物相关信息放到vuex中
      this.$store.commit('addToCards', {
        shopId: this.$store.state.curOrderShop.id,
        goods: this.goods,
        count: this.count,
        warehouseName: this.warehouseName,
        warehouseId: this.goods.warehouseId
      });
      this.$router.push(`/card/${this.$route.params.id}`);
    }
  },
  components: {
    TopHead,
    GoodsListItem
  }
};
</script>
<style lang="scss" scoped>
.goodsSlected {
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  .goodsSlected-bottom {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    .btn-wrap {
      display: flex;
      border-top: px2rem(1) solid #ccc;
      .btn {
        flex: 1;
        font-size: px2rem(36);
        height: px2rem(110);
        line-height: px2rem(110);
        text-align: center;
        color: #10903d;
      }
      .btn:first-child {
        border-right: px2rem(1) solid #ccc;
      }
      .btn.act {
        color: #ff0000;
      }
    }
  }
  .GoodsInfo {
    padding: 0 px2rem(28);
    .goodsIitem {
      border-top: none !important;
      border-bottom: px2rem(1) solid #ccc;
    }
  }
  .des-item:hover {
    cursor: pointer;
  }
  .des-item {
    height: px2rem(110);
    line-height: px2rem(110);
    margin: 0 px2rem(28);
    font-size: px2rem(30);
    color: #000;
    .countBtn,
    .count-text {
      height: px2rem(46);
      line-height: px2rem(46);
      font-size: px2rem(25);
      text-align: center;
      margin-left: px2rem(14);
      border: 1px solid #ccc;
      border-radius: px2rem(5);
    }
    .count-text {
      width: px2rem(90);
    }

    .countBtn {
      display: inline-block;
      width: px2rem(46);
    }
  }
}
</style>
