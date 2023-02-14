module.exports = (app) => {
	const express = require("express");
	const router = express.Router();
	const mysql = require("../../plugins/db");

	// 新增分类
	router.post("/categories", async (req, res) => {
		await mysql().query(
			`insert into categories (name,create_time) values ("${req.body.name}", NOW())`,
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
			`select * from categories where id = ${req.params.id}`,
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
			`update categories set name='${req.body.name}', create_time=NOW() where id=${req.params.id}`,
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
	app.use("/admin/api", router);
};
