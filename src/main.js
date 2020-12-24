import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './global.less';
import './util/axiosConfig';

import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



// import Vue from 'vue';
// import App from './App.vue';
// import router from './router';
// import store from './store';
// import {Form, FormModel, message} from 'ant-design-vue';
// // 进度条
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
// // 预加载axios配置
// import './utils/axios';
// // 加载moment及配置
// import moment from 'moment'
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
// // 配置message最多显示条数
// message.config({
//   duration: 3,
//   maxCount: 3,
// });
// NProgress.inc(0.4);
// NProgress.configure({easing: 'ease', speed: 500, showSpinner: false});
// Vue.use(FormModel);
// Vue.use(message);
// Vue.prototype.$form = Form;
// Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// });
// router.afterEach(() => {
//   NProgress.done();
// });
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');
