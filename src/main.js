// index.js 入口文件
import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import IpInput from '@/components/ipinput'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(IpInput)

new Vue({
  el: '#app',
  render: h => h(App),
});