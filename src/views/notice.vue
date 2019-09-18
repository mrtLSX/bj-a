<template>
  <div class="notice">
    <TopHead title="公司公告"><div slot="r"></div></TopHead>
    <div class="notice-wrap">
      <Loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="true"
        ref="loadmore"
      >
        <ul class="notice-list">
          <li v-for="item in NoticeList" :key="item.id" class="notice-item">
            <router-link :to="`/notice/${item.id}`">
              <div class="notice-box">
                <i
                  class="icon iconfont icon-dian"
                  :class="{ readed: item.isRead }"
                ></i>
                <div class="notice-bd">
                  <h3 class="notice-title">{{ item.title }}</h3>
                  <p class="notice-date">
                    {{ item.SubDate | dateFormat }}
                  </p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </Loadmore>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import service from '../server/service';
import { Loadmore } from 'mint-ui';

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'notice',
  data() {
    return {
      // NoticeList: [],
      // 是否全部加載完畢數據标志
      allLoaded: false,
      // 加载数据开始日期
      startDate: null,
      // 家家在數據結束日期
      endDate: null
    };
  },
  computed: {
    ...mapState(['NoticeList'])
  },
  filters: {
    dateFormat(val) {
      // 日期字符串转成日期
      let d = new Date(val);
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
  },

  methods: {
    ...mapMutations(['initNoticeList', 'unshiftNoticeLis', 'pushNoticeLis']),

    loadTop() {
      // 加载更多数据
      service.getNoticeData(this.startDate, 5, false).then(res => {
        // this.NoticeList.unshift(...res.data.data.messages);
        this.unshiftNoticeLis(res.data.data.messages); //触发vuex突变,修改vuex的数据
        this.startDate = this.NoticeList[0].SubDate;
        this.$refs.loadmore.onTopLoaded();
      });
    },
    loadBottom() {
      // 加载更多数据
      // 若数据已全部获取完毕
      // console.log(this.endDate);
      service.getNoticeData(this.endDate, 3, true).then(res => {
        if (res.data.data.messages.length <= 0) {
          this.allLoaded = true;
          return;
        }
        // this.NoticeList.push(...res.data.data.messages);
        this.pushNoticeLis(res.data.data.messages); //触发vuex突变,修改vuex的数据
        this.endDate = this.NoticeList[this.NoticeList.length - 1].SubDate;
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  },
  created() {
    this.startDate = new Date();
    service.getNoticeData(new Date(), 10, true).then(res => {
      //
      // this.NoticeList.push(...res.data.data.messages);
      this.initNoticeList(res.data.data.messages);
      this.endDate = this.NoticeList[this.NoticeList.length - 1].SubDate;
      console.log(this.endDate);
    });
  },

  components: {
    TopHead,
    Loadmore
  }
};
</script>
<style lang="scss" scoped>
.notice-wrap {
  height: 100%;
  overflow: scroll;
  .notice-list {
    background-color: #fff;

    .notice-item {
      height: px2rem(124);
      padding: px2rem(32) 0 0 px2rem(40);
      border-bottom: px2rem(1) solid #ccc;
      .notice-box {
        display: flex;
        i {
          flex: 0 0 px2rem(43);
          color: red;
          font-size: px2rem(40);
          line-height: px2rem(40);
        }
        i.readed {
          color: #ccc;
        }
        .notice-bd {
          .notice-title {
            font-size: px2rem(28);
            color: #000;
          }
          .notice-date {
            font-size: px2rem(22);
            color: #757575;
            line-height: px2rem(22+34);
          }
        }
      }
    }
  }
}
</style>
