<template>
  <div class="Visit-shop">
    <TopHead title="进店拜访">
      <div slot="r"></div>
    </TopHead>
    <Mtab :hd-title="['计划内', '计划外']">
      <!-- tab页签s1 计划内插槽内容 -->
      <div slot="s1" class="tab-bd">
        <!-- 搜索框 -->
        <div class="serch-box">
          <input
            type="text"
            placeholder="点击进行搜索"
            v-model="q"
            @keydown.enter="searchShop(false)"
          />
          <i @click="searchShop(false)" class="icon iconfont icon-sousuo"></i>
        </div>
        <!-- 商店详情 -->
        <div class="shoplist-wrap">
          <Loadmore
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            ref="loadshops"
          >
            <ul class="shopList">
              <li class="shopsItem" v-for="(item, index) in shops" :key="index">
                <router-link
                  class="shopItem-link"
                  :to="`/visitshop/${item.id}`"
                >
                  <!-- 左侧内容 -->
                  <div class="left-desc">
                    <!-- 左侧头部名称和位置信息 -->
                    <div class="desc-hd">
                      <h3 class="shop-name">{{ item.name }}</h3>
                      <div class="shop-location">
                        <i class="icon iconfont icon-location"></i>
                        <span>&lt;{{ item.distance }}米</span>
                      </div>
                    </div>
                    <!-- 左侧id和创建时间 -->
                    <div class="shop-id-wrap">
                      <span class="shop-id">ID:{{ item.id }}</span>
                      <span>创建时间:{{ item.subon | dateFormate }}</span>
                    </div>
                    <!-- 商店老板信息 -->
                    <div class="shop-owner-wrap">
                      <span class="shop-owner">{{ item.bossName }}</span>
                      <span class="shop-phone"
                        ><i class="icon iconfont icon-shouji1"></i
                        >{{ item.phone }}</span
                      >
                    </div>
                  </div>
                </router-link>
                <!-- 右侧>按钮 -->
                <div class="go-gt-btn">
                  <i class="icon iconfont icon-angle-right"></i>
                </div>
              </li>
            </ul>
          </Loadmore>
        </div>
      </div>
      <!-- tab页签s2 计划外插槽内容 -->
      <div slot="s2"></div>
    </Mtab>
  </div>
</template>

<script>
import Mtab from '../components/Mtab';
import Service from '../server/service';

import { Indicator, Loadmore } from 'mint-ui';
// import _ from 'lodash';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'VisitShop',
  created() {
    this.getLocation()
      .then(() => {
        this.searchShop(false);
      })
      .catch(() => {
        this.searchShop(false);
      });
  },
  data() {
    return {
      q: '',
      lat: '',
      lng: '',
      // shops: [],
      allLoaded: false,
      page: 1
    };
  },
  computed: {
    ...mapState(['shops'])
  },
  filters: {
    dateFormate: val => {
      let date = new Date(val);
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} `;
    }
  },

  methods: {
    ...mapMutations(['initShops', 'appendShops']),
    loadBottom() {
      this.page += 1;
      // 加载更多数据
      this.searchShop(true).then(() => {
        // this.allLoaded = true; // 若数据已全部获取完毕
        this.$refs.loadshops.onBottomLoaded();
      });
    },
    // 获取定位方法
    getLocation() {
      Indicator.open({
        text: '定位中...',
        spinnerType: 'fading-circle'
      });
      return new Promise((resolve, reject) => {
        //做一些异步操作
        var geolocation = new qq.maps.Geolocation(
          'ETNBZ-P4BE4-IBIUD-D4V4G-Q3M2T-DOFG2',
          'myapp'
        );
        geolocation.getLocation(
          position => {
            // console.log(this.lat);
            this.lat = position.lat;
            this.lng = position.lng;
            // 获取位置成功
            resolve(position);
            Indicator.close();
          },
          err => {
            Indicator.close();
            console.log('定位失败', err);
            reject('定位失败');
            Indicator.close();
          },
          {}
        );
      });
    },
    //商店搜索方法
    searchShop(isAppend) {
      //qq地图请求 位置信息
      Indicator.open({
        text: '请求商铺数据中...',
        spinnerType: 'fading-circle'
      });
      if (!isAppend) {
        this.page = 1;
      }
      // 发送ajax请求,获取店铺信息
      return Service.getShops({
        lat: this.lat,
        lng: this.lng,
        name_like: this.q,
        _page: this.page
      }).then(res => {
        if (isAppend) {
          // let arr = [...this.shops, ...res.data];
          // this.shops = _.uniq(arr, 'id');
          this.appendShops(res.data);
        } else {
          this.initShops(res.data);
        }
        // console.log(this.shops);
        Indicator.close();
      });
    }
  },
  components: {
    Mtab,
    Loadmore
  }
};
</script>
<style lang="scss" scoped>
.tab-bd {
  background-color: #fff;
  .serch-box {
    background-color: #fafafa;
    font-size: px2rem(35);
    position: relative;
    border-bottom: px2rem(2) solid #f7f7f7;
    overflow: hidden;
    i {
      font-size: px2rem(32);
      position: absolute;
      top: px2rem(43);
      left: px2rem(28);
    }
    input {
      font-size: px2rem(26);
      border: none;
      height: px2rem(106);
      line-height: px2rem(106);
      width: px2rem(694);
      padding-left: px2rem(70);
    }
  }
  .shoplist-wrap {
    overflow: scroll;
    .shopList {
      padding: 0 px2rem(28);
      .shopItem-link {
        height: px2rem(174);
        display: flex;
        justify-content: space-between;
        border-bottom: px2rem(1) solid #f1f1f1;
        .left-desc {
          flex: 1;
          .desc-hd {
            display: flex;
            justify-content: space-between;
            height: px2rem(80);
            line-height: px2rem(80);
            font-size: px2rem(25);
            .shop-location {
              i {
                font-size: px2rem(25);
              }
            }
          }
          .shop-id-wrap {
            height: px2rem(22);
            font-size: px2rem(22);
            color: #757575;
            .shop-id {
              padding-right: px2rem(45);
            }
          }
          .shop-owner-wrap {
            overflow: hidden;
            height: px2rem(62);
            line-height: px2rem(62);
            .shop-owner {
              float: left;
              font-size: px2rem(24);
              color: #757575;
            }
            .shop-phone {
              float: right;
              i {
                color: #000;
                font-size: px2rem(44);
              }
              font-size: px2rem(24);
              color: #10903d;
            }
          }
        }
        .go-gt-btn {
          padding-left: px2rem(30);
          flex: 0 0 px2rem(64-30);
          height: px2rem(174);
          line-height: px2rem(174);
          i {
            font-size: px2rem(28);
          }
        }
      }
    }
  }
}
</style>
