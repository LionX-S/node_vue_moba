<template lang="">
	<el-main>
		<h1>文章列表</h1>
		<el-table
			:data="articlesList"
			:default-sort="{ prop: 'create_time', order: 'descending' }"
			border>
			<el-table-column
				type="index"
				label="序号"
				width="220"
				align="center">
			</el-table-column>
			<el-table-column
				prop="title"
				label="文章标题"
				align="center">
			</el-table-column>
			<el-table-column
				prop="category"
				label="所属分类"
				align="center">
			</el-table-column>
			<el-table-column
				prop="create_time"
				label="创建时间"
				width="400"
				:formatter="dateFormate"
				align="center">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="180"
				align="center">
				<template slot-scope="scope">
					<el-button
						type="primary"
						size="mini"
						@click="$router.push(`/articles/create/${scope.row.id}`)"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="deleteArticle(scope.row.id, scope.row.comment)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script>
	import moment from "moment";
	import { deleteImage,drawImgUrl } from "../../utils/utils";
	export default {
		name: "ArticleList",
		inject: ["reload"],
		data() {
			return {
				articlesList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getArticleList() {
				const res = await this.$http.get("rest/articles");
				const { code, body, message } = res.data;
				if (code === 200) {
					this.articlesList = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},

			deleteArticle(articleId, articleComment) {
				drawImgUrl(articleComment);
				this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/articles/${articleId}`);
						const { code, message } = res.data;
						if (code === 200) {
							drawImgUrl(articleComment).forEach((item) => {
								deleteImage(item);
							});
							this.$message({
								type: "success",
								message
							});
							this.reload();
						} else {
							this.$message({
								type: "error",
								message
							});
						}
					})
					.catch((err) => {
						console.log(err);
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			}
		},
		created() {
			this.getArticleList();
		}
	};
</script>
<style lang=""></style>
