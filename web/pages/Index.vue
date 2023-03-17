<template>
	<v-layout>
		<v-navigation-drawer v-model="drawer">
			<v-list>
				<v-list-item title="Web"></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar>
			<v-app-bar-nav-icon @click.stop="toggleDraw"></v-app-bar-nav-icon>

			<v-toolbar-title>Web</v-toolbar-title>
			<v-btn icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
		</v-app-bar>

		<v-main>
			<NuxtPage></NuxtPage>
		</v-main>
	</v-layout>
</template>

<script>
	import { ref } from "vue";
	import { useTheme } from "vuetify";
	export default {
		setup() {
			const theme = useTheme();
			let drawer = ref(false);
			return {
				theme,
				toggleTheme: () =>
					(theme.global.name.value = theme.global.current.value.dark
						? "light"
						: "dark"),
				drawer,
				toggleDraw: () => (drawer.value = !drawer.value)
			};
		}
	};
</script>
