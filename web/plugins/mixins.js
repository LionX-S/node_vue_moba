import { defineNuxtPlugin } from "#app";

// 自定义插件方法来实现方法的公用
export default defineNuxtPlugin(() => {
	return {
		provide: {
			changeRefValue(id, refValue) {
				let innerHeight = window.innerHeight;
				const scrollHandle = () => {
					let topHeight = id && document
						.getElementById(id)
						.getBoundingClientRect().top;
					if (topHeight < innerHeight) {
						refValue.value = true;
						window.removeEventListener("scroll",scrollHandle)
					}
				}
				window.addEventListener("scroll", scrollHandle);
			}
		}
	};
});
