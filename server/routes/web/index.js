module.exports = (app) => {
	const express = require("express");
	// const jwt = require("jsonwebtoken");
	// const assert = require("http-assert");
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

	// 获取数据
	router.get("/", async (req, res) => {
		await mysql().query(
			`select * from ${req.params.resource}`,
			(err, result) => {
				if (err) {
				} else {
					res.status(200).send({
						data: result
					});
				}
			}
		);
	});
	// 根据id获取数据
	router.get("/:id", async (req, res) => {
		let sql = `select * from ${req.params.resource} where id = '${req.params.id}'`;
		await mysql().query(sql, (err, result) => {
			if (err) {
				res.send.status(500).send({
					message: "获取数据失败"
				});
			} else {
				res.status(200).send({
					data: result
				});
			}
		});
	});

	router.put("/thumb_view", async (req, res) => {
		await mysql().query(
			`update ${req.params.resource} set thumbUp=${req.body.thumbUp}, pageView=${req.body.pageView} where id='${req.body.id}'`,
			(err, result) => {
        if(err) {
          res.status(400).send({
            err
          })
        }else{
          res.status(200).send({
            message:'success'
          })
        }
      }
		);
	});

	app.use("/web/api/rest/:resource", router);
};
