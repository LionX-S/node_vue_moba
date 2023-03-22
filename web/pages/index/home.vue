<template lang="">
	<Carousel :carouselData="carouselData.data"></Carousel>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<Card
					v-for="item in cardData.data"
					:key="item.id"
					:id="item.id"
					:imageUrl="item.imageUrl"
					:title="item.title"
					:createTime="item.create_time"
					:content="item.comment"
					:length="cardData.data.length"></Card>
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
	const { data: carouselData } = await useFetch("/api/advertise");
	const { data: cardData } = await useFetch("/api/articles");
	if (process.client) {
		onMounted(() => {
			$addAniByID("cardContainer", "scrollAna");
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
