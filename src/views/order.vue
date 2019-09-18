<template>
  <div class="order">
    <TopHead title="下单">
      <div slot="r"><i class="icon iconfont icon-cart"></i></div>
    </TopHead>
    <searchBtn v-model="q" @search="search"></searchBtn>
    <!-- 分类盒子 -->
    <div class="hot-wrap">
      <ul class="classify-list">
        <li
          @click="isOnSalesClick"
          class="classify-item"
          :class="{ act: isOnSales }"
        >
          促销
        </li>
        <li @click="isAllClick" class="classify-item" :class="{ act: isAll }">
          全部
        </li>
        <li class="classify-item">SKU-L</li>
        <li class="classify-item">SKU-L</li>
        <li class="classify-item">SKU-L</li>
      </ul>
    </div>
    <!-- 商品列表区域 -->
    <div class="goods-list-wrap">
      <!-- 头部 -->
      <div class="goods-hd">
        <div class="fl count-box">{{ cur }} / {{ total }}</div>
        <div class="fr">
          <ul class="type-list-wrap">
            <li>{{ getFoodsType }}</li>
            <li>
              <i
                class="icon iconfont icon-filter"
                @click="popupVisible = true"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="good-bd"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <router-link
          class="good-bd-wrap"
          :to="`/goodsSlected/${item.id}`"
          v-for="item in goodsList"
          :key="item.id"
          ><goodsListItem :goods="item" :showKuChun="true"></goodsListItem
        ></router-link>
      </div>
    </div>
    <!-- 弹出层 -->
    <Popup
      class="popup-box"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="middle"
    >
      <Checklist
        title="请选择商品类型"
        v-model="fitterGoodsType"
        :options="['洗护', '食品', '宝洁']"
      ></Checklist>
      <Button type="default" @click="popupVisible = false">确认</Button>
    </Popup>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import searchBtn from '../components/searchBtn';
import goodsListItem from '../components/goodsListItem';
import service from '../server/service';

// 无限滚动插件
import Vue from 'vue';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import { mapState, mapMutations } from 'vuex';

// 弹出框
import { Popup, Checklist, Button, Toast } from 'mint-ui';
export default {
  name: 'order',
  created() {
    this.LoadGoodsList();
    // console.log(this.goodsList);
  },
  computed: {
    ...mapState(['goodsList']),
    // 处理fitterGoodsType 返回字符串
    getFoodsType() {
      return this.fitterGoodsType.join('/');
    }
  },
  data() {
    return {
      q: '',
      isOnSales: false,
      isAll: true,
      cur: 0,
      total: 0,
      page: 1,
      // goodsList: [],
      fitterGoodsType: ['洗护', '食品', '宝洁'],
      popupVisible: false,
      loading: false
    };
  },
  methods: {
    ...mapMutations(['initGoods', 'appendGoods']),
    loadMore() {
      this.loading = true;
      this.page++;
      this.LoadGoodsList().finally(() => {
        this.loading = false;
      });
    },
    // 初始化商品列表
    LoadGoodsList() {
      let params = {
        _limit: 15,
        _page: this.page,
        q: this.q
      };
      if (!this.isAll) {
        params.onsales = this.isOnSales;
      }
      return service
        .getGoodsList(params)
        .then(res => {
          // console.log(res.data);
          // 处理goodsList 加载更多
          // this.goodsList = [...this.goodsList, ...res.data];
          this.appendGoods(res.data);
          // console.log(this.goodsList);
          this.cur = res.headers['x-total-count'];
          this.total = this.cur;
          Toast({
            message: '请求数据成功',
            position: 'middle',
            duration: 1000
          });
        })
        .catch(err => {
          console.log('请求失败', err);
          Toast({
            message: '请求数据失败',
            position: 'middle',
            duration: 1000
          });
        });
    },
    search() {
      //   发送ajax请求,执行搜索,需要先清空数组
      // this.goodsList = [];
      this.initGoods([]);
      this.page = 1;
      this.LoadGoodsList()
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
        });
      console.log('搜索', this.q);
    },
    isOnSalesClick() {
      this.isOnSales = true;
      this.isAll = false;
      // 清空数组
      // this.goodsList = [];
      this.initGoods([]);
      this.LoadGoodsList();
    },
    isAllClick() {
      this.isAll = true;
      this.isOnSales = false;
      // 清空数组
      // this.goodsList = [];
      this.initGoods([]);
      this.LoadGoodsList();
    }
  },
  components: {
    TopHead,
    searchBtn,
    goodsListItem,
    Popup,
    Checklist,
    Button
  }
};
</script>
<style lang="scss" scoped>
.order {
  height: 100%;
  background-color: #fff;
  // overflow: hidden;
  overflow: scroll;
  // 弹出层样式
  .popup-box {
    height: px2rem(300);
    padding: px2rem(50);
  }
  //   分类盒子
  .hot-wrap {
    border: px2rem(1) solid #ccc;
    border-left: none;
    border-right: none;
    background-color: #fafafa;
    padding: px2rem(13) 0;
    .classify-list {
      display: flex;
      .classify-item {
        text-align: center;
        font-size: px2rem(28);
        flex: 0 0 px2rem(132);
        height: px2rem(60);
        line-height: px2rem(60);
        border-right: px2rem(1) solid #ccc;
      }
      .classify-item:last-child {
        border: none;
      }
      .classify-item.act {
        color: #04afe8;
      }
    }
  }
  //商品列表区域
  .goods-list-wrap {
    padding: 0 px2rem(28);
    // 头部标题区域
    .goods-hd {
      overflow: hidden;
      .count-box,
      .type-list-wrap {
        height: px2rem(85);
        line-height: px2rem(85);
        font-size: px2rem(28);
      }
      .type-list-wrap {
        display: flex;
        li {
          flex: 0 0 auto;
          font-size: px2rem(28);
          color: #ccc;
          i {
            font-size: px2rem(28);
          }
        }
      }
    }
    // 列表展示区域
    .goods-bd {
      .good-bd-wrap {
        display: block;
      }
    }
  }
}
</style>
