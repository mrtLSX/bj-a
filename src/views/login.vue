<template>
  <!-- 登录页面 -->
  <div class="login">
    <h1>欢迎登录宝洁SFA系统</h1>
    <!-- 顶部帽子 -->
    <div class="top_hat"></div>
    <!-- 整个登录页 -->
    <div class="login-box">
      <!-- logo部分 -->
      <div class="logo-wrap"><div class="logo-box"></div></div>
      <!-- 登录表单部分 -->
      <div
        class="input-group"
        :class="{ active: act_index === 1, error: errors.has('cno') }"
      >
        <label for="CNO">公司编码</label>
        <input
          name="cno"
          v-validate="{ required: true, max: 6, min: 4 }"
          @focus="act_index = 1"
          type="number"
          id="CNO"
          v-model="CNO"
        />
      </div>

      <div
        class="input-group"
        :class="{ active: act_index === 2, error: errors.has('pno') }"
      >
        <label for="PNO">员工编号</label>
        <input
          name="pno"
          v-validate="{ required: true, max: 12, min: 4 }"
          @focus="act_index = 2"
          type="number"
          id="PNO"
          v-model="PNO"
        />
      </div>

      <div
        class="input-group"
        :class="{ active: act_index === 3, error: errors.has('psw') }"
      >
        <label for="password">登录密码</label>
        <input
          name="psw"
          v-validate="{ required: true, max: 16, min: 8 }"
          @focus="act_index = 3"
          type="password"
          id="password"
          v-model="password"
        />
      </div>

      <!-- 记住密码和自动登录盒子 -->
      <div class="ck-row">
        <div class="ckbox_wrap" @click="remember" :class="{ active: rememb }">
          <i
            class="iconfont"
            :class="{ 'icon-border': !rememb, 'icon-check-square': rememb }"
          ></i>
          <span>记住密码</span>
        </div>

        <div class="ckbox_wrap" @click="autoLogin" :class="{ active: autoLog }">
          <i
            class="iconfont"
            :class="{ 'icon-border': !autoLog, 'icon-check-square': autoLog }"
          ></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <!-- 底部登录按钮盒子 -->
    <div class="login-btn-wrap" @click="loginBtnClick">登录</div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import '../assets/font/iconfont.css';
// toast弹出遮罩层
import { Toast } from 'mint-ui';

// 映射导入
import { mapMutations } from 'vuex';

import service from '../server/service';

