<template>
	<v-layout>
		<NavBar></NavBar>
		<v-sheet
			:max-width="1280"
			class="mx-auto"
			style="background-color: rgb(0,0,0,0);">
			<v-container class="mx-auto pl-3 pr-3 mt-10"></v-container>
			<NuxtPage></NuxtPage>
		</v-sheet>
	</v-layout>
</template>

<script setup></script>
