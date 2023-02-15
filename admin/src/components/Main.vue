<template>
	<el-container style="height: 100vh">
		<el-aside
			width="200px"
			style="background-color: rgb(238, 241, 246)">
			<el-menu router>
				<el-submenu index="1">
					<template slot="title"
						><i class="el-icon-message"></i>内容管理</template
					>
					<el-menu-item-group>
						<template slot="title">分类</template>
						<el-menu-item index="/categories/create">新建分类</el-menu-item>
						<el-menu-item index="/categories/list">分类列表</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="分组2">
						<el-menu-item index="1-3">选项3</el-menu-item>
					</el-menu-item-group>
					<el-submenu index="1-4">
						<template slot="title">选项4</template>
						<el-menu-item index="1-4-1">选项4-1</el-menu-item>
					</el-submenu>
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
				<span>王小虎</span>
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
