<template lang="">
	<v-container>
		<v-img
			:src="imageUrl"
			cover
			height="400"
			aspect-ratio="16/9"></v-img>
	</v-container>
</template>
<script setup>
	import { ref, onMounted, nextTick } from "vue";
	let imageUrl = ref("");
	const fetchData = async () => {
		await nextTick();
		const articleID = useRoute().params.id;
		const { data: articleData } = await useFetch(`/api/articles/${articleID}`);
		// return articleData;
		imageUrl.value = articleData.value.data[0].imageUrl;
	};

	fetchData();
	// onMounted(async () => {
	// 	const articleData = await fetchData();
	// 	imageUrl.value = articleData.value.data[0].imageUrl;
	// });
	// const articleData = await fetchData();
	// console.log("🚀 ~ file: [id].vue:20 ~ articleData:", articleData)

	// imageUrl.value = articleData.value.data[0].imageUrl;
	onMounted(async () => {
		// 调用这个方法的用途是解决刷新页面后useFetch不请求数据的问题
		const articleID = useRoute().params.id;
		const { data: articleData } = await useFetch(`/api/articles/${articleID}`);
		imageUrl.value = articleData.value.data[0].imageUrl;
	});
</script>
<style lang=""></style>
