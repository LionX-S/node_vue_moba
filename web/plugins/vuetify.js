// plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import {
	VLayout,
	VList,
	VNavigationDrawer,
	VListItem,
	VMain,
	VAppBar,
	VAppBarNavIcon,
	VToolbarTitle,
	VToolbarItems,
	VBtn,
	VIcon
} from "vuetify/components";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// 自定义主题


export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components: {
			VLayout,
			VList,
			VListItem,
			VAppBar,
			VAppBarNavIcon,
			VNavigationDrawer,
			VToolbarTitle,
			VToolbarItems,
			VMain,
			VBtn,
			VIcon
		},
		icons: {
			defaultSet: "mdi",
			aliases,
			sets: {
				mdi
			}
		}
	});

	nuxtApp.vueApp.use(vuetify);
});
