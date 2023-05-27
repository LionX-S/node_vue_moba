<template>
	<v-card
		id="articleCard"
		class="mt-10 w-100">
		<v-img
			v-if="imageUrl"
			:src="isOver ? imageUrl : ''"
			height="400px"
			cover></v-img>

		<v-card-title
			:id="id"
			:class="{ scrollAna: isScrollAna }">
			{{ title }}
		</v-card-title>

		<v-card-subtitle v-if="createTime">
			{{ moment(createTime).format("YYYY-MM-DD HH:MM:SS") }}
		</v-card-subtitle>
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
					class="text-decoration-none text-orange"
					@click="
						() => {
							addThumbUp_PageView(id);
						}
					">
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
					prepend-icon="mdi-heart"
					>{{ thumbUp }}
				</v-btn>
				<v-btn
					size="small"
					color="surface-variant"
					variant="text"
					prepend-icon="mdi-eye">
					{{ pageView }}
				</v-btn>
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
		thumbUp: Number,
		pageView: Number
	});
	const { $changeRefValue } = useNuxtApp();
	const { apiBase } = useRuntimeConfig().public;
	const isOver = ref(false);
	const isScrollAna = ref(false);
	if (process.client) {
		onMounted(() => {
			$changeRefValue(props.id, isScrollAna);
			$changeRefValue("articleCard", isOver);
		});
	}
	const addThumbUp_PageView = async (id) => {
		await useFetch(`${apiBase}/articles/thumb_view`, {
			method: "put",
			body: {
				id,
				thumbUp: props.thumbUp,
				pageView: props.pageView + 1
			}
		});
	};
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
