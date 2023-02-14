<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}分类</h1>
		<el-form
			label-width="120px"
			@submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="category.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					native-type="submit"
					>保存</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		props: ["id"],
		name: "CategoryCreate",
		data() {
			return {
				category: {
					name: ""
				}
			};
		},
		methods: {
			async save() {
				// 填写数据校验
				if (!this.category.name.trim()) {
					this.$message({
						type: "warning",
						message: "请填写正确数据！"
					});
					return;
				}
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(
						`updateCategoryById/${this.id}`,
						this.category
					);
				} else {
					res = await this.$http.post("categories", this.category);
				}
				if (res.data.code === 200) {
					this.$router.push("/categories/list");
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
			async getCategoryById(id) {
				const res = await this.$http.get(`getCategoryById/${this.id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.category.name = body[0].name;
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			}
		},
		created() {
			this.id && this.getCategoryById(this.id);
		}
	};
</script>
<style lang=""></style>
