<template>
	<v-card
		id="articleCard"
		class="mt-10">
		<v-img
			src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
			height="200px"
			cover></v-img>

		<v-card-title
			id="articleTitle"
			:class="{ scrollAna: addAnimal }">
			Top western road trips
		</v-card-title>

		<v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

		<v-card-actions>
			<v-btn
				color="orange-lighten-2"
				variant="text">
				开始阅读
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn
				:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				@click="show = !show"></v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

				<v-card-text>
					I'm a thing. But, like most politicians, he promised more than he
					could deliver. You won't have time for sleeping, soldier, not with all
					the bed making you'll be doing. Then we'll go with that data file!
					Hey, you add a one and two zeros to that or we walk! You're going to
					do his laundry? I've got to find a way to escape.
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>
<script setup>
	import { ref, onMounted } from "vue";
	let show = ref(false);
	let addAnimal = ref(false);
	if (process.client) {
		onMounted(() => {
			let innerHeight = window.innerHeight;
			window.addEventListener("scroll", () => {
				let topHeight = document
					.getElementById("articleTitle")
					.getBoundingClientRect().top;
				if (topHeight < innerHeight) {
					addAnimal.value = true;
				}
			});
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
