
module.exports = (app) => {
	const express = require("express");
	// 启用通用curd接口的api配置merge params，可以从url中req.params.resource获取到数据库table名称
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
	// 新增分类
	router.post("/", async (req, res) => {
		await mysql().query(
			`insert into ${req.params.resource} (id,name,higherLevelID,create_time) values ("${nanoid(
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
	router.get("/", async (req, res) => {
		await mysql().query(`SELECT * FROM ${req.params.resource} LIMIT 10`, (err, result) => {
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
		await mysql().query(
			`update ${req.params.resource} set name='${req.body.name}', create_time=NOW() where id='${req.params.id}'`,
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

	// 通用curd接口
	app.use("/admin/api/:resource", router);
};
