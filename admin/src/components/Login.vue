<template lang="">
	<el-card class="loginCard">
		<div
			slot="header"
			class="clearfix">
			<span>请登录</span>
		</div>
		<el-form @submit.native.prevent="login">
			<el-form-item label="账号">
				<el-input
					placeholder="用户名"
					v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input
					placeholder="密码"
					type="password"
					v-model="user.password"
					show-password></el-input>
			</el-form-item>
			<el-button
				type="primary"
				native-type="submit"
				>登录</el-button
			>
		</el-form>
	</el-card>
</template>
<script>
	export default {
		name: "Login",
		data() {
			return {
				user: {
					username: "",
					password: ""
				}
			};
		},
		methods: {
			async login() {
				const res = await this.$http.post("login", this.user);
				const { token, username, avatarUrl } = res.data;
				this.$store.dispatch("setUserMsg", { username, avatarUrl });
				localStorage.token = token;
				localStorage.username = username;
				localStorage.avatarUrl = avatarUrl;
				this.$router.push("/");
				this.$message({
					type: "success",
					message: `登录成功!欢迎,${username}`,
					center: true
				});
			}
		}
	};
</script>
<style>
	.loginCard {
		width: 30rem;
		margin: 10rem auto;
	}
</style>
