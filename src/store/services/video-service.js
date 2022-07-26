import axios from 'axios';

function getVideoObj(params) {
	console.log('in video service');
	// console.log( 'params', params)

	// const videoUrl = `${process.env.VUE_APP_API_BASE_URL}/${this.$router.query.playlistID}/${this.$router.query.itemID}`;
	const videoAPI = `${params.baseURL}/${params.playlistID}/content/${params.videoID}`;

	console.log( 'api call: ', videoAPI)
	return axios.get(videoAPI).then((response) => {
		// console.log( 'response: ', response)
		const url = response.data.placement.content.sources.mp4._676p;
		// console.log( 'video url: ', url)
		return response.data.placement.content;
	});
	
	
}

function mp4URL(params){
	const videoAPI = `${params.baseURL}/${params.playlistID}/content/${params.videoID}`;

}

export default {
	getVideoObj,
	mp4URL
};