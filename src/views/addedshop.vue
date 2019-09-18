<template>
  <div class="addedshop">
    <TopHead title="新增门店">
      <div class="r-title" slot="r">确定</div>
    </TopHead>
    <div class="map-wrap" ref="map"></div>
    <div class="map-address">{{ address }}</div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead';
export default {
  name: 'addedshop',
  data() {
    return {
      address: ''
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 地图的中心地理坐标
      let center = new qq.maps.LatLng(39.916527, 116.397128);
      // 创建地图
      var map = new qq.maps.Map(this.$refs.map, {
        center,
        zoom: 13, // 地图缩放级别
        mapStyleId: 'style2' // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
      });
      // 创建标注
      var marker = new qq.maps.Label({
        //设置Marker的位置坐标
        position: center,
        //设置显示Marker的地图
        map: map,
        content: '<p class="marker">商铺位置</p>',
        //设置Marker被添加到Map上时的动画效果为从天而降
        animation: qq.maps.MarkerAnimation.DROP,
        visible: true
      });
      // 获取坐标位置的辅助api
      let geocoder = new qq.maps.Geocoder();
      //   获取位置成功后的回调函数
      geocoder.setComplete(result => {
        // map.setCenter(result.detail.location);
        // 设置当前汉字标注的坐标
        marker.setPosition(result.detail.location); //地址坐标
        //设置汉字的地址,需要date中定义address
        this.address = result.detail.address;
      });

      // 获取地图坐标的 地址位置。
      geocoder.getAddress(center);

      qq.maps.event.addListener(map, 'click', event => {
        center = new qq.maps.LatLng(
          event.latLng.getLat(),
          event.latLng.getLng()
        );
        // map.setCenter(center);
        marker.setPosition(center);
        geocoder.getAddress(center);
      });
    }
  },
  components: {
    TopHead
  }
};
</script>
<style lang="scss" scoped>
.addedshop {
  height: 100%;
  background-color: #fff;
  .map-wrap {
    height: px2rem(360);
    border-bottom: 1px solid #ccc;
    // .marker {
    //不起作用
    //   font-size: px2rem(30);
    // }
  }
  .map-address {
    height: px2rem(120);
    line-height: px2rem(120);
    font-size: $text-size;
    color: $text-color-imp;
    background-color: $src-bg;
    padding: 0 px2rem(28);
  }
}
</style>
<style lang="scss">
// 单独设置字体大小
.marker {
  font-size: px2rem(30);
}
</style>
