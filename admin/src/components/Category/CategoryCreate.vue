<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}分类</h1>
		<el-main>
			<el-form
				label-width="120px"
				@submit.native.prevent="save">
				<el-form-item label="上级分类">
					<el-select
						v-model="categoryLevelValue"
						placeholder="请选择上级分类">
						<el-option-group
							v-for="group in categoryLevel"
							:key="group.label"
							:label="group.label">
							<el-option
								v-for="item in group.options"
								:key="item.id"
								:label="item.label"
								:value="item.id">
							</el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称">
					<el-input
						v-model="category.name"
						placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						native-type="submit"
						>保存</el-button
					>
				</el-form-item>
			</el-form>
		</el-main>
	</div>
</template>
<script>
	export default {
		props: ["id"],
		inject: ["reload"],
		name: "CategoryCreate",
		data() {
			return {
				category: {
					name: ""
				},
				// 一级分类
				categoryLevel: [
					{
						label: "默认值",
						options: [
							{
								id: "firstLevel",
								label: "设置为一级分类"
							}
						]
					}
				],
				categoryLevelValue: ""
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
					res = await this.$http.post("categories", {
						name: this.category.name,
						categoryLevelID: this.categoryLevelValue
					});
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
			// 编辑分类功能
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
			},
			// 获取一级分类列表
			async getFirstCategory() {
				const res = await this.$http.get("getFirstCategory");
				const { body, message, code } = res.data;
				if (code === 200) {
					this.categoryLevel.push(body);
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
			this.getFirstCategory();
		}
	};
</script>
<style lang=""></style>
