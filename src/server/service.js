// 导入axios发送ajax请求
import axios from 'axios/dist/axios.min.js';

// 所有请求header中增加 token
// 添加请求拦截器
let axiosIns = axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前将token写入头部,必须加 Bearer
    let loginToken = sessionStorage.getItem('LoginToken');
    if (loginToken) {
      config.headers.Authorization = 'Bearer ' + loginToken;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
export default {
  // 登录地址请求
  login(data) {
    return axios.post('/api/login', data);
  },
  // 饼图信息请求
  getpieData() {
    return axios.get('/api/getUserProgress');
  },
  // 根据经纬度获取商铺信息的methods
  getShops(data) {
    return axios.get('/api/auth/shop?_limit=10&_order=asc&_sort=distance', {
      params: data
    });
  },
  // 根据经纬度获取当前id商铺信息的methods
  getShopInfo(id) {
    return axios.get('/api/auth/shopSales/' + id);
  },
  // 退出登录清除token
  logout() {
    // 退出登录取消全局注册的钩子(注入依赖)
    return axios.interceptors.request.eject(axiosIns);
  },
  // 獲取消息頁的數據     isloadelater是否加載date之前的數據
  getNoticeData(date, limit, isloadelater) {
    // if (date) {
    //   date = date.getTime(); //date转换为字符串格式
    // }
    return axios.get('/api/message', {
      params: {
        date,
        limit,
        isloadelater
      }
    });
  },
  // 请求设置当前id消息已读
  setNoticeReaded(id) {
    return axios.post(`api/auth/notice/${id}`);
  },
  // 上传图片
  uploadImg(formData) {
    return axios({
      method: 'post',
      url: '/api/upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });
  },
  // // 提交签到请求
  submitSigin(data) {
    return axios.post('/api/auth/signIn', { data });
  },
  // 获取商品列表
  getGoodsList(data) {
    return axios.get('/api/auth/goods', { params: data });
  },
  // 获取仓库名字
  getWarehouse() {
    return axios.get('/api/auth/warehouse');
  },
  subOrder(data) {
    return axios.post('/api/auth/order', data);
  },
  // 修改用户信息
  updateUerInfo(data) {
    return axios.put(`/api/auth/user/${data.id}`, data);
  }
};
