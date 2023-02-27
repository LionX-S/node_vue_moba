module.exports = (app) => {
	const express = require("express");
	const jwt = require("jsonwebtoken");
	const assert = require("http-assert");
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
	const { createInsertSQL, createUpdateSQL } = require("../../utils/sqlUtils");

	// 新增表数据
	router.post("/", async (req, res) => {
		await mysql().query(createInsertSQL(req), (err, result) => {
			if (err) {
				res.status(500).send({
					message: "新增失败！"
				});
			} else {
				res.status(200).send({
					message: "新增成功！"
				});
			}
		});
	});
	// 加载表数据
	router.get("/", async (req, res) => {
		// 加载分类列表有连表操作 走单独sql
		let selectSQL = "";
		if (req.params.resource === "categories") {
			selectSQL = `SELECT a.id,a.name,a.create_time,b.name as parentsName from categories a left JOIN categories b ON a.higherLevelID = b.id;`;
		} else if (
			req.params.resource === "heroes" ||
			req.params.resource === "articles" ||
			req.params.resource === "advertise"
		) {
			selectSQL = `select a.*,b.name as category from ${req.params.resource} a left join categories b on a.category = b.id`;
		} else {
			selectSQL = `SELECT * FROM ${req.params.resource} LIMIT 10`;
		}
		await mysql().query(selectSQL, (err, result) => {
			if (err) {
				res.status(500).send({
					message: "查询失败!"
				});
			} else {
				res.status(200).send({
					message: "查询成功",
					body: result
				});
			}
		});
	});

	// 根据id查询并修改标数据
	router.get("/:id", async (req, res) => {
		let sql = `select * from ${req.params.resource} where id = '${req.params.id}'`;
		if (req.params.resource === "users") {
			sql = `select id,username,avatarUrl,create_time from ${req.params.resource} where id='${req.params.id}'`;
		}
		await mysql().query(sql, (err, result) => {
			if (err) {
				res.send.status(500).send({
					message: "获取数据失败"
				});
			} else {
				res.status(200).send({
					body: result
				});
			}
		});
	});

	router.put("/:id", async (req, res) => {
		await mysql().query(createUpdateSQL(req), (err, result) => {
			if (err) {
				res.send.status(500).send({
					message: "获取数据失败"
				});
			} else {
				res.status(200).send({
					message: "查询成功!",
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
					res.send.status(500).send({
						message: "删除数据失败"
					});
				} else {
					res.status(200).send({
						message: "删除数据成功"
					});
				}
			}
		);
	});

	// auth鉴权中间件
	const authMiddleware = async (req, res, next) => {
		const token = String(req.headers.authorization || "")
			.split(" ")
			.pop();
		assert(token, 401, "请先登录");
		const { id } = jwt.verify(token, app.get("secret"));
		assert(id, 401, "请先登录");
		await mysql().query(
			`select id from users where id='${id}'`,
			(err, result) => {
				const userID = result[0].id;
				assert(userID, 401, "请先登录");
			}
		);
		await next();
	};

	app.use("/admin/api/rest/:resource", authMiddleware, router);

	// 包装一级类返回数据
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
					res.send.status(500).send({
						message: "获取分类数据失败"
					});
				} else {
					res.status(200).send({
						body: {
							label: "一级分类",
							options: setFirstLevelArray(result)
						}
					});
				}
			}
		);
	});

	// 根据一级分类名称获取子分类
	app.get("/admin/api/getChildCategory/:firstCategory", async (req, res) => {
		await mysql().query(
			`select * from categories where higherLevelID = (SELECT id FROM categories where name = '${req.params.firstCategory}')`,
			(err, result) => {
				if (err) {
					res.send.status(500).send({
						message: "获取分类数据失败"
					});
				} else {
					res.status(200).send({
						body: result
					});
				}
			}
		);
	});

	// 删除上传的图片
	app.delete("/admin/api/deleteImage/uploads/:imageID", (req, res) => {
		const fs = require("fs");
		fs.unlink(__dirname + `/../../uploads/${req.params.imageID}`, (err) => {
			if (err) {
				res.send(err);
				return false;
			}
		});
	});

	// 上传图片接口 借用package multer
	const multer = require("multer");
	// __dirname为当前文件的绝对路径，这里设置为上传到哪个文件夹
	const upload = multer({ dest: __dirname + "/../../uploads" });
	app.post("/admin/api/upload", authMiddleware, upload.single("file"), async (req, res) => {
		req.file.url = `http://localhost:3000/uploads/${req.file.filename}`;
		res.send(req.file);
	});

	// 创建token会用到
	app.set("secret", "node_vue_moba");
	// 登录接口
	app.post("/admin/api/login", async (req, res) => {
		const { username, password } = req.body;
		await mysql().query(
			`select * from users where username='${username}'`,
			(err, result) => {
				if (!result.length) {
					return res.status(422).send({
						message: "用户不存在!"
					});
				}
				const {id, username, avatarUrl} = result[0];
				// 验证密码
				const isValid = require("bcrypt").compareSync(
					password,
					result[0].password
				);
				if (!isValid) {
					return res.status(422).send({
						message: "密码错误"
					});
				}

				// 返回token
				const token = jwt.sign({ id }, app.get("secret"));
				res.send({
					token,
					username,
					avatarUrl
				});
			}
		);
	});

	// 后台错误捕获（统一处理）
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message
		});
	});
};
