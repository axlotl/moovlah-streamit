import axios from 'axios';
import qs from 'qs';




function list(params) {
	const contentlistStart = window.performance.now();
	
	const url = (()=> {

		if( params.limit !== undefined ){
			return `${process.env.VUE_APP_API_BASE_URL}/player/${params.uuid}/playlist/${params.limit}`;	
		} else {
			return `${process.env.VUE_APP_API_BASE_URL}/player/${params.uuid}/playlist`;
		}
	})();
	
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};

	// console.log("CONTENTS URL: ", `${url}`);
	
	return axios.get(`${url}`, options).then((response) => {
		const contentlistEnd = window.performance.now();
		console.log(`content Execution time: ${contentlistEnd - contentlistStart} ms`);
		return response.data;
	});
}

function getSingle( params){
	const url = `${process.env.VUE_APP_API_BASE_URL}/player/${params.playlistID}/playlist/${videoID}`;
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};
	return axios.get(`${url}`, options).then((response) => {
		console.log("content response:: ", response.data);
	});
}

export default {
	list,
	getSingle
};
