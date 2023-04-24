import axios from "axios";
import Vue from "vue";
import router from '../router';

const http = axios.create({
	baseURL: "http://localhost:3000/admin/api"
});

// 拦截器 给所有请求加入authorization
http.interceptors.request.use(
	function (config) {
		if(localStorage.token) {
			config.headers.Authorization = "Bearer " + localStorage.token;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// 拦截器 统一处理错误
http.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response.data.message) {
			Vue.prototype.$message({
				type: "error",
				message: err.response.data.message,
				center:true
			});
			if(err.response.data.code === 401) {
				router.push("/login");
			}
		}
		return Promise.reject(err);
	}
);

export default http;
