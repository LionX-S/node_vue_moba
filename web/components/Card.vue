<template>
	<v-card
		id="articleCard"
		class="mt-10">
		<v-img
			:src="imageUrl"
			height="200px"
			cover></v-img>

		<v-card-title :id="id">
			{{ title }}
		</v-card-title>

		<v-card-subtitle> {{ createTime }}</v-card-subtitle>
		<v-card-text
			class="overflow-hidden"
			style="height: 55px">
			{{ content }}
		</v-card-text>
		<v-card-actions>
			<v-btn
				color="orange-lighten-2"
				variant="text">
				<NuxtLink :to="`/articleDetails/${id}`" class="text-decoration-none text-orange">
					开始阅读
				</NuxtLink>
			</v-btn>

			<v-spacer></v-spacer>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					size="small"
					color="surface-variant"
					variant="text"
					icon="mdi-heart"></v-btn>

				<v-btn
					size="small"
					color="surface-variant"
					variant="text"
					icon="mdi-bookmark"></v-btn>

				<v-btn
					size="small"
					color="surface-variant"
					variant="text"
					icon="mdi-share-variant"></v-btn>
			</v-card-actions>
		</v-card-actions>
	</v-card>
</template>
<script setup>
	import { onMounted } from "vue";
	const props = defineProps({
		id: String,
		imageUrl:String,
		title: String,
		createTime: String,
		content: String,
		length: Number
	})
	const { $addAniByID } = useNuxtApp();
	if (process.client) {
		onMounted(() => {
			for (let i = 0; i < props.length; i++) {
				$addAniByID(props.id, "scrollAna");
			}
		});
	}
</script>

<style lang="scss">
	.scrollAna {
		position: relative;
		animation-name: homeCardAnima;
		animation-duration: 1s;
		animation-timing-function: linear;
		-webkit-animation-name: homeCardAnima;
		-webkit-animation-duration: 1s;
		-webkit-animation-timing-function: linear;
	}
</style>
