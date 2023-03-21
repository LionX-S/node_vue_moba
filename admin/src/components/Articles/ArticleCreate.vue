<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}文章</h1>
		<el-form
			label-width="120px"
			label-position="left"
			:model="article"
			:rules="rules"
			ref="article">
			<el-form-item
				label="文章分类"
				prop="category">
				<el-select
					v-model="article.category"
					placeholder="请选择">
					<el-option
						v-for="item in articleCategory"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="标题"
				prop="title">
				<el-input
					v-model="article.title"
					placeholder="请输入文章标题"></el-input>
			</el-form-item>
			<el-form-item
				label="文章封面"
				prop="imageUrl">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:headers="getAuthHeaders()"
					:show-file-list="false"
					:on-success="handleImageSuccess"
					:before-upload="beforeAvatarUpload">
					<img
						v-if="article.imageUrl"
						:src="article.imageUrl"
						class="avatar" />
					<i
						v-else
						class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item
				label="内容"
				prop="comment">
				<vue-editor
					v-model="article.comment"
					useCustomImageHandler
					@image-added="handleImageAdded"
					@image-removed="handleImageRemoved"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('article', save)"
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
	import { VueEditor } from "vue2-editor";
	export default {
		props: ["id"],
		inject: ["reload"],
		name: "ArticleCreate",
		data() {
			return {
				article: {
					title: "",
					comment: "",
					category: "",
					imageUrl: ""
				},
				articleCategory: [],
				imageArray: [],
				rules: {
					title: [
						{ required: true, message: "请填写文章标题", trigger: "blur" }
					],
					comment: [
						{ required: true, message: "请填写文章内容", trigger: "blur" }
					],
					category: [
						{ required: true, message: "请选择文章分类", trigger: "blur" }
					],
					imageUrl: [
						{ required: true, message: "请上传图片", trigger: "change" }
					]
				}
			};
		},
		components: {
			VueEditor
		},
		methods: {
			async resetVal() {
				this.imageArray.map(async (item) => {
					await deleteImage(item);
				});
				this.resetForm("article");
			},
			async save() {
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/articles/${this.id}`, this.article);
				} else {
					res = await this.$http.post("rest/articles", {
						title: this.article.title,
						comment: this.article.comment,
						category: this.article.category,
						imageUrl: this.article.imageUrl
					});
				}
				this.$router.push("/articles/list");
				this.$message({
					type: "success",
					message: res.data.message
				});
			},
			// 取消功能
			async cancel() {
				if (!this.id && this.article.imageUrl !== "") {
					await deleteImage(this.article.imageUrl);
				}
				this.imageArray.map((item) => {
					deleteImage(item);
				});
				this.$router.push("/articles/list");
			},
			// 编辑分类功能
			async getArticleById(id) {
				const res = await this.$http.get(`rest/articles/${id}`);
				const { body, message, code } = res.data;
				this.article = { ...this.article, ...body[0] };
			},
			// 获取文章分类列表
			async getArticleCategory(categoryName) {
				const res = await this.$http.get(`getChildCategory/${categoryName}`);
				const { body, message, code } = res.data;
				this.articleCategory = body;
			},

			// 文本编辑起自定义上传图片事件
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				var formData = new FormData();
				formData.append("file", file);
				const res = await this.$http.post("/upload", formData);
				Editor.insertEmbed(cursorLocation, "image", res.data.url);
				this.imageArray.push(res.data.url);
				resetUploader();
			},
			// 删除图片
			async handleImageRemoved(file) {
				deleteImage(file);
			},

			handleImageSuccess(res) {
				this.article.imageUrl = res.url;
				this.$refs.article.clearValidate("imageUrl");
			}
		},
		created() {
			this.id && this.getArticleById(this.id);
			this.getArticleCategory("文章");
		},
		beforeRouteLeave(to, from, next) {
			if (to.path === "/articles/create") {
				this.article.title = "";
				this.article.comment = "";
				this.article.category = "";
				this.article.imageUrl = "";
			}
			next();
		}
	};
</script>
<style lang=""></style>
