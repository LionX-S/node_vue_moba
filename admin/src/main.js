import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import http from "./http";
import httpSpecial from './http/httpSpecial';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$httpSpecial = httpSpecial;

new Vue({
	render: (h) => h(App),
	router
}).$mount("#app");
