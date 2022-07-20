import qs from "qs";
import axios from "axios";
import Jsona from "jsona";

for (const [key, val] of Object.entries(process.env)) {
	console.log("key: " + key + " val: " + val);
}
const url = `${process.env.VUE_APP_API_BASE_URL}/${process.env.VUE_APP_TEST_PLAYLIST1}/playlist`;
console.log("URL! ", `${url}`);
const jsona = new Jsona();

function list(params) {
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};

	console.log("SUGGESTION URL (PLAYLIST1): ", `${url}`);
	// console.log("options:");
	// console.log(options);
	return axios.get(`${url}`, options).then((response) => {
		// console.log("suggestion response:: ", response.data);
		
		return response.data;
	});
}

export default {
	list,
};
