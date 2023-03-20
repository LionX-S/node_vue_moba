import { defineNuxtPlugin } from "#app";

// 自定义插件方法来实现方法的公用
export default defineNuxtPlugin(() => {
	return {
		provide: {
			addAniByID(id, className) {
				let innerHeight = window.innerHeight;
				window.addEventListener("scroll", () => {
					let topHeight = id && document
						.getElementById(id)
						.getBoundingClientRect().top;
					if (topHeight < innerHeight) {
						document.getElementById(id).classList.add(className)
					}
				});
			}
		}
	};
});
