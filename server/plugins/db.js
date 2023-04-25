module.exports = () => {
	const mysql = require("mysql");

	const connection = mysql.createConnection({
		// 此处改为自己mysql数据库的用户和密码
		host: "localhost",
		user: "root",
		password: "fyy542685",
		database: "node_vue_moba"
	});

	connection.connect();
	return connection;
};
