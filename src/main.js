// index.js 入口文件
import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import IpInput from '@/components/ipinput'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(IpInput)

new Vue({
  el: '#app',
  render: h => h(App),
});