<template lang="">
  <v-sheet class="mx-auto" :max-width="1080" :min-width="920">
    <Carousel :carouselData="carouselData"></Carousel>
    <Card></Card>
  </v-sheet>
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
<style></style>
