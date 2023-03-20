<template>
	<v-card
		id="articleCard"
		class="mt-10">
		<v-img
			src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
			height="200px"
			cover></v-img>

		<v-card-title :id="'articleTitle' + props.id">
			Top western road trips
		</v-card-title>

		<v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
		<v-card-text
			class="overflow-hidden"
			style="height: 55px">
			I'm a thing. But, like most politicians, he promised more than he could
			deliver. You won't have time for sleeping, soldier, not with all the bed
			making you'll be doing. Then we'll go with that data file! Hey, you add a
			one and two zeros to that or we walk! You're going to do his laundry? I've
			got to find a way to escape.
		</v-card-text>
		<v-card-actions>
			<v-btn
				color="orange-lighten-2"
				variant="text">
				开始阅读
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
	import { ref, onMounted } from "vue";
	const { $addAniByID } = useNuxtApp();
	const props = defineProps(["id"]);
	if (process.client) {
		onMounted(() => {
			for (let i = 0; i < 4; i++) {
				$addAniByID(`articleTitle${i}`, "scrollAna");
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
