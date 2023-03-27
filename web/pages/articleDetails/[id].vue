<template lang="">
	<v-container>
		<v-sheet class="bounce-enter">
			<v-img
				:src="imageUrl"
				cover
				height="500"
				aspect-ratio="16/9"></v-img>
		</v-sheet>
		<v-sheet
			class="w-100 pa-5"
			:height="250">
			<v-sheet class="text-h4 mb-5">{{ title }}</v-sheet>
			<v-sheet class="mb-5">{{
				moment(create_time).format("YYYY-MM-DD HH:MM:SS")
			}}</v-sheet>
			<v-sheet v-html="comment"></v-sheet>
		</v-sheet>
	</v-container>
</template>
<script setup>
	import moment from "moment";
	const articleID = useRoute().params.id;
	const { apiBase } = useRuntimeConfig().public;
	const { data: articleData } = await useFetch(
		`${apiBase}/articles/${articleID}`
	);
	const { imageUrl, title, create_time, comment } = articleData.value.data[0];
</script>
<style lang="scss">
	.bounce-enter {
		animation: bounce-in 1s;
	}
</style>
