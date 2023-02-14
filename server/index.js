const express = require("express");

const app = express();

// 解决跨域
app.use(require("cors")());
// 就可以直接使用req.body
app.use(express.json());

require("./routes/admin")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
	console.log("后台启动在3000端口");
});
