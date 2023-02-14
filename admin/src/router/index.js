import VueRouter from "vue-router";

import Main from "../components/Main.vue";
import CategoryCreate from "../components/Category/CategoryCreate.vue";
import CategoryList from '../components/Category/CategoryList.vue';

export default new VueRouter({
	routes: [
		{
			path: "/",
			name: "main",
			component: Main,
			children: [
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
				}
			]
		}
	]
});
