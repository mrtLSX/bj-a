<template>
  <div class="shopsignIn">
    <!-- 顶部导航 -->
    <TopHead title="商店签到">
      <div slot="r" @click="submitSigin">
        <i class="icon iconfont icon-duihao"></i>
      </div>
    </TopHead>
    <!-- input隐藏盒子 -->
    <input
      type="file"
      @change="uploadImg"
      class="input-file"
      accept="image/*"
      ref="file"
      value="123"
    />
    <!-- 整个图片盒子 -->
    <div class="img-box-wrap">
      <!-- 上传按钮 -->
      <imgBtn
        @click="$refs.file.click()"
        class="img-box"
        iconclass="icon-xiangji"
        val="拍摄照片"
        :isRed="false"
      ></imgBtn>
      <!-- 上传图片盒子 -->
      <div
        @click="img.checked = !img.checked"
        class="img-box"
        v-for="img in imgs"
        :key="img.url"
      >
        <!-- 盒子遮罩层 -->
        <div v-if="img.checked" class="imgchecked">
          <i class="icon iconfont icon-duihao"></i>
        </div>
        <img :src="img.url" alt="" width="100%" height="100%" />
      </div>
      <!-- 删除按钮 -->
      <imgBtn
        @click="removeImg"
        class="img-box"
        iconclass="icon-shanchudange"
        val="删除照片"
        :isRed="true"
      ></imgBtn>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';

import imgBtn from '../components/imgBtn';
import service from '../server/service';
// Utility base64 转换为 blod对象
import Utility from '../common/Utility';
import canvasResize from 'canvas-resize';

import { Toast } from 'mint-ui';
export default {
  name: 'shopsignIn',
  created() {},
  data() {
    return {
      imgs: []
    };
  },
  methods: {
    //   提交签到
    submitSigin() {
      // 发送ajax
      service
        .submitSigin({
          id: new Date(),
          shopId: this.$route.params.id, //店铺主键 就是店铺的id
          subOn: new Date().toLocaleDateString(), //'2019-07-31' 当天日期
          imgs: this.imgs.map(item => item.url) //图片url地址
        })
        .then(() => {
          Toast({
            message: '签到成功',
            position: 'middle',
            duration: 2000
          });
        })
        .catch(() => {
          Toast({
            message: '签到失败',
            position: 'middle',
            duration: 2000
          });
        });
    },
    //   删除图片
    removeImg() {
      this.imgs = this.imgs.filter(item => item.checked === false);
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
          // base64转换为blod urlData, type
          let fileBlod = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append('imgF', fileBlod);
          //   发送ajax请求
          service
            .uploadImg(formData)
            .then(res => {
              this.imgs.push({
                checked: false,
                url: `${process.env.VUE_APP_BASEURL}${res.data.img}`
              });
              console.log(res.data);
            })
            .catch(() => {
              console.log('上传失败');
            });
        }
      });
      //   console.log(this.$refs.file.files[0]);
    }
  },
  components: {
    TopHead,
    imgBtn
  }
};
</script>
<style lang="scss" scoped>
.shopsignIn {
  height: 100%;
  background-color: #fff;
}
.input-file {
  width: 0;
  height: 0;
  position: absolute;
  visibility: hidden;
}
.img-box-wrap {
  padding: px2rem(28);
  padding-bottom: 0;
  overflow: hidden;
  .img-box {
    position: relative;
    float: left;
    width: px2rem(220);
    height: px2rem(220);
    border: px2rem(1) solid #ccc;
    box-sizing: border-box;
    margin-right: px2rem(16);
    margin-bottom: px2rem(28);
    // 遮罩层
    .imgchecked {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(125, 125, 125, 0.4);
      i {
        font-size: px2rem(45);
        color: red;
      }
    }
  }
  .img-box:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
