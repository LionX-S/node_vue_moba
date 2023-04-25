const express = require("express");

const app = express();

// 解决跨域
app.use(require("cors")());
// 就可以直接使用req.body
app.use(express.json());
// 托管静态文件,以便web端可以通过http链接访问
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./routes/admin")(app);

app.listen(3000, () => {
	console.log("后台启动在3000端口");
});
