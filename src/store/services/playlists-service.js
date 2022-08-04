import axios from 'axios';
import qs from 'qs';

function getPlaylists(params) {
		
	
	const playlistsAPI = `${process.env.VUE_APP_API_BASE_URL}/player/playlists/${params.limit}`;
	
	const options = {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { encode: false });
		},
	};
	// console.log( "options:", options);
	return axios.get(playlistsAPI, options).then((response) => {
		// console.log( 'response: ', response.data.playlists)
	
		
		return response.data.playlists
	});
	
	
}


export default {
	getPlaylists
};