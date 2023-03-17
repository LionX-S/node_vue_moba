<template>
	<v-layout>
		<NavBar></NavBar>
		<v-main>
			<v-sheet :max-width="1080" class="mx-auto">
				<NuxtPage></NuxtPage>
			</v-sheet>
		</v-main>
	</v-layout>
</template>

<script setup></script>
