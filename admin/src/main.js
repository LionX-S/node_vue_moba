import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import http from "./http";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http = http;

new Vue({
	render: (h) => h(App),
	router
}).$mount("#app");
