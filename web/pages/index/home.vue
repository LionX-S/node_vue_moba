<template lang="">
	<Carousel :carouselData="carouselData"></Carousel>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<Card v-for="(i, index) in 4" :key="index" :id="index"></Card>
			</v-col>
			<v-col
				cols="4"
				class="d-none d-sm-flex">
				<div id="cardContainer">
					<Card></Card>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup>
	import { ref, onMounted } from "vue";
	const { $addAniByID } = useNuxtApp();
	const carouselData = [
		{ link: "#", imgUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
		{
			imgUrl: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
		},
		{
			imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		}
	];
	if (process.client) {
		onMounted(() => {
			$addAniByID('cardContainer', 'scrollAna');
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