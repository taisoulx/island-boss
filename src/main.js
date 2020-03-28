import Vue from "vue";
import axios from "axios";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import fileReader from 'filereader'
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import './router/permission'
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import "./plugins/vue-world-map";
// 挂载自定义扩展，message,confirm等待
import './extends/common/index';
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

Vue.prototype.$fileReader = fileReader;
Vue.config.productionTip = false;

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URI
});

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
