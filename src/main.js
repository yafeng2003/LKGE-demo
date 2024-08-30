import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'; // 引入路由配置

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router, // 将路由实例传递给 Vue 实例
  render: h => h(App),
}).$mount('#app');
