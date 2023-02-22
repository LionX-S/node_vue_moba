<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}文章</h1>
		<el-form
			label-width="120px"
			label-position="left"
			@submit.native.prevent="save">
			<el-form-item label="文章分类">
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
			<el-form-item label="标题">
				<el-input
					v-model="article.title"
					placeholder="请输入文章标题"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<vue-editor
					v-model="article.comment"
					useCustomImageHandler
					@image-added="handleImageAdded"
					@image-removed="handleImageRemoved"></vue-editor>
			</el-form-item>
			<el-form-item>
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
					category: ""
				},
				articleCategory: [],
				imageArray: []
			};
		},
		components: {
			VueEditor
		},
		methods: {
			async save() {
				// 填写数据校验
				if (!this.article.title.trim()) {
					this.$message({
						type: "warning",
						message: "请填写正确数据！"
					});
					return;
				}
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/articles/${this.id}`, this.article);
				} else {
					res = await this.$http.post("rest/articles", {
						title: this.article.title,
						comment: this.article.comment,
						category: this.article.category
					});
				}
				if (res.data.code === 200) {
					this.$router.push("/articles/list");
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
				this.imageArray.map((item) => {
					deleteImage(item);
				});
				this.$router.push("/articles/list");
			},
			// 编辑分类功能
			async getArticleById(id) {
				const res = await this.$http.get(`rest/articles/${id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.article = { ...this.article, ...body[0] };
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},
			// 获取文章分类列表
			async getArticleCategory(categoryName) {
				const res = await this.$http.get(`getChildCategory/${categoryName}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.articleCategory = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
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
			}
			next();
		}
	};
</script>
<style lang=""></style>
