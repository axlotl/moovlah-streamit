import axios from 'axios';
import qs from 'qs';




function list(params) {
	// console.log('params in content-service:',params)
	const url = `${process.env.VUE_APP_API_BASE_URL}/player/${params.uuid}/playlist`;
	// const url = `${process.env.VUE_APP_API_BASE_URL}/player/85bca5b2-f637-430f-be4a-74118e33c82b/playlist`;
	console.log("content URL ", `${url}`);
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};

	// console.log("CONTENTS URL: ", `${url}`);
	
	return axios.get(`${url}`, options).then((response) => {
		// console.log("content response:: ", response.data);
		
		return response.data;
	});
}

export default {
	list,
};
