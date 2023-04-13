<template lang="">
	<v-container>
		<v-sheet
			:max-width="1280"
			border
			elevations="6"
			class="mx-auto">
			<v-sheet class="bounce-enter">
				<v-img
					:src="imageUrl"
					cover
					height="500"
					aspect-ratio="16/9"></v-img>
			</v-sheet>
			<v-sheet class="w-100 pa-5">
				<v-sheet class="text-h4 mb-5">{{ title }}</v-sheet>
				<v-sheet class="d-flex align-center">
					<v-sheet class="text-grey justify-start">{{
						moment(create_time).format("YYYY-MM-DD HH:MM:SS")
					}}</v-sheet>
					<v-spacer></v-spacer>
					<v-sheet class="d-flex justify-end">
						<v-btn
							size="small"
							:style="{color: isThumbUp ? 'red' : 'surface-variant'}"
							variant="text"
							prepend-icon="mdi-heart"
							@click="addThumbUp_PageView"
							>{{ isThumbUp ? thumbUp + 1 : thumbUp }}
						</v-btn>
						<v-btn
							size="small"
							color="surface-variant"
							variant="text"
							prepend-icon="mdi-eye">
							{{ pageView }}
						</v-btn>
					</v-sheet>
				</v-sheet>
				<v-sheet
					v-html="comment"
					class="mt-10 overflow-auto"></v-sheet>
			</v-sheet>
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
	const { imageUrl, title, create_time, comment, thumbUp, pageView } =
		articleData.value.data[0];
	const isThumbUp = ref(false);
	const addThumbUp_PageView = async () => {
		if (!isThumbUp.value) {
			await useFetch(`${apiBase}/articles/thumb_view`, {
				method: "put",
				body: {
					id: articleID,
					thumbUp: thumbUp+1,
					pageView
				}
			});
			isThumbUp.value = true;
		}
		return;
	};
</script>
<style lang="scss">
	.bounce-enter {
		animation: bounce-in 1s;
	}
</style>
