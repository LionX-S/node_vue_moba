function setFirstLevelArray(result) {
	return result.map((item, index) => {
		return {
			id: item.id,
			label: item.name
		};
	});
}
module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const mysql = require("../../plugins/db");
	// 新版nanoid不支持commonJS
	let nanoid;
	const nanoidModel = async () => {
		const model = await import("nanoid");
		return model;
	};
	nanoidModel().then((res) => {
		nanoid = res.nanoid;
	});
	// 新增分类
	router.post("/categories", async (req, res) => {
		await mysql().query(
			`insert into categories (id,name,higherLevelID,create_time) values ("${nanoid(
				8
			)}","${req.body.name}","${req.body.categoryLevelID}", NOW())`,
			(err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: "新增失败！",
						err
					});
				} else {
					res.send({
						code: 200,
						message: "新增成功！"
					});
				}
			}
		);
	});
	// 加载分类列表
	router.get("/categories", async (req, res) => {
		await mysql().query("SELECT * FROM categories LIMIT 10", (err, result) => {
			if (err) {
				res.send({
					code: 400,
					message: "查询失败",
					err
				});
			} else {
				res.send({
					code: 200,
					message: "查询成功！",
					body: result
				});
			}
		});
	});

	// 查询并修改分类
	router.get("/getCategoryById/:id", async (req, res) => {
		await mysql().query(
			`select * from categories where id = '${req.params.id}'`,
			(err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: "获取数据失败",
						err
					});
				} else {
					res.send({
						code: 200,
						message: "查询成功！",
						body: result
					});
				}
			}
		);
	});

	router.put("/updateCategoryById/:id", async (req, res) => {
		await mysql().query(
			`update categories set name='${req.body.name}', create_time=NOW() where id='${req.params.id}'`,
			(err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: "获取数据失败",
						err
					});
				} else {
					res.send({
						code: 200,
						message: "查询成功！",
						body: result
					});
				}
			}
		);
	});

	// 删除分类
	router.get("/deleteCategoryById/:id", async (req, res) => {
		await mysql().query(
			`delete from categories where id = '${req.params.id}'`,
			(err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: "删除数据失败",
						err
					});
				} else {
					res.send({
						code: 200,
						message: "删除数据成功"
					});
				}
			}
		);
	});

	// 一级分类列表
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
	app.use("/admin/api", router);
};
