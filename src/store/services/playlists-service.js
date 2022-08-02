import axios from 'axios';
import qs from 'qs';

function getPlaylists(params) {
		
	// console.log( 'params', params)
	const playlistsAPI = `${process.env.VUE_APP_API_BASE_URL}/player/playlists/${params.limit}`;
	// console.log( 'getPlaylists api call: ', playlistsAPI)
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};
	// console.log( "options:", options);
	return axios.get(playlistsAPI, options).then((response) => {
		console.log( 'response: ', response.data.playlists)
	
		// return response.data.playlists.filter((el, index) => {
		// 	return index % 2 === 0;
		// });
		return response.data.playlists
	});
	
	
}


export default {
	getPlaylists
};