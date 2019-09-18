import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './lib/hotcss/hotcss.js';
import '../vue.config';

// 导入表单验证插件vee-validate
import VeeValidate from 'vee-validate';

import helper from './lib/helper.js';

Vue.use(VeeValidate);

// 导入mint-ui的样式
import 'mint-ui/lib/style.css';

import TopHead from './components/TopHead.vue';
Vue.component('TopHead', TopHead);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  // 校验用户是否登录
  // 获取到的是对象类型,定义一个方法处理help.js
  // let abc = this.$store.getters.getUserLogin;
  // console.log(abc);

  if (to.path != '/') {
    // let aaa = helper.getTypes(store.getters.getUserLogin);
    // console.log(aaa);
    // 跳转到非登录页
    if (helper.getTypes(store.getters.getUserLogin) === 'Object') {
      // session的值为一个对象
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
