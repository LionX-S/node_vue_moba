
module.exports = (app) =>{
	const express = require("express");
  // 不启用通用curd接口的api
	const router = express.Router();

	const mysql = require("../../plugins/db");


	function setFirstLevelArray(result) {
		return result.map((item, index) => {
			return {
				id: item.id,
				label: item.name
			};
		});
	}

  // 一级分类列表,这个接口特殊情况 暂不做通用接口
	router.get("/getFirstCategory", async (req, res) => {
		await mysql().query(
			'select * from categories where higherLevelID="firstLevel"',
			(err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: "获取一级分类数据失败",
						err
					});
				} else {
					res.send({
						code: 200,
						body: {
							label: "一级分类",
							options: setFirstLevelArray(result)
						}
					});
				}
			}
		);
	});

  // 非通用curd接口
	app.use("/admin/specialApi",router);
}