<template>
	<el-container style="height: 100vh">
		<el-aside
			width="200px"
			style="background-color: rgb(238, 241, 246)">
			<el-menu
				router
				:default-active="$route.path">
				<el-submenu index="1">
					<template slot="title"
						><i class="el-icon-s-order"></i>内容管理</template
					>
					<el-menu-item-group title="物品管理">
						<el-menu-item index="/goods/create">新建物品</el-menu-item>
						<el-menu-item index="/goods/list">物品列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="英雄管理">
						<el-menu-item index="/heroes/create">新建英雄</el-menu-item>
						<el-menu-item index="/heroes/list">英雄列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="文章管理">
						<el-menu-item index="/articles/create">新建文章</el-menu-item>
						<el-menu-item index="/articles/list">文章列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="广告管理">
						<el-menu-item index="/advertise/create">新建广告</el-menu-item>
						<el-menu-item index="/advertise/list">广告列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"
						><i class="el-icon-s-tools"></i>系统管理</template
					>
					<el-menu-item-group>
						<template slot="title">分类管理</template>
						<el-menu-item index="/categories/create">新建分类</el-menu-item>
						<el-menu-item index="/categories/list">分类列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="用户管理">
						<el-menu-item index="/user/create">新建用户(管理员)</el-menu-item>
						<el-menu-item index="/user/list">用户列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown>
					<i
						class="el-icon-setting"
						style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>管理员</span>
			</el-header>
			<router-view v-if="isRouterAlive"></router-view>
		</el-container>
	</el-container>
</template>

<style>
	.el-header {
		background-color: #b3c0d1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
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
		width: 78px;
		height: 78px;
		line-height: 78px;
		text-align: center;
	}
	.avatar {
		width: 78px;
		height: 78px;
		display: block;
	}
	.skillsItem {
		padding-left: 50px;
	}
</style>

<script>
	export default {
		// 实现router-view的刷新功能
		provide() {
			return {
				reload: this.reload
			};
		},
		data() {
			return {
				isRouterAlive: true
			};
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				});
			}
		}
	};
</script>
