<template lang="">
	<div>
		<h1>分类列表</h1>
		<el-main>
			<el-table :data="categoriesList">
				<el-table-column
					type="index"
					label="序号"
					width="220"
					align="center">
				</el-table-column>
				<el-table-column
					prop="id"
					label="id"
					width="220"
					align="center">
				</el-table-column>
				<el-table-column
					prop="name"
					label="分类名称"
					align="center">
				</el-table-column>
				<el-table-column
					prop="higherLevelID"
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
	</div>
</template>
<script>
	import moment from "moment";
	export default {
		name: "CategoryList",
		inject:['reload'],
		data() {
			return {
				categoriesList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
			},
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
						const res = await this.$http.delete(
							`categories/${categoryId}`
						);
						const { code, message } = res.data;
						if (code === 200) {
							this.$message({
								type: "success",
								message
							});
							this.reload()
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
