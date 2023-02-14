<template lang="">
	<div>
		<h1>分类列表</h1>
		<el-main>
			<el-table :data="categoriesList">
				<el-table-column
					prop="id"
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
					prop="create_time"
					label="创建时间"
					width="400"
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
	</div>
</template>
<script>
	export default {
		name: "CategoryList",
		data() {
			return {
				categoriesList: []
			};
		},
		methods: {
			async getCategoryList() {
				const res = await this.$http.get("categories");
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
				this.$alert("确认删除这条数据吗？", "提示", {
					confirmButtonText: "确定",
					callback: async () => {
						const res = await this.$http.get(
							`deleteCategoryById/${categoryId}`
						);
						const { code, message } = res.data;
						if (code === 200) {
							this.$message({
                type:"success",
                message
              })
						} else {
							this.$message({
								type: "error",
								message
							});
						}
					}
				});
			}
		},
		created() {
			this.getCategoryList();
		}
	};
</script>
<style lang=""></style>