export default {
  name: 'login',
  data() {
    return {
      act_index: '1',
      // CNO PNO password input双向数据绑定
      CNO: '',
      PNO: '',
      password: '',
      rememb: false,
      autoLog: false
    };
  },
  mounted() {
    // 如果用户记住了密码,页面加载完从localStorage里面获取数据
    let data = JSON.parse(localStorage.getItem('Login_data'));
    // console.log(this.password);
    // console.log(sessionStorage);
    if (data) {
      this.CNO = data.CNO;
      this.PNO = data.PNO;
      this.password = data.password;
      this.rememb = data.rememb;
      this.autoLog = data.autoLog;
    } else {
      // 重新登陆则从url获取参数
      this.CNO = this.$route.query.CNO;
      this.PNO = this.$route.query.PNO;
    }

    // 页面加载完毕在 就强制进行校验
    this.$validator.validate();
    if (this.autoLog) {
      // 自动登录
      this.loginBtnClick();
    }
  },
  methods: {
    ...mapMutations(['initLoginUser']),
    // 设置记住密码样式标识符rememb为true或者false,对应设置记住密码\自动登录的样式
    remember() {
      this.rememb = !this.rememb;
      this.rememb || (this.autoLog = false);
    },
    // 设置自动登录样式标识符autoLog为true或者false,对应设置记住密码\自动登录的样式
    autoLogin() {
      this.autoLog = !this.autoLog;
      // &&取值到最后
      this.autoLog && (this.rememb = true);
    },
    // 点击登录执行函数
    loginBtnClick() {
      // 判断表单验证是否全部通过
      if (this.errors.any()) {
        return;
      }
      // 弹出等待消息遮罩层,防止2次点击
      Indicator.open({
        text: '正在登陆...',
        spinnerType: 'fading-circle'
      });

      //  发送ajax请求
      service
        .login({
          CNO: this.CNO,
          PNO: this.PNO,
          Passwd: this.password
        })
        .then(res => {
          if (res.data.code === 1) {
            // 登陆成功,Login_data注意命名规范
            // 记住用户名和密码,JSON.stringify 转换为字符串
            localStorage.setItem(
              'Login_data',
              JSON.stringify({
                // 保存密码和自动登录标志符
                rememb: this.rememb,
                autoLog: this.autoLog,
                // 选中保存密码逻辑
                PNO: this.rememb ? this.PNO : '',
                CNO: this.rememb ? this.CNO : '',
                password: this.rememb ? this.password : ''
              })
            );
            // 返回的数据放入session中
            sessionStorage.setItem('user_data', JSON.stringify(res.data.user));
            // 获取token
            sessionStorage.setItem('LoginToken', res.data.token);

            // 放入vuex中,触发commit()调用 mutations里面的方法,往state中传递数据
            // 使用映射的方法初始化vuex的数据
            this.initLoginUser(res.data.user);

            // 页面跳转
            this.$router.push('/home');
          } else {
            // 登录失败
            Toast({
              message: '用户名密码不正确,登录失败',
              position: 'middle',
              duration: 2000
            });
          }
          Indicator.close(); //关闭遮罩层
        })
        .catch(e => {
          console.log('登录失败', e);
          Toast({
            message: '登录异常失败',
            position: 'middle',
            duration: 2000
          });
          Indicator.close();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: px2rem(36);
  height: px2rem(36);
  line-height: px2rem(36);
  padding: px2rem(148-44-36) 0 px2rem(44) 0;
  color: #ffffff;
}

// 登录页面的css
.login {
  height: 100%;
  background-color: #29d565;
  // 顶部帽子部分css
  .top_hat {
    width: px2rem(537);
    height: px2rem(18);
    margin: 0 auto;
    background-color: #ededed;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }

  @mixin login-wrap() {
    width: px2rem(600);
    margin: 0 auto;
    border-radius: px2rem(20);
    background-color: #fff;
  }

  // 登录的盒子部分css
  .login-box {
    height: px2rem(836);
    @include login-wrap();
    // 登录logo的css
    .logo-wrap {
      padding: px2rem(80) 0;
      .logo-box {
        width: px2rem(190);
        height: px2rem(190);
        margin: 0 auto;
        background: url(../assets/logo.jpg) no-repeat;
        background-size: cover;
      }
    }
    @mixin rowStyle() {
      width: px2rem(401);
      padding: 0 px2rem(36);
      color: $text-color;
    }
    // input框部分css
    .input-group {
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      height: px2rem(90);
      margin: 0 auto;
      line-height: px2rem(90);
      font-size: $text-size-mid;
      @include rowStyle();
      margin: 0 auto px2rem(30);
      input {
        border: 0 none;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(200);
        padding-left: 1em;
      }
    }
    // input框获取焦点的css
    .input-group.active {
      color: $act-color;
      border: 2px solid $act-color;
    }
    // input框校验失败的样式css
    .input-group.error {
      color: $act-color;
      border: 2px solid red;
    }

    // 记住密码和自动登录css
    .ck-row {
      text-align: center;
      font-size: $text-size;
      display: flex;
      justify-content: space-around;
      // 引用和input公用的css代码
      @include rowStyle();
      .ckbox_wrap {
        padding-top: px2rem(8);
        padding-left: px2rem(36);
        i::before {
          display: inline-block;
          width: px2rem(30);
          height: px2rem(30);
          font-size: px2rem(30);
        }
      }
      // checkbox 选中改变颜色
      .ckbox_wrap.active {
        color: $act-color;
      }
    }
  }
  // 底部登录按钮的css部分
  .login-btn-wrap {
    text-align: center;
    font-size: $text-size-imp;
    height: px2rem(100);
    line-height: px2rem(100);
    @include login-wrap();
    margin-top: px2rem(20);
    font-weight: 700;
    letter-spacing: px2rem(10);
  }
}
</style>
<style lang="scss">
body,
html,
#app {
  height: 100%;
  font-size: 12px;
}
</style>
