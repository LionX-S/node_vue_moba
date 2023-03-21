module.exports = (app) => {
  const express = require('express');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true
  });

  const mysql = require('../../plugins/db');

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
  router.get("/",async (req,res) => {
    await mysql().query(`select * from ${req.params.resource}`, (err, result) => {
      if(err) {

      } else {
        res.status(200).send({
          data:result
        })
      }
    })
  });

  app.use("/web/api/rest/:resource", router);
}