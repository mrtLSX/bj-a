<template>
  <div class="NoticeDetail">
    <TopHead title="公司信息"><div slot="r"></div></TopHead>
    <h3>{{ Notice.title }}</h3>
    <p class="to">{{ Notice.to }}</p>
    <div>
      {{ Notice.text }}
    </div>
    <p class="date">{{ Notice.date }}</p>
    <p class="address">{{ Notice.address }}</p>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
import { mapState, mapMutations } from 'vuex';

import service from '../server/service';
export default {
  name: 'NoticeDetail',
  data() {
    return {
      Notice: null
    };
  },
  methods: {
    ...mapMutations(['setNoticeReaded'])
  },
  computed: {
    ...mapState(['NoticeList'])
  },
  created() {
    const Notice_id = this.$route.params.id;
    this.Notice = this.NoticeList.find(item => item.id == Notice_id);
    service.setNoticeReaded(Notice_id);
    this.setNoticeReaded(Notice_id);
  },
  components: {
    TopHead: TopHead
  }
};
</script>
<style lang="scss" scoped>
.NoticeDetail {
  color: #000;
  font-size: px2rem(28);
  line-height: 1.5;
  padding: px2rem(15);
  h3 {
    font-size: px2rem(30);
    padding: px2rem(20) 0;
  }
  .to {
    padding-bottom: px2rem(30);
  }
  .date {
    padding-top: px2rem(50);
  }
}
</style>
