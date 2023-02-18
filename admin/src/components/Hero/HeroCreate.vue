<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}英雄</h1>
		<el-main>
			<el-form
				label-width="120px"
				@submit.native.prevent="save">
				<el-form-item label="英雄名称">
					<el-input
						v-model="heroes.name"
						placeholder="请输入英雄名称"></el-input>
				</el-form-item>
				<el-form-item label="英雄描述">
					<el-input
						v-model="heroes.describes"
						placeholder="请输入英雄描述"></el-input>
				</el-form-item>
				<el-form-item label="英雄图片">
					<el-upload
						class="avatar-uploader"
						:action="$http.defaults.baseURL + '/upload'"
						:show-file-list="false"
						:on-success="handleImageSuccess"
						:before-upload="beforeAvatarUpload">
						<img
							v-if="heroes.imageUrl"
							:src="heroes.imageUrl"
							class="avatar" />
						<i
							v-else
							class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						native-type="submit"
						>保存</el-button
					>
				</el-form-item>
			</el-form>
		</el-main>
	</div>
</template>
<script>
	export default {
		props: ["id"],
		name: "HeroesCreate",
		data() {
			return {
				heroes: {
					name: "",
					imageUrl: "",
					describes: ""
				}
			};
		},
		methods: {
			async save() {
				// 填写数据校验
				if (!this.heroes.name.trim()) {
					this.$message({
						type: "warning",
						message: "请填写正确数据！"
					});
					return;
				}
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/heroes/${this.id}`, this.heroes);
				} else {
					res = await this.$http.post("rest/heroes", this.heroes);
				}
				if (res.data.code === 200) {
					this.$router.push("/heroes/list");
					this.$message({
						type: "success",
						message: res.data.message
					});
				} else {
					this.$message({
						type: "error",
						message: res.data.message
					});
				}
			},
			// 编辑分类功能
			async getHeroesById(id) {
				const res = await this.$http.get(`rest/heroes/${this.id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.heroes.name = body[0].name;
					this.heroes.describes = body[0].describes;
					this.heroes.imageUrl = body[0].imageUrl;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},
			handleImageSuccess(res) {
				this.heroes.imageUrl = res.url;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isJPG && isLt2M;
			}
		},
		created() {
			this.id && this.getHeroesById(this.id);
		},

		// 解决由编辑页面直接点击新建功能时，form遗留数据的issue
		beforeRouteLeave(to, from, next) {
			if (to.path === "/heroes/create") {
				this.heroes.name = "";
				this.heroes.imageUrl = "";
				this.heroes.describes = "";
			}
			next();
		}
	};
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
