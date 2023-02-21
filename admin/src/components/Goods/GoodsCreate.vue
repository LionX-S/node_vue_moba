<template lang="">
	<div>
		<h1>{{ id ? "编辑" : "新建" }}物品</h1>
		<el-main>
			<el-form
				label-width="120px"
				@submit.native.prevent="save">
				<el-form-item label="物品名称">
					<el-input
						v-model="goods.name"
						placeholder="请输入物品名称"></el-input>
				</el-form-item>
				<el-form-item label="物品图片">
					<el-upload
						class="avatar-uploader"
						:action="$http.defaults.baseURL+'/upload'"
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
						native-type="submit"
						>保存</el-button
					>
					<el-button
						type="danger"
						@click="cancel"
						>取消</el-button
					>
				</el-form-item>
			</el-form>
		</el-main>
	</div>
</template>
<script>
import { deleteImage } from '@/utils/utils';

	export default {
		props: ["id"],
		inject: ["reload"],
		name: "GoodsCreate",
		data() {
			return {
				goods: {
					name: "",
					imageUrl: ""
				}
			};
		},
		methods: {
			async save() {
				// 填写数据校验
				if (!this.goods.name.trim()) {
					this.$message({
						type: "warning",
						message: "请填写正确数据！"
					});
					return;
				}
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
				if (res.data.code === 200) {
					this.$router.push("/goods/list");
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
			// 取消功能
			async cancel() {
				// 如果已经上传了图片，则删除(只针对新建信息时删除图片，编辑功能时不删除)
				if(!this.id && this.goods.imageUrl !== '') {
					await deleteImage(this.goods.imageUrl);
				}
				this.$router.push("/goods/list")
			},
			// 编辑分类功能
			async getGoodsById(id) {
				const res = await this.$http.get(`rest/goods/${this.id}`);
				const { body, message, code } = res.data;
				if (code === 200) {
					this.goods = {...this.goods, ...body[0]};
				} else {
					this.$message({
						type: "error",
						message
					});
				}
			},
			handleImageSuccess(res) {
				this.goods.imageUrl = res.url;
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
			this.id && this.getGoodsById(this.id);
		},

		// 解决由编辑页面直接点击新建功能时，form遗留数据的issue
		beforeRouteLeave(to, from, next) {
			if(to.path==="/goods/create") {
				this.goods.name = '';
				this.goods.imageUrl = ''
			}
			next();
		}
	};
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
