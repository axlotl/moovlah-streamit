import axios from 'axios';

function getVideoObj(params) {
	console.log('in video service');
	console.log( 'params', params)

	// const videoUrl = `${process.env.VUE_APP_API_BASE_URL}/${this.$router.query.playlistID}/${this.$router.query.itemID}`;
	const videoAPI = `${params.baseURL}/player/${params.playlistID}/content/${params.videoID}`;

	console.log( 'getVideoObj api call: ', videoAPI)
	return axios.get(videoAPI).then((response) => {
		console.log( 'response: ', response)
		// const url = response.data.placement.content.sources.mp4._676p;
		// console.log( 'video url: ', url)
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