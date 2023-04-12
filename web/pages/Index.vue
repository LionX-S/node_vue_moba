<template>
	<v-layout>
		<NavBar></NavBar>
		<v-container class="mx-auto pl-3 pr-3 mt-10">
			<v-sheet :max-width="1280" class="mx-auto" style="background-color: rgb(238, 241, 246);">
				<NuxtPage></NuxtPage>
			</v-sheet>
		</v-container>
	</v-layout>
</template>

<script setup></script>
