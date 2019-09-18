<template>
  <div class="imgBtn" @click="$emit('click')">
    <i
      class="icon iconfont"
      :class="iconclass"
      :style="{ color: isRed ? 'red' : '#000' }"
    ></i>
    <p>{{ val }}</p>
  </div>
</template>

<script>
export default {
  name: 'imgBtn',
  props: ['iconclass', 'val', 'isRed'],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.imgBtn {
  text-align: center;
  padding-top: px2rem(72);

  i {
    font-size: px2rem(60);
  }
  p {
    font-size: px2rem(24);
    line-height: px2rem(24+44);
  }
}
</style>
