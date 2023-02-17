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

	app.use("/admin/api/rest/:resource", router);


	function setFirstLevelArray(result) {
		return result.map((item, index) => {
			return {
				id: item.id,
				label: item.name
			};
		});
	}

  // 一级分类列表,这个接口特殊情况 暂不做通用接口
	app.get("/admin/api/getFirstCategory", async (req, res) => {
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

	// 上传图片接口 借用package multer
	const multer = require('multer');
	// __dirname为当前文件的绝对路径，这里设置为上传到哪个文件夹
	const upload = multer({dest: __dirname + '/../../uploads'});
	app.post("/admin/api/upload", upload.single('file'), async (req, res) => {
		req.file.url = `http://localhost:3000/uploads/${req.file.filename}`
		res.send(req.file);
	})
};
