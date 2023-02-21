<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}英雄</h1>
		<el-main>
			<el-form
				label-width="120px"
				label-position="left"
				@submit.native.prevent="save">
				<el-tabs type="border-card">
					<el-tab-pane label="基础信息">
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
					</el-tab-pane>
					<el-tab-pane label="技能信息">
						<el-main
							v-for="(item, index) in heroes.skills"
							:key="index">
							<el-form-item :label="`技能${index + 1}名称`">
								<el-input v-model="item.skillName"></el-input>
							</el-form-item>
							<el-form-item :label="`技能${index + 1}描述`">
								<el-input v-model="item.skillDesc"></el-input>
							</el-form-item>
							<el-form-item :label="`技能${index + 1}图片`">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + '/upload'"
									:show-file-list="false"
									:on-success="
										(response) => handleSkillImageSuccess(response, index)
									"
									:before-upload="beforeAvatarUpload">
									<img
										v-if="item.skillImage"
										:src="item.skillImage"
										class="avatar" />
									<i
										v-else
										class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<el-button
									type="danger"
									@click="deleteSkill(index)"
									>删除</el-button
								>
							</el-form-item>
						</el-main>
						<el-button
							@click="addSkills"
							plain
							type="primary"
							>新增技能</el-button
						>
					</el-tab-pane>
				</el-tabs>
				<div class="buttonRow">
					<el-button
						type="primary"
						native-type="submit"
						>保存</el-button
					>
					<el-button
						type="danger"
						@click="cancel"
						>取消</el-button
					>
				</div>
			</el-form>
		</el-main>
	</div>
</template>
<script>
	import { deleteImage } from "../../utils/utils";
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
				heroCategoryOpt: []
			};
		},
		methods: {
			addSkills() {
				this.heroes.skills.push({
					skillName: "",
					skillDesc: "",
					skillImage: ""
				});
			},
			deleteSkill(index) {
				deleteImage(this.heroes.skills[index].skillImage);
				this.heroes.skills.splice(index, 1);
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
					res = await this.$http.put(`rest/heroes/${this.id}`, {
						...this.heroes,
						skills: JSON.stringify(this.heroes.skills)
					});
				} else {
					res = await this.$http.post("rest/heroes", {
						...this.heroes,
						skills: JSON.stringify(this.heroes.skills)
					});
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
			// 取消功能
			async cancel() {
				if (!this.id) {
					this.heroes.avatar !== "" && (await deleteImage(this.heroes.avatar));
					this.heroes.skills.length &&
						this.heroes.skills.map((item) => {
							if (item.skillImage !== "") {
								deleteImage(skillImage);
							}
						});
				}
				this.$router.push("/heroes/list");
			},
			// 编辑分类功能
			async getHeroesById(id) {
				const res = await this.$http.get(`rest/heroes/${id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.heroes = {
						...this.heroes,
						...body[0],
						skills: JSON.parse(body[0].skills)
					};
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
			handleSkillImageSuccess(res, index) {
				this.heroes.skills[index].skillImage = res.url;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isLt1M = file.size / 1024 / 1024 < 1;

				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG 格式!");
				}
				if (!isLt1M) {
					this.$message.error("上传头像图片大小不能超过 1MB!");
				}
				return isJPG && isLt1M;
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
				this.heroes.nickName = "";
				this.heroes.avatar = "";
				this.heroes.describes = "";
				this.heroes.category = "";
				this.heroes.score = "";
				this.heroes.skills = [];
			}
			next();
		}
	};
</script>
<style scoped>	
	.buttonRow {
		margin-top: 20px;
	}
</style>
