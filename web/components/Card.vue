<template>
	<v-card
		id="articleCard"
		class="mt-10 w-100">
		<v-img
			:src="isOver ? imageUrl : ''"
			height="200px"
			cover></v-img>

		<v-card-title :id="id" :class="{scrollAna: isScrollAna}">
			{{ title }}
		</v-card-title>

		<v-card-subtitle>
			{{ moment(createTime).format("YYYY-MM-DD HH:MM:SS") }}</v-card-subtitle
		>
		<v-card-text
			class="overflow-hidden"
			style="height: 55px"
			v-html="content">
		</v-card-text>
		<v-card-actions>
			<v-btn
				color="orange-lighten-2"
				variant="text">
				<NuxtLink
					:to="`/articleDetails/${id}`"
					class="text-decoration-none text-orange">
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
	import moment from "moment";
	import { onMounted } from "vue";
	const props = defineProps({
		id: String,
		imageUrl: String,
		title: String,
		createTime: String,
		content: String,
	});
	const { $changeRefValue } = useNuxtApp();
	const isOver = ref(false);
	const isScrollAna = ref(false);
	if (process.client) {
		onMounted(() => {
			$changeRefValue(props.id, isScrollAna);
			$changeRefValue('articleCard', isOver);
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
