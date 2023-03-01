import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import http from "./http";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);
// axios
Vue.prototype.$http = http;

// 所有上传图片框加herders,才能提交成功
Vue.mixin({
	methods: {
		getAuthHeaders() {
			if (localStorage.token) {
				return {
					Authorization: `Bearer ${localStorage.token || ""}`
				};
			}
		},
		submitForm(formName,callback) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					callback()
					// return true;
				} else {
					return false;
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 图片校验
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 1;

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 1MB!");
			}
			return isJPG && isLt2M;
		}
	}
});

new Vue({
	render: (h) => h(App),
	router,
	store
}).$mount("#app");
