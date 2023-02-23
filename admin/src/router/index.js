import VueRouter from "vue-router";

import Main from "../components/Main.vue";
// 分类组件
import CategoryCreate from "../components/Category/CategoryCreate.vue";
import CategoryList from '../components/Category/CategoryList.vue';

// 物品组件
import GoodsCreate from '../components/Goods/GoodsCreate.vue';
import GoodsList from '../components/Goods/GoodsList.vue';

// 英雄组件
import HeroCreate from '../components/Hero/HeroCreate.vue';
import HeroList from '../components/Hero/HeroList.vue';

// 文章组件
import ArticleCreate from '../components/Articles/ArticleCreate.vue';
import ArticleList from '../components/Articles/ArticleList.vue';

// 广告功能
import AdvertiseCreate from '../components/Advertise/AdvertiseCreate.vue';
import AdvertiseList from '../components/Advertise/AdvertiseList.vue';

// 用户
import UsersCreate from '../components/User/UsersCreate.vue';
import UsersList from '../components/User/UsersList.vue';

export default new VueRouter({
	routes: [
		{
			path: "/",
			name: "main",
			component: Main,
			children: [
				// 分类功能路由
				{
					path: "/categories/create",
					component: CategoryCreate
				},
				{
					path: "/categories/create/:id",
					component: CategoryCreate,
					props:true
				},
				{
					path: "/categories/list",
					component: CategoryList
				},
				// 物品功能路由
				{
					path: "/goods/create",
					component: GoodsCreate
				},
				{
					path: "/goods/create/:id",
					component: GoodsCreate,
					props:true
				},
				{
					path: "/goods/list",
					component: GoodsList
				},
				// 英雄功能路由
				{
					path: "/heroes/create",
					component: HeroCreate
				},
				{
					path: "/heroes/create/:id",
					component: HeroCreate,
					props:true
				},
				{
					path: "/heroes/list",
					component: HeroList
				},
				// 文章功能路由
				{
					path: "/articles/create",
					component: ArticleCreate
				},
				{
					path: "/articles/create/:id",
					component: ArticleCreate,
					props:true
				},
				{
					path: "/articles/list",
					component: ArticleList
				},
				// 广告功能路由
				{
					path: "/advertise/create",
					component: AdvertiseCreate
				},
				{
					path: "/advertise/create/:id",
					component: AdvertiseCreate,
					props:true
				},
				{
					path: "/advertise/list",
					component: AdvertiseList
				},
				// 用户功能路由
				{
					path: "/user/create",
					component: UsersCreate
				},
				{
					path: "/user/create/:id",
					component: UsersCreate,
					props:true
				},
				{
					path: "/user/list",
					component: UsersList
				}
			]
		}
	]
});
