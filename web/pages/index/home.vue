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
					:thumbUp="item.thumbUp"
					:pageView="item.pageView"></Card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup>
	const { $changeRefValue } = useNuxtApp();
	const { apiBase } = useRuntimeConfig().public;
	const isScrollAna = ref(false);
	const { data: carouselData } = await useFetch(`${apiBase}/advertise`);
	const { data: cardData } = await useFetch(`${apiBase}/articles`);
	if (process.client) {
		onMounted(() => {
			$changeRefValue("cardContainer", isScrollAna);
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
