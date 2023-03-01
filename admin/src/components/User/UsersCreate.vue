<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}用户</h1>
		<el-form
			label-width="120px"
			label-position="left"
			:model="user"
			ref="user"
			:rules="rules"
			@submit.native.prevent="save">
			<el-form-item
				label="用户名"
				prop="username">
				<el-col :span="8">
					<el-input
						span="6"
						v-model="user.username"
						placeholder="请输入用户名"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item
				label="用户密码"
				prop="password">
				<el-col :span="8">
					<el-input
						type="password"
						show-password
						v-model="user.password"
						placeholder="请输入密码"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item
				label="头像"
				prop="avatarUrl">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:headers="getAuthHeaders()"
					:show-file-list="false"
					:on-success="handleImageSuccess"
					:before-upload="beforeAvatarUpload">
					<img
						v-if="user.avatarUrl"
						:src="user.avatarUrl"
						class="avatar" />
					<i
						v-else
						class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('user', save)"
					>保存</el-button
				>
				<el-button
					v-if="!id"
					@click="resetVal"
					type="warning"
					>重置</el-button
				>
				<el-button
					type="danger"
					@click="cancel"
					>取消</el-button
				>
			</el-form-item>
		</el-form>
	</el-main>
</template>
<script>
	import { deleteImage } from "@/utils/utils";

	export default {
		props: ["id"],
		inject: ["reload"],
		name: "UsersCreate",
		data() {
			return {
				user: {
					username: "",
					password: "",
					avatarUrl: ""
				},
				rules: {
					username: [
						{ required: true, message: "请输入用户名", trigger: "blur" }
					],
					password: [
						{ required: true, message: "请输入密码", trigger: "blur" }
					],
					avatarUrl: [
						{ required: true, message: "请上传图片", trigger: "change" }
					]
				}
			};
		},
		methods: {
			async resetVal() {
				if (!this.id && this.user.avatarUrl !== "") {
					await deleteImage(this.user.avatarUrl);
				}
				this.resetForm("user");
			},
			async save() {
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/users/${this.id}`, this.user);
				} else {
					res = await this.$http.post("rest/users", this.user);
				}
				this.$router.push("/user/list");
				this.$message({
					type: "success",
					message: res.data.message
				});
			},
			// 取消功能
			async cancel() {
				// 如果已经上传了图片，则删除(只针对新建信息时删除图片，编辑功能时不删除)
				if (!this.id && this.user.avatarUrl !== "") {
					await deleteImage(this.user.avatarUrl);
				}
				this.$router.push("/user/list");
			},
			// 编辑分类功能
			async getGoodsById(id) {
				const res = await this.$http.get(`rest/users/${id}`);
				const { body } = res.data;
				this.user = { ...this.user, ...body[0] };
			},
			handleImageSuccess(res) {
				this.user.avatarUrl = res.url;
				this.$refs.user.clearValidate("avatarUrl");
			}
		},
		created() {
			this.id && this.getGoodsById(this.id);
		},

		// 解决由编辑页面直接点击新建功能时，form遗留数据的issue
		beforeRouteLeave(to, from, next) {
			if (to.path === "/users/create") {
				this.user.username = "";
				this.user.avatarUrl = "";
			}
			next();
		}
	};
</script>
<style></style>
