<template lang="">
	<el-main>
		<h1>用户列表</h1>
		<el-table
			:data="usersList"
			border>
			<el-table-column
				type="index"
				label="序号"
				width="220"
				align="center">
			</el-table-column>
			<el-table-column
				prop="userName"
				label="用户名"
				align="center">
			</el-table-column>
			<el-table-column
				prop="avatarUrl"
				label="用户头像"
				align="center">
				<template slot-scope="scope">
					<el-image
						style="width: 50px; height: 50px"
						:src="scope.row.avatarUrl"></el-image>
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
						@click="$router.push(`/user/create/${scope.row.id}`)"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="deleteGoods(scope.row.id, scope.row.avatarUrl)"
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
		name: "UsersList",
		inject: ["reload"],
		data() {
			return {
				usersList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getUsersList() {
				const res = await this.$http.get("rest/users");
				const { body } = res.data;
				this.usersList = body;
			},

			deleteGoods(userId, avatarUrl) {
				this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(async () => {
					const res = await this.$http.delete(`rest/users/${userId}`);
					const { code, message } = res.data;
					this.$message({
						type: "success",
						message
					});
					deleteImage(avatarUrl);
					this.reload();
				});
			}
		},
		created() {
			this.getUsersList();
		}
	};
</script>
<style lang=""></style>
