<template>
	<v-layout>
		<NavBar></NavBar>
		<v-main>
			<v-sheet :max-width="1080" class="mx-auto pl-3 pr-3">
				<NuxtPage></NuxtPage>
			</v-sheet>
		</v-main>
	</v-layout>
</template>

<script setup></script>
