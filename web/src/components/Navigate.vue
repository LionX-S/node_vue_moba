<template lang="">
	<div class="w-full h-14 bg-white flex shadow">
		<div class="logo w-40 h-full flex-none ml-6">
			<img
				src=""
				alt="" />
		</div>
		<div class="h-full flex flex-grow ml-6 mr-6 text-center justify-center">
			<div
				class="w-20 h-full ml-3 mr-3 font-semibold flex justify-center items-center hover:bg-slate-100 cursor-default"
				:class="{ 'bg-slate-50': state.activeIndex == 1 }"
				@click="getIndex(1)">
				文章
			</div>
			<div
				class="w-20 h-full ml-3 mr-3 font-semibold flex justify-center items-center hover:bg-slate-100 cursor-default"
				:class="{ 'bg-slate-50': state.activeIndex == 2 }"
				@click="getIndex(2)">
				圈子
			</div>
			<div
				class="w-20 h-full ml-3 mr-3 font-semibold flex justify-center items-center hover:bg-slate-100 cursor-default"
				:class="{ 'bg-slate-50': state.activeIndex == 3 }"
				@click="getIndex(3)">
				互动
			</div>
		</div>
		<div
			class="logo w-40 h-full flex flex-none justify-center items-center mr-6">
			<button
				class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
				登录
			</button>
		</div>
	</div>
</template>
<script>
	import { reactive } from "vue";
	export default {
		setup() {
			const state = reactive({ activeIndex: 1 });
			function getIndex(index) {
				state.activeIndex = index;
			}
			return {
				state,
				getIndex
			};
		}
	};
</script>
<style></style>
