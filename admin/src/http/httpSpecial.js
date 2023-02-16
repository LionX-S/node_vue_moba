import axios from "axios";

const httpSpecial = axios.create({
	baseURL: "http://localhost:3000/admin/specialApi"
});

export default httpSpecial;
