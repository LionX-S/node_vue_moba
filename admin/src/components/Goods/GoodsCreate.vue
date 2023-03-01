<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}物品</h1>
		<el-form
			label-width="120px"
			label-position="left"
			ref="goods"
			:rules="rules"
			:model="goods">
			<el-form-item
				label="物品名称"
				prop="name">
				<el-input
					v-model="goods.name"
					placeholder="请输入物品名称"></el-input>
			</el-form-item>
			<el-form-item
				label="物品图片"
				prop="imageUrl">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:headers="getAuthHeaders()"
					:show-file-list="false"
					:on-success="handleImageSuccess"
					:before-upload="beforeAvatarUpload">
					<img
						v-if="goods.imageUrl"
						:src="goods.imageUrl"
						class="avatar" />
					<i
						v-else
						class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('goods', save)"
					>保存</el-button
				>
				<el-button
					v-if="!id"
					@click="resetVal"
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
	import { deleteImage } from "@/utils/utils";

	export default {
		props: ["id"],
		inject: ["reload"],
		name: "GoodsCreate",
		data() {
			return {
				goods: {
					name: "",
					imageUrl: ""
				},
				rules: {
					name: [
						{ required: true, message: "请填写物品名称", trigger: "blur" }
					],
					imageUrl: [
						{ required: true, message: "请上传图片", trigger: "change" }
					]
				}
			};
		},
		methods: {
			async resetVal() {
				if (!this.id && this.goods.imageUrl !== "") {
					await deleteImage(this.goods.imageUrl);
				}
				this.resetForm("goods");
			},
			async save() {
				// 如果是新建则走新建api，如果是编辑走编辑api
				let res;
				if (this.id) {
					res = await this.$http.put(`rest/goods/${this.id}`, this.goods);
				} else {
					res = await this.$http.post("rest/goods", {
						name: this.goods.name,
						imageUrl: this.goods.imageUrl
					});
				}
				this.$router.push("/goods/list");
				this.$message({
					type: "success",
					message: res.data.message
				});
			},
			// 取消功能
			async cancel() {
				// 如果已经上传了图片，则删除(只针对新建信息时删除图片，编辑功能时不删除)
				if (!this.id && this.goods.imageUrl !== "") {
					await deleteImage(this.goods.imageUrl);
				}
				this.$router.push("/goods/list");
			},
			// 编辑分类功能
			async getGoodsById(id) {
				const res = await this.$http.get(`rest/goods/${this.id}`);
				const { body } = res.data;
				this.goods = { ...this.goods, ...body[0] };
			},
			handleImageSuccess(res) {
				this.goods.imageUrl = res.url;
				this.$refs.goods.clearValidate("imageUrl");
			}
		},
		created() {
			this.id && this.getGoodsById(this.id);
		},

		// 解决由编辑页面直接点击新建功能时，form遗留数据的issue
		beforeRouteLeave(to, from, next) {
			if (to.path === "/goods/create") {
				this.goods.name = "";
				this.goods.imageUrl = "";
			}
			next();
		}
	};
</script>
<style></style>
