<template>
  <div class="m-tab">
    <div class="tab-head">
      <ul class="head-list">
        <li
          @click="curIndex = index"
          class="head-item"
          v-for="(item, index) in hdTitle"
          :key="index"
          :class="{ active: curIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="tab-bd">
      <div class="s1 bd-item" :class="{ active: curIndex === 0 }">
        <slot name="s1">s1</slot>
      </div>
      <div class="s2 bd-item" :class="{ active: curIndex === 1 }">
        <slot name="s2">s2</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mtab',
  props: ['hd-title'],

  data() {
    return {
      // 选中tab的标志
      curIndex: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.m-tab {
  .tab-head {
    .head-list {
      display: flex;
      background-color: #ffffff;
      .head-item {
        height: px2rem(108);
        text-align: center;
        line-height: px2rem(108);
        font-size: px2rem(28);
        flex: 1;
        color: #000000;
        border-right: px2rem(1) solid #ccc;
        border-bottom: px2rem(1) solid #ccc;
        box-sizing: border-box;
      }
      .head-item.active {
        background-color: #fafafa;
        border-bottom: px2rem(6) solid #10903d;
      }
    }
  }
  .tab-bd {
    .bd-item {
      display: none;
    }
    .bd-item.active {
      display: block;
    }
  }
}
</style>
