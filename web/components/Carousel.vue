<template>
	<v-responsive
		class="mx-auto mb-10 mt-10"
		:aspect-ratio="4 / 3"
		:max-width="1080">
		<v-carousel
			:height="documentHeight"
			hide-delimiter-background
			show-arrows="hover">
			<v-carousel-item
				v-for="(item, i) in carouselData"
				:key="i"
				:src="item.imgUrl"
				cover></v-carousel-item>
		</v-carousel>
	</v-responsive>
</template>
<script setup lang="ts">
	import { ref, onMounted, watch } from "vue";
	// 定义props
	defineProps<{
		carouselData?: Array<{
			link?: string;
			imgUrl?: string;
		}>;
	}>();

	let documentHeight: Ref<number> = ref(0);
	if (process.client) {
		onMounted(() => {
			documentHeight.value = window.innerHeight;
			window.addEventListener("resize", () => {
				documentHeight.value = window.innerHeight;
			});
		});
	}
</script>
