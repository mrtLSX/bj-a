import Vue from 'vue';
import Vuex from 'vuex';

import _ from 'lodash';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存放用户信息, loginUser: null
    // 先从session中拿数据
    loginUser: sessionStorage.getItem('user_data')
      ? JSON.parse(sessionStorage.getItem('user_data'))
      : null,
    NoticeList: [],
    shops: [], //所有商店信息
    goodsList: [], //商品信息
    curOrderShop: {}, ///当前下单商店
    warehouse: [], //仓库名称
    Cards: []
    /*card 结构
    {
          shopId: payload.shopId,
          shopName: state.curOrderShop.name,
          warehouse: [
            {
              remark: '备注',
              warehouseId: payload.warehouseId,
              warehouseName: payload.warehouseName,
              checked: true,
              goods: [
                {
                  goodsInfo: payload.goods,
                  count: payload.count,
                  checked: true
                }
              ]
            }
          ]
    }  
    */
  },
  mutations: {
    // 退出登录
    clearAll(state) {
      state = null;
      // console.log(state);
    },
    // 更新登录信息
    updateLoginUserInfo(state, payload) {
      state.loginUser = payload;
    },
    // 过滤掉提交订单的商品
    subOrderClear(state) {
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = _.cloneDeep(state.Cards[ShopIndex]);
      // 过滤掉所有商品都为checked 的仓库
      newShop.warehouse = newShop.warehouse.filter(w => {
        // 返回goods 存在checked为false的仓库
        return w.goods.findIndex(goods => goods.checked == false) >= 0;
      });
      newShop.warehouse.forEach(w => {
        // 过滤商品
        w.goods = w.goods.filter(g => g.checked == false);
      });
      state.Cards.splice(ShopIndex, 1, newShop);
    },
    // 将备注信息增加到cart中
    addRemarkToWarehouse(state, payload) {
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = { ...state.Cards[ShopIndex] };
      let warehouse = newShop.warehouse.find(
        warehouse => warehouse.warehouseId == payload.warehouseId
      );
      warehouse.remark = payload.remark;
      state.Cards.splice(ShopIndex, 1, newShop);
    },

    // 全选
    selectAllGoods(state, value) {
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = { ...state.Cards[ShopIndex] };
      newShop.warehouse.forEach(w => {
        w.checked = value;
        w.goods.forEach(goods => {
          goods.checked = value;
        });
      });
      state.Cards.splice(ShopIndex, 1, newShop);
    },
    // 修改仓库选中状态同步
    changeWarehouseChecked(state, payload) {
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = { ...state.Cards[ShopIndex] };
      let warehouse = newShop.warehouse.find(
        warehouse => warehouse.warehouseId == payload.warehouseId
      );
      warehouse.checked = payload.checked;

      if (payload.checked == false) {
        warehouse.goods.forEach(goods => {
          goods.checked = false;
        });
      }

      state.Cards.splice(ShopIndex, 1, newShop);
    },
    // 修改商品选中状态
    changeGoodsChecked(state, payload) {
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = { ...state.Cards[ShopIndex] };
      let warehouse = newShop.warehouse.find(
        warehouse => warehouse.warehouseId == payload.warehouseId
      );
      if (payload.checked) {
        warehouse.checked = true;
      }
      let goods = warehouse.goods.find(
        goods => goods.goodsInfo.id == payload.goodsId
      );
      goods.checked = payload.checked;
      state.Cards.splice(ShopIndex, 1, newShop);
    },
    // 购物车数量改变同步改变vuex的Cards的数据
    addGoodsCount(state, payload) {
      // payload:shopId(curOrderShop),warehouseId,goodsId,count
      // console.log(payload);
      let ShopIndex = state.Cards.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let newShop = { ...state.Cards[ShopIndex] };
      let warehouse = newShop.warehouse.find(
        warehouse => warehouse.warehouseId == payload.warehouseId
      );
      let goods = warehouse.goods.find(
        goods => goods.goodsInfo.id == payload.goodsId
      );
      goods.count += payload.count;
      state.Cards.splice(ShopIndex, 1, newShop);
    },
    // 清空购物车
    initCards(state) {
      state.Cards = [];
    },
    addToCards(state, payload) {
      // state.card = payload;
      // console.log(payload);
      // 把商品信息加入到购物车中 ,数组的push shift unshift 等方法才能监听(双向绑定)
      // 购物车中有商品,增加,没有新增对象
      let shopIndex = state.Cards.findIndex(
        item => item.shopId == payload.shopId
      );
      if (shopIndex < 0) {
        // console.log('创建新的Card');
        state.Cards.push({
          shopId: payload.shopId,
          shopName: state.curOrderShop.name,
          warehouse: [
            {
              remark: '',
              warehouseId: payload.warehouseId,
              warehouseName: payload.warehouseName,
              checked: true,
              goods: [
                {
                  goodsInfo: payload.goods,
                  count: payload.count,
                  checked: true
                }
              ]
            }
          ]
        });
      } else {
        // console.log('商店已经存在,+仓库和商品');
        let shop = state.Cards[shopIndex]; //拿到当前商店
        // 查找当前商店的仓库是否存在
        let warehouseIndex = shop.warehouse.findIndex(
          item => item.warehouseId == payload.warehouseId
        );
        if (warehouseIndex < 0) {
          // 仓库不存在的话,商店中添加新仓库
          console.log('商店已经存在,仓库不存在,+仓库和商品');
          shop.warehouse.push({
            remark: '',
            warehouseId: payload.warehouseId,
            warehouseName: payload.warehouseName,
            checked: true,
            goods: [
              {
                goodsInfo: payload.goods,
                count: payload.count,
                checked: true
              }
            ]
          });
        } else {
          // 仓库存在   判断商品是否存在
          let warehouse = shop.warehouse[warehouseIndex]; //拿到新的仓库
          // 判断商品是否存在(仓库中查询商品)
          let goodsIndex = warehouse.goods.findIndex(
            goods => goods.goodsInfo.id == payload.goods.id
          );
          if (goodsIndex < 0) {
            console.log('商店已经存在,仓库存在,+商品');
            // 商品不存在,添加新的商品
            warehouse.goods.push({
              goodsInfo: payload.goods,
              count: payload.count,
              checked: true
            });
          } else {
            // 商品存在,修改商品的数量
            console.log('商店已经存在,商品,仓库存在,+数量');
            let newCount = (warehouse.goods[goodsIndex].count += payload.count);
            // 监听count的值
            Vue.set(warehouse.goods[goodsIndex], 'count', newCount);
          }
        }
        // 仓库中的shop信息重新写入到vuex中的state中,参数一修改的值,参数2索引,参数三新值
        Vue.set(state.Cards, shopIndex, shop);
      }
    },
    // 初始化仓库
    initWarehouse(state, payload) {
      state.warehouse = payload;
    },
    // 获取当前下单商店的信息
    initShopInfo(state, payload) {
      state.curOrderShop = payload;
    },
    // 初始化商品信息
    initGoods(state, payload) {
      state.goodsList = payload;
    },
    // 加载更多商品
    appendGoods(state, payload) {
      state.goodsList = _.uniqBy([...state.goodsList, ...payload], 'id');
    },
    // 初始化所有店铺信息放到vuex中
    initShops(state, payload) {
      state.shops = payload;
    },
    // 加载更多店铺方法
    appendShops(state, payload) {
      // 去重放到shops里面
      state.shops = _.uniqBy([...state.shops, ...payload], 'id');
    },
    // 初始化用户信息的方法
    initLoginUser(state, payload) {
      state.loginUser = payload;
    },
    // 初始化消息信息
    initNoticeList(state, payload) {
      state.NoticeList = payload;
    },
    // 上拉加载更多消息
    unshiftNoticeLis(state, payload) {
      state.NoticeList.unshift(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    // 下拉加载更多消息
    pushNoticeLis(state, payload) {
      state.NoticeList.push(...payload);
      state.NoticeList = _.uniqBy(state.NoticeList, 'id');
    },
    // 设置消息已读
    setNoticeReaded(state, payload) {
      // payload传进来 对应信息的id,根据id找索引
      let index = state.NoticeList.findIndex(item => item.id == payload);

      //根据索引获取isread的值
      let k = state.NoticeList[index];
      k.isRead = true;
      // 找到替换
      state.NoticeList.splice(index, 1, k);
    }
  },

  actions: {},
  getters: {
    // 获取当前下单的商店
    getCurOrderShop(state) {
      // 过滤掉未选中的商品的仓库
      let shop = state.Cards.find(shop => shop.shopId == state.curOrderShop.id);
      // 深层拷贝shop
      let newShop = _.cloneDeep(shop);
      // console.log(newShop);
      // console.log(shop);

      // 过滤掉未选中的商品
      newShop.warehouse.forEach(w => {
        // 过滤掉仓库中未选中的商品
        w.goods = w.goods.filter(goods => goods.checked);
      });
      newShop.warehouse = newShop.warehouse.filter(
        w =>
          // 过滤掉数量为0的商品的仓库 和 未选中的仓库
          // 拿到数量大于 0并且 仓库选中的 仓库
          w.goods.length > 0 && w.checked
      );
      return newShop;
    },
    // 获取vuex中的remark数据
    getRemarkByWarehouseId: state => id => {
      // return state.curOrderShop.id;
      let curOrderShop = state.curOrderShop;
      let Shop = state.Cards.find(shop => shop.shopId == curOrderShop.id);
      let warehouse = Shop.warehouse.find(w => w.warehouseId == id);
      // console.log(warehouse.ramark);
      return warehouse.remark;
    },
    // 获取用户登录信息
    getUserLogin(state) {
      return state.loginUser;
    }
  },
  plugins: [persistedState({ storage: window.sessionStorage })]
});
