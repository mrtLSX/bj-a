// 地图的中心地理坐标
let center = new qq.maps.LatLng(39.916527, 116.397128);
// 创建地图
var map = new qq.maps.Map(this.$refs.map, {
  center,
  zoom: 13, // 地图缩放级别
  mapStyleId: 'style1' // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
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
geocoder.setComplete(result => {
  // map.setCenter(result.detail.location);
  marker.setPosition(result.detail.location);
  this.address = result.detail.address;
});

// 获取地图坐标的 地址位置。
geocoder.getAddress(center);

qq.maps.event.addListener(map, 'click', event => {
  center = new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng());
  // map.setCenter(center);
  marker.setPosition(center);
  geocoder.getAddress(center);
});
