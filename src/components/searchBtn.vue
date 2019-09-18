<template>
  <div class="search-Btn">
    <i class="icon iconfont icon-sousuo" @click="$emit('search')"></i>
    <input
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="value"
      placeholder="点击进行搜索"
      @keydown.enter="$emit('search')"
    />
  </div>
</template>

<script>
export default {
  name: 'searchBtn',
  props: ['value'],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.search-Btn {
  position: relative;
  font-size: px2rem(24);
  background-color: #fafafa;
  box-sizing: border-box;
  i {
    position: absolute;
    top: px2rem(38);
    left: px2rem(28);
    font-size: px2rem(30);
  }
  input {
    height: px2rem(104);
    line-height: px2rem(104);
    border: none;
    padding-left: px2rem(70);
    background-color: #fafafa;
  }
}
</style>
