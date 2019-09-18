<template>
  <div @click="changeChecked" class="check-box">
    <div v-show="value" class="inner"></div>
  </div>
</template>

<script>
export default {
  name: 'Check-Box',
  //   获取双向绑定的数据
  props: ['value'],
  methods: {
    changeChecked() {
      this.$emit('input', !this.value);
      this.$emit('change', !this.value);
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.check-box {
  width: px2rem(25);
  height: px2rem(25);
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  .inner {
    width: px2rem(16);
    height: px2rem(16);
    border: 1px solid #00a2eb;
    background-color: #00a2eb;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
