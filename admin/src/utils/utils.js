import http from '../http';
// 删除图片
export const deleteImage = (imageUrl) => {
  let imagePath = imageUrl.slice(
    imageUrl.indexOf("uploads")
  );
  http.delete(`/deleteImage/${imagePath}`);
}