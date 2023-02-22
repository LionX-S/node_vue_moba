import http from "../http";

// 匹配string中的img标签并提取出图片链接
export const drawImgUrl = (text) => {
	const regexp = /<img(?:(?!\/>).|\n)*?>/gm;
	const arr = text.matchAll(regexp);
	const urlArr = Array.from(arr).map((item) => {
		return item[0].slice(item[0].indexOf("http"), item[0].indexOf('">'));
	});
	return urlArr;
};
// 删除图片
export const deleteImage = (imageUrl) => {
	let imagePath = imageUrl.slice(imageUrl.indexOf("uploads"));
	http.delete(`/deleteImage/${imagePath}`);
};
