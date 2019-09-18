import Vue from 'vue';
import Router from 'vue-router';
import login from './views/login.vue';

// home页面
import Home from './views/Home.vue';
// user页面
import user from './views/user.vue';

import notice from './views/notice.vue';

import NoticeDetail from './views/NoticeDetail.vue';
import visitshop from './views/Visitshop.vue';
import shopInfo from './views/shopInfo.vue';
import shopsignIn from './views/shopsignIn.vue';
import order from './views/order.vue';
import goodsSlected from './views/goodsSlected.vue';
import card from './views/card.vue';
import CartRemark from './views/CartRemark.vue';
import SubCart from './views/SubCart.vue';
import addedshop from './views/addedshop.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      // 定义home路由
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      // user
      path: '/user',
      name: 'user',
      component: user
    },
    {
      // 消息详情
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      // id对应消息设置已读
      path: '/notice/:id',
      name: 'NoticeDetail',
      component: NoticeDetail
    },

    {
      // 拜访商店
      path: '/visitshop',
      name: 'visitshop',
      component: visitshop
    },
    {
      // id对应商店详情
      path: '/visitshop/:id',
      name: 'shopInfo',
      component: shopInfo
    },
    {
      // 商店签到页面
      path: '/shopsignIn/:id',
      name: 'shopsignIn',
      component: shopsignIn
    },
    {
      // 商店下单页面
      path: '/order/:id',
      name: 'order',
      component: order
    },
    {
      // 产品选择页面
      path: '/goodsSlected/:id',
      name: 'goodsSlected',
      component: goodsSlected
    },
    {
      // 购物车页面
      path: '/card/:id',
      name: 'card',
      component: card
    },
    {
      // 备注页面
      path: '/cartremark/:id',
      name: 'cartremark',
      component: CartRemark
    },
    {
      // 提交购物车页面
      path: '/subcart',
      name: 'SubCart',
      component: SubCart
    },
    {
      // 新增门店页面
      path: '/addedshop',
      name: 'AddedShop',
      component: addedshop
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      // 所有路由不匹配跳转到该页面
      path: '*',
      name: 'all',
      component: visitshop
    }
  ]
});
