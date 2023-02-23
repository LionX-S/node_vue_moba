<template lang="">
	<el-main>
		<h1>英雄列表</h1>
		<el-table
			:data="heroesList"
			border>
			<el-table-column
				fixed
				type="index"
				label="序号"
				width="50"
				align="center">
			</el-table-column>
			<el-table-column
				prop="name"
				label="英雄名称"
				align="center">
			</el-table-column>
			<el-table-column
				prop="nickName"
				label="英雄称号"
				align="center">
			</el-table-column>
			<el-table-column
				prop="category"
				label="英雄分类"
				align="center">
			</el-table-column>
			<el-table-column
				prop="describes"
				label="英雄描述"
				align="center">
			</el-table-column>
			<el-table-column
				prop="score"
				label="难度等级"
				align="center">
			</el-table-column>
			<el-table-column
				prop="avatar"
				label="英雄展示"
				align="center">
				<template slot-scope="scope">
					<el-image
						style="width: 50px; height: 50px"
						:src="scope.row.avatar"></el-image>
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
						@click="$router.push(`/heroes/create/${scope.row.id}`)"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="deleteHeroes(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script>
	import moment from "moment";
	import { deleteImage } from "../../utils/utils";
	export default {
		name: "HeroList",
		data() {
			return {
				heroesList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getHeroesList() {
				const res = await this.$http.get("rest/heroes");
				const { code, body, message } = res.data;
				if (code === 200) {
					this.heroesList = body;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},

			deleteHeroes(rowData) {
				this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(async () => {
						const res = await this.$http.delete(`rest/heroes/${rowData.id}`);
						const { code, message } = res.data;
						if (code === 200) {
							this.$message({
								type: "success",
								message
							});
							// 删除已经上传的图片
							deleteImage(rowData.avatar);
							JSON.parse(rowData.skills).map((item) => {
								deleteImage(item.skillImage);
							});
							this.getHeroesList();
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
			this.getHeroesList();
		}
	};
</script>
<style lang=""></style>
