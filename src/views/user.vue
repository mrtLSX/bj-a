<template>
  <div class="user">
    <div class="user-wrap-bd">
      <tophead title="个人信息">
        <router-link to="./user" slot="r">修改密码</router-link>
      </tophead>
      <div class="img-box">
        <input
          type="file"
          @change="uploadImg"
          class="input-file"
          accept="image/*"
          ref="file"
        />
        <img
          @click="selectFole"
          :src="loginUser.avatar"
          :alt="loginUser.title"
        />
      </div>
      <div class="user-desc-wrap">
        <div class="row">
          <span class="fl">员工姓名:</span>
          <span class="fr">{{ loginUser.name }}</span>
        </div>
        <div class="row">
          <span class="fl">手机号码:</span>
          <span class="fr">{{ loginUser.phone }}</span>
        </div>
        <div class="row">
          <span class="fl">部门:</span>
          <span class="fr">{{ loginUser.department }}</span>
        </div>
      </div>
      <div class="last-login">
        <span>上次登陆时间:</span>
        <span>{{ loginUser.lastLogin }}</span>
      </div>
    </div>
    <div class="user-wrap-foot">
      <div @click="reLogin" class="btn-l">重新登陆</div>
      <div @click="logout" class="btn-r">注销</div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import { mapState } from 'vuex';

import service from '../server/service';
// Utility base64 转换为 blod对象
import Utility from '../common/Utility';
import canvasResize from 'canvas-resize';
export default {
  name: 'user',
  created() {
    console.log(this.loginUser);
  },
  data() {
    return {};
  },
  methods: {
    // reLogin 重新登陆
    reLogin() {
      let loginUser = this.loginUser;
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit('clearAll');
      // console.log(this.$store.state);
      this.$router.push(`/?CNO=${loginUser.CNO}&PNO=${loginUser.PNO}`);
    },
    // 退出登录
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit('clearAll');
      // console.log(this.$store.state);
      this.$router.push('/');
    },
    // 文件上传
    selectFole() {
      this.$refs.file.click();
    },
    // 上传图片
    uploadImg() {
      let formData = new FormData();
      //   拿到上传的图片
      let file = this.$refs.file.files[0];
      //   将图片压缩处理 转为base64 调用canvas-resize
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.9, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback: baseStr => {
          // base64转换为blod  参数1urlData,参数2 type
          let fileBlod = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append('imgF', fileBlod);
          //   发送ajax请求,上传图片
          service
            .uploadImg(formData)
            .then(res => {
              // 修改当前登录信息,修改头像
              let newUwer = { ...this.loginUser };
              newUwer.avatar = `${process.env.VUE_APP_BASEURL}${res.data.img}`;
              // url: `${process.env.VUE_APP_BASEURL}${res.data.img}`
              console.log(res.data);
              // 修改本地头像
              this.$store.commit('updateLoginUserInfo', newUwer);
              // 修改服务器头像数据
              service.updateUerInfo(newUwer);
            })
            .catch(() => {
              console.log('上传失败');
            });
        }
      });
      //   console.log(this.$refs.file.files[0]);
    }
  },
  computed: {
    ...mapState(['loginUser'])
  },
  components: {
    tophead: TopHead
  }
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  .user-wrap-bd {
    flex: 1;
    .img-box {
      width: px2rem(220);
      height: px2rem(220);
      margin: px2rem(56) auto;
      .input-file {
        width: 0;
        height: 0;
        position: absolute;
        visibility: hidden;
      }
      img {
        width: px2rem(220);
        height: px2rem(220);
        text-align: center;
        vertical-align: top;
        border-radius: 50%;
      }
    }
    .user-desc-wrap {
      padding: 0 px2rem(28);
      font-size: px2rem(28);
      .row {
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        color: #000;
        height: px2rem(110);
        line-height: px2rem(110);
      }
      .fl {
        color: #757575;
      }
    }
    .last-login {
      padding: 0 px2rem(28);
      font-size: px2rem(24);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: #fafafa;
      height: px2rem(84);
      line-height: px2rem(84);
    }
  }
  .user-wrap-foot {
    flex: 0 0 px2rem(110);
    display: flex;
    line-height: px2rem(110);
    font-size: px2rem(36);
    border-top: px2rem(1) solid #ccc;
    .btn-l,
    .btn-r {
      flex: 1;
      text-align: center;
    }
    .btn-l {
      color: #10903d;
      border-right: px2rem(1) solid #ccc;
    }
    .btn-r {
      color: #ff5353;
    }
  }
}
</style>
