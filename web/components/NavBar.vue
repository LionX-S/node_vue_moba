<template>
	<v-navigation-drawer
		v-model="drawer"
    temporary
		class="bg-deep-purple">
		<v-list nav>
			<v-list-item
				prepend-icon="mdi-home-circle"
				title="首页"
				value="home"
				to="/">
			</v-list-item>
			<v-list-item
				prepend-icon="mdi-account-supervisor-circle"
				title="圈子"
				value="friends"
				to="/friends">
			</v-list-item>
			<v-list-item
				prepend-icon="mdi-account-search"
				title="关于我"
				value="aboutMe"
				to="/about">
			</v-list-item>
		</v-list>
	</v-navigation-drawer>

	<v-app-bar id="navbar" class="navbarClass">
		<v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="toggleNav"></v-app-bar-nav-icon>
		<v-sheet
			class="d-flex align-center justify-space-between mx-auto w-100 h-100"
			:max-width="1180">
			<v-sheet>电磁力</v-sheet>
			<v-sheet class="d-none d-sm-flex justify-space-around h-100">
				<v-list-item
					title="首页"
					value="home"
					to="/">
				</v-list-item>
				<v-list-item
					title="圈子"
					value="friends"
					to="/friends">
				</v-list-item>
				<v-list-item
					title="关于我"
					value="aboutMe"
					to="/about">
				</v-list-item>
			</v-sheet>
			<v-sheet>
				<v-btn
					icon
					@click="toggleTheme">
					<v-icon>mdi-theme-light-dark</v-icon>
				</v-btn>
			</v-sheet>
		</v-sheet>
	</v-app-bar>
</template>
<script setup>
	import { ref } from "vue";
	import { useTheme } from "vuetify";

	const theme = useTheme();
	let drawer = ref(false);
  function toggleNav() {
    drawer.value = !drawer.value;
  }
	function toggleTheme() {
		theme.global.name.value = theme.global.current.value.dark
			? "light"
			: "dark";
	}
</script>
<style scoped lang="scss">
.navbarClass{
	position: relative;
		animation-name: navBarAni;
		animation-duration: .5s;
		animation-timing-function: linear;
		-webkit-animation-name: navBarAni;
		-webkit-animation-duration: .5s;
		-webkit-animation-timing-function: linear;
}
</style>
