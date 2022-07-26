import axios from 'axios';
import qs from 'qs';

// for (const [key, val] of Object.entries(process.env)) {
// 	console.log("key: " + key + " val: " + val);
// }
const url = `${process.env.VUE_APP_API_BASE_URL}/${process.env.VUE_APP_TEST_PLAYLIST2}/playlist`;
console.log("URL! ", `${url}`);


function list(params) {
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};

	console.log("CONTENTS URL (PLAYLIST2): ", `${url}`);
	
	return axios.get(`${url}`, options).then((response) => {
		// console.log("content response:: ", response.data);
		
		return response.data;
	});
}

export default {
	list,
};
