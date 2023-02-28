<template lang="">
	<el-main>
		<h1>{{ id ? "编辑" : "新建" }}广告</h1>
		<el-form
			label-width="120px"
			label-position="left"
			:rules="rules"
			:model="advertise"
			ref="advertise">
			<el-form-item
				label="广告类型"
				prop="category">
				<el-select
					v-model="advertise.category"
					placeholder="请选择">
					<el-option
						v-for="item in advertiseCategoryOpt"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item
				label="广告链接"
				prop="linkUrl">
				<el-input
					v-model="advertise.linkUrl"
					placeholder="请输入广告链接"></el-input>
			</el-form-item>
			<el-form-item
				label="广告图片"
				prop="imageUrl">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:headers="getAuthHeaders()"
					:show-file-list="false"
					:on-success="handleImageSuccess"
					:before-upload="beforeAvatarUpload">
					<img
						v-if="advertise.imageUrl"
						:src="advertise.imageUrl"
						class="avatar" />
					<i
						v-else
						class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="submitForm('advertise', save)"
					>保存</el-button
				>
				<el-button
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
	import { deleteImage } from "../../utils/utils";
	export default {
		props: ["id"],
		inject: ["reload"],
		name: "AdvertiseCreate",
		data() {
			return {
				advertise: {
					linkUrl: "",
					category: "",
					imageUrl: ""
				},
				advertiseCategoryOpt: [],
				// 输入检验规则
				rules: {
					category: [
						{ required: true, message: "请选择广告类型", trigger: "change" }
					],
					linkUrl: [
						{ required: true, message: "请输入广告链接", trigger: "blur" }
					],
					imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }]
				}
			};
		},
		methods: {
			async resetVal() {
				if (!this.id && this.advertise.imageUrl !== "") {
					await deleteImage(this.advertise.imageUrl);
				}
				this.resetForm("advertise");
			},
			async save() {
				let res;
				if (this.id) {
					res = await this.$http.put(
						`rest/advertise/${this.id}`,
						this.advertise
					);
				} else {
					res = await this.$http.post("rest/advertise", this.advertise);
				}
				this.$router.push("/advertise/list");
				this.$message({
					type: "success",
					message: res.data.message
				});
			},
			// 取消功能
			async cancel() {
				if (!this.id && this.advertise.imageUrl !== "") {
					await deleteImage(this.advertise.imageUrl);
				}
				this.$router.push("/advertise/list");
			},
			// 编辑分类功能
			async getAdvertiseById(id) {
				const res = await this.$http.get(`rest/advertise/${id}`);
				const { body } = res.data;
				this.advertise = { ...this.advertise, ...body[0] };
			},
			// 查询广告大分类下所有分类
			async getCategoryByAdv(advName) {
				const res = await this.$http.get(`getChildCategory/${advName}`);
				const { body } = res.data;
				this.advertiseCategoryOpt = body;
			},

			handleImageSuccess(res) {
				this.advertise.imageUrl = res.url;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === "image/jpeg";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isJPG && isLt2M;
			}
		},
		created() {
			this.id && this.getAdvertiseById(this.id);
			this.getCategoryByAdv("广告");
		},
		beforeRouteLeave(to, from, next) {
			if (to.path === "/advertise/create") {
				this.advertise.linkUrl = "";
				this.advertise.category = "";
				this.advertise.imageUrl = "";
			}
			next();
		}
	};
</script>
<style lang=""></style>
