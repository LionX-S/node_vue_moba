<template lang="">
	<Carousel :carouselData="carouselData"></Carousel>
	<Card v-for="i in 4"></Card>
</template>
<script setup>
	const carouselData = [
		{ link: "#", imgUrl: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
		{
			imgUrl: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
		},
		{
			imgUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
		}
	];
</script>
