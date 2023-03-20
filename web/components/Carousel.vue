<template>
	<v-carousel
		class="mt-5 rounded-lg"
		
		:height="carouselHeight"
		hide-delimiter-background
		show-arrows="hover">
		<v-carousel-item
			v-for="(item, i) in carouselData"
			:key="i"
			:src="item.imgUrl"
			cover>
			<v-row class="d-flex flex-column position-absolute" style="bottom:5%; left: 5%;">
				<v-col>
					<v-label class="text-white text-h4">轻轻走</v-label>
				</v-col>
				<v-col>
					<v-btn rounded="pill" color="#E54D42" class="text-white">开始阅读</v-btn>
				</v-col>
			</v-row>
		</v-carousel-item>
	</v-carousel>
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

	// 根据窗口调整高度
	let carouselHeight: Ref<number> = ref(0);
	if (process.client) {
		onMounted(() => {
			carouselHeight.value =
				window.innerHeight - document.getElementById("navbar")!.offsetHeight - 50;
			window.addEventListener("resize", () => {
				carouselHeight.value =
					window.innerHeight - document.getElementById("navbar")!.offsetHeight -50;
			});
		});
	}
</script>

<style lang="scss">
  
</style>