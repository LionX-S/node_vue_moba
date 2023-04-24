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
				prop="imageUrl"
				label="文章封面"
				align="center">
				<template slot-scope="scope">
					<el-image
						style="width: 50px; height: 50px"
						:src="scope.row.imageUrl"></el-image>
				</template>
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
						@click="deleteArticle(scope.row.id, scope.row.imageUrl, scope.row.comment)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script>
	import moment from "moment";
	import { deleteImage, drawImgUrl } from "../../utils/utils";
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
				const { body } = res.data;
				this.articlesList = body;
			},

			deleteArticle(articleId, imageUrl, articleComment) {
				drawImgUrl(articleComment);
				this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(async () => {
					const res = await this.$http.delete(`rest/articles/${articleId}`);
					const { message } = res.data;
					// 删除文章中的图片
					drawImgUrl(articleComment).forEach(async (item) => {
						await deleteImage(item);
					});
					// 删除封面图片
					deleteImage(imageUrl);
					this.$message({
						type: "success",
						message,
						center: true
					});
					this.reload();
				});
			}
		},
		created() {
			this.getArticleList();
		}
	};
</script>
<style lang=""></style>
