<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}英雄</h1>
		<el-main>
			<el-form
				label-width="120px"
				label-position="left"
				@submit.native.prevent="save">
				<el-form-item label="英雄名称">
					<el-input
						v-model="heroes.name"
						placeholder="请输入英雄名称"></el-input>
				</el-form-item>
				<el-form-item label="英雄称号">
					<el-input
						v-model="heroes.nickName"
						placeholder="请输入英雄称号"></el-input>
				</el-form-item>
				<el-form-item label="英雄技能"></el-form-item>

				<el-form-item label="技能1">
					<el-input></el-input>
					<el-input></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="skillsNum++">新增技能</el-button>
				</el-form-item>

				<el-form-item label="英雄故事">
					<el-input
						v-model="heroes.describes"
						placeholder="请输入英雄故事"></el-input>
				</el-form-item>
				<el-form-item label="英雄分类">
					<el-select
						v-model="heroes.category"
						placeholder="请选择">
						<el-option
							v-for="item in heroCategoryOpt"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="难度等级">
					<el-rate v-model="heroes.score"></el-rate>
				</el-form-item>
				<el-form-item label="英雄头像">
					<el-upload
						class="avatar-uploader"
						:action="$http.defaults.baseURL + '/upload'"
						:show-file-list="false"
						:on-success="handleImageSuccess"
						:before-upload="beforeAvatarUpload">
						<img
							v-if="heroes.avatar"
							:src="heroes.avatar"
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
					nickName: "",
					avatar: "",
					describes: "",
					category: "",
					score: 0,
					skills: []
				},
				heroCategoryOpt: [],
				skillsNum: 1
			};
		},
		methods: {
			addSkills() {
				this.skillsNum++;
			},
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
				const res = await this.$http.get(`rest/heroes/${id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.heroes.name = body[0].name;
					this.heroes.nickName = body[0].nickName;
					this.heroes.describes = body[0].describes;
					this.heroes.avatar = body[0].avatar;
					this.heroes.category = body[0].category;
					this.heroes.score = body[0].score;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},
			// 查询英雄大分类下所有分类
			async getCategoryByHero(categoryName) {
				const res = await this.$http.get(`getHeroCategory`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.heroCategoryOpt = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},

			handleImageSuccess(res) {
				this.heroes.avatar = res.url;
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
			this.getCategoryByHero("英雄");
		},

		// 解决由编辑页面直接点击新建功能时，form遗留数据的issue
		beforeRouteLeave(to, from, next) {
			if (to.path === "/heroes/create") {
				this.heroes.name = "";
				this.heroes.avatar = "";
				this.heroes.describes = "";
				this.heroes.nickName = "";
				this.heroes.score = "";
				this.heroes.avatar = "";
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
