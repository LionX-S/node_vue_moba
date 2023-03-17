<template>
	<v-responsive
		class="mx-auto mb-10 mt-10"
		:aspect-ratio="16 / 9"
		:max-width="1080">
		<v-carousel
      class="h-100"
			hide-delimiter-background
			show-arrows="hover">
			<v-carousel-item
				v-for="item in carouselData"
				:src="item.imgUrl"
				cover></v-carousel-item>
		</v-carousel>
	</v-responsive>
</template>
<script setup lang="ts">
	// 定义props
	defineProps<{
		carouselData?: Array<{
			link?: string;
			imgUrl?: string;
		}>;
	}>();
</script>
