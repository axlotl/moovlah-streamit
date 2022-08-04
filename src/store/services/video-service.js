import axios from 'axios';

function getVideoObj(params) {
	
	const videoAPI = `${params.baseURL}/player/${params.playlistID}/content/${params.videoID}`;

	// console.log( 'getVideoObj api call: ', videoAPI)
	return axios.get(videoAPI).then((response) => {
		// console.log( 'response: ', response)
		
		return response.data.placement.content;
	});
	
	
}

function mp4URL(obj){
	

	//get the largest mp4 based on Object.entries names
	let keyed = {};
	let keyedArray = [];
	for (const [k, v] of Object.entries(obj)){ 
		let key = parseInt( k.substring(1));
		keyed[key] = v;
		console.log( k + ' :: ' + v);
		keyedArray.push(key);
	}
	const max = Math.max(...keyedArray);
	return keyed[max];

}

export default {
	getVideoObj,
	mp4URL
};