<template lang="">
	<el-main>
		<h1>分类列表</h1>
		<el-table
			:data="categoriesList"
			:default-sort="{ prop: 'create_time', order: 'descending' }"
			border>
			<el-table-column
				type="index"
				label="序号"
				width="220"
				align="center">
			</el-table-column>
			<el-table-column
				prop="name"
				label="分类名称"
				align="center">
			</el-table-column>
			<el-table-column
				prop="parentsName"
				label="上级分类"
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
						@click="$router.push(`/categories/create/${scope.row.id}`)"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="deleteCategory(scope.row.id)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script>
	import moment from "moment";
	export default {
		name: "CategoryList",
		inject: ["reload"],
		data() {
			return {
				categoriesList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getCategoryList() {
				const res = await this.$http.get("rest/categories");
				const { code, body, message } = res.data;
				if (code === 200) {
					this.categoriesList = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},

			deleteCategory(categoryId) {
				this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(async () => {
						const res = await this.$http.delete(
							`rest/categories/${categoryId}`
						);
						const { code, message } = res.data;
						if (code === 200) {
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
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			}
		},
		created() {
			this.getCategoryList();
		}
	};
</script>
<style lang=""></style>
