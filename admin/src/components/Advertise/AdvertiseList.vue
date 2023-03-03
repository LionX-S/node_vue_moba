<template lang="">
	<el-main>
		<h1>广告列表</h1>
		<el-table
			:data="advertiseList"
			:default-sort="{ prop: 'create_time', order: 'descending' }"
			border>
			<el-table-column
				type="index"
				label="序号"
				width="220"
				align="center">
			</el-table-column>
			<el-table-column
				prop="category"
				label="广告类型"
				align="center">
			</el-table-column>
			<el-table-column
				prop="linkUrl"
				label="广告链接"
				align="center">
			</el-table-column>
			<el-table-column
				prop="imageUrl"
				label="广告图片"
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
				width="180"
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
						@click="$router.push(`/advertise/create/${scope.row.id}`)"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="mini"
						@click="deleteAdvertise(scope.row.id, scope.row.imageUrl)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</el-main>
</template>
<script>
	import { deleteImage } from "@/utils/utils";
	import moment from "moment";
	export default {
		name: "CategoryList",
		inject: ["reload"],
		data() {
			return {
				advertiseList: []
			};
		},
		methods: {
			dateFormate(row, column, cellValue, index) {
				return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
			},
			async getAdvertiseList() {
				const res = await this.$http.get("rest/advertise");
				const { body } = res.data;
				this.advertiseList = body;
			},

			deleteAdvertise(advertiseId, imageUrl) {
				this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(async () => {
					const res = await this.$http.delete(`rest/advertise/${advertiseId}`);
					const { code, message } = res.data;
					await deleteImage(imageUrl);
					this.$message({
						type: "success",
						message,
						center:true
					});
					this.reload();
				});
			}
		},
		created() {
			this.getAdvertiseList();
		}
	};
</script>
<style lang=""></style>
