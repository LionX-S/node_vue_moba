<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}分类</h1>
		<el-form
			label-width="120px"
			label-position="left"
			:model="category"
			:rules="rules"
			ref="category">
			<el-form-item label="分类级别">
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
			<el-form-item
				label="分类名称"
				prop="name">
				<el-input
					v-model="category.name"
					placeholder="请输入分类名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('category', save)"
					>保存</el-button
				>
				<el-button
					v-if="!id"
					@click="resetForm('category')"
					type="warning"
					>重置</el-button
				>
				<el-button
					type="danger"
					@click="cancel"
					>取消</el-button
				>
			</el-form-item>
		</el-form>
	</el-main>
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
						options: [
							{
								id: "firstLevel",
								label: "一级分类"
							}
						]
					}
				],
				categoryLevelValue: "firstLevel",
				rules: {
					name: [{ required: true, message: "请填写分类名称", trigger: "blur" }]
				}
			};
		},
		methods: {
			async save() {
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(
						`rest/categories/${this.id}`,
						this.category
					);
				} else {
					res = await this.$http.post("rest/categories", {
						name: this.category.name,
						higherLevelID: this.categoryLevelValue
					});
				}
				this.$router.push("/categories/list");
				this.$message({
					type: "success",
					message: res.data.message
				});
			},
			// 取消功能
			async cancel() {
				this.$router.push("/categories/list");
			},
			// 编辑分类功能
			async getCategoryById(id) {
				const res = await this.$http.get(`rest/categories/${this.id}`);
				const { body } = res.data;
				this.category.name = body[0].name;
				this.categoryLevelValue = body[0].higherLevelID;
			},
			// 获取一级分类列表
			async getFirstCategory() {
				const res = await this.$http.get("getFirstCategory");
				const { body } = res.data;
				this.categoryLevel.push(body);
			}
		},
		created() {
			this.id && this.getCategoryById(this.id);
			this.getFirstCategory();
		},
		beforeRouteLeave(to, from, next) {
			if (to.path === "/categories/create") {
				this.category.name = "";
			}
			next();
		}
	};
</script>
<style lang=""></style>
