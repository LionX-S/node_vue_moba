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
	const { $addAniByID } = useNuxtApp();
	const { apiBase } = useRuntimeConfig().public;
	const { data: carouselData } = await useFetch(`${apiBase}/advertise`);
	const { data: cardData } = await useFetch(`${apiBase}/articles`);
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
