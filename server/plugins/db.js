module.exports = () => {
	const mysql = require("mysql");

	const connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "fyy542685",
		database: "node_vue_moba"
	});

	connection.connect();
	return connection;
};
