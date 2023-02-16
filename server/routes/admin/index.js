module.exports = (app) => {
	const express = require("express");
	// 启用通用curd接口的api配置merge params，可以从url中req.params.resource获取到数据库table名称
	// 当然 前端请求URL要满足格式
	const router = express.Router({
		mergeParams: true
	});
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

	// 引入生成特殊sql方法
	const { createInsertSQL } = require("../../utils/sqlUtils");

	// 新增表数据
	router.post("/", async (req, res) => {
		await mysql().query(createInsertSQL(req), (err, result) => {
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
		});
	});
	// 加载表数据
	router.get("/", async (req, res) => {
		await mysql().query(
			`SELECT * FROM ${req.params.resource} LIMIT 10`,
			(err, result) => {
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
			}
		);
	});

	// 根据id查询并修改标数据
	router.get("/:id", async (req, res) => {
		await mysql().query(
			`select * from ${req.params.resource} where id = '${req.params.id}'`,
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

	router.put("/:id", async (req, res) => {
		const { createUpdateSQL } = require("../../utils/sqlUtils");
		await mysql().query(createUpdateSQL(req), (err, result) => {
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
		});
	});

	// 删除表数据
	router.delete("/:id", async (req, res) => {
		await mysql().query(
			`delete from ${req.params.resource} where id = '${req.params.id}'`,
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

	app.use("/admin/api/:resource", router);
};
