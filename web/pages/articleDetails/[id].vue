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
	let imageUrl = ref("");
	const articleID = useRoute().params.id;
	const {apiBase} = useRuntimeConfig().public;
	const { data: articleData } = await useFetch(`${apiBase}/articles/${articleID}`);
	imageUrl.value = articleData.value.data[0].imageUrl;
</script>
<style lang=""></style>
