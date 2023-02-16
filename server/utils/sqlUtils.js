// 根据不同功能生成不同sql语句的功能util
// 新版nanoid不支持commonJS
let nanoid;
const nanoidModel = async () => {
	const model = await import("nanoid");
	return model;
};
nanoidModel().then((res) => {
	nanoid = res.nanoid;
});
module.exports = {
	createInsertSQL(req) {
		let values = "";
		let bodyArr = Object.entries(req.body);
		let keyArr = bodyArr.map((item, index) => {
			return item[0];
		});
		let valuesArr = bodyArr.map((item) => {
			if (item[0] === "password") {
				return bcryptjs.hashSync(item[1], 10);
			}
			return item[1];
		});
		valuesArr.forEach((i) => {
			values += `'${i}',`;
		});
		values = values.slice(0, values.length - 1);
		let insertSQL = `insert into ${
			req.params.resource
		} (id,create_time,${keyArr.toString()}) values ("${nanoid(
			8
		)}",NOW(),${values})`;
		return insertSQL;
	},
	createUpdateSQL(req) {
		let values = "";
		// delete req.body.id;
		let bodyArr = Object.entries(req.body);
		let keyArr = bodyArr.map((item, index) => {
			return item[0];
		});
		let valuesArr = bodyArr.map((item) => {
			if (item[0] === "password") {
				return bcryptjs.hashSync(item[1], 10);
			}
			return item[1];
		});
		valuesArr.forEach((i, index) => {
			values += `${keyArr[index]}='${valuesArr[index]}',`;
		});
		values = values.slice(0, values.length - 1);
		let updateSQL = `update ${req.params.resource} set ${values} where id='${req.params.id}'`;
		return updateSQL;
	}
};
