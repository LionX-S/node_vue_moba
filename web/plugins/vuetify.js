// plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// 自定义主题

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
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
