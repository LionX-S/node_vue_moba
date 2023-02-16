<template>
	<el-container style="height: 100vh">
		<el-aside
			width="200px"
			style="background-color: rgb(238, 241, 246)">
			<el-menu router>
				<el-submenu index="1">
					<template slot="title"
						><i class="el-icon-s-order"></i>分类管理</template
					>
					<el-menu-item-group>
						<el-menu-item index="/categories/create">新建分类</el-menu-item>
						<el-menu-item index="/categories/list">分类列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"
						><i class="el-icon-files"></i>物品管理</template
					>
					<el-menu-item-group>
						<el-menu-item index="/goods/create">新建物品</el-menu-item>
						<el-menu-item index="/goods/list">物品列表</el-menu-item>
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
