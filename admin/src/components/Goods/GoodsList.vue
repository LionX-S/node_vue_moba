<template lang="">
	<div>
		<h1>分类列表</h1>
		<el-main>
			<el-table :data="goodsList">
				<el-table-column
					type="index"
					label="序号"
					width="220"
					align="center">
				</el-table-column>
				<el-table-column
					prop="id"
					label="id"
					width="150"
					align="center">
				</el-table-column>
				<el-table-column
					prop="name"
					label="物品名称"
					align="center">
				</el-table-column>
				<el-table-column
					prop="imageUrl"
					label="物品展示"
					align="center">
					<template slot-scope="scope">
						<el-image
							style="width: 50px; height: 50px"
							:src="scope.row.imageUrl"></el-image>
					</template>
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="创建时间"
					width="200"
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
							@click="$router.push(`/goods/create/${scope.row.id}`)"
							>编辑</el-button
						>
						<el-button
							type="danger"
							size="mini"
							@click="deleteGoods(scope.row.id)"
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
		inject: ["reload"],
		data() {
			return {
				goodsList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getGoodsList() {
				const res = await this.$http.get("rest/goods");
				const { code, body, message } = res.data;
				if (code === 200) {
					this.goodsList = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},

			deleteGoods(goodsId) {
				this.$alert("确认删除这条数据吗？", "提示", {
					confirmButtonText: "确定",
					callback: async () => {
						const res = await this.$http.delete(`rest/goods/${goodsId}`);
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
					}
				});
			}
		},
		created() {
			this.getGoodsList();
		}
	};
</script>
<style lang=""></style>
