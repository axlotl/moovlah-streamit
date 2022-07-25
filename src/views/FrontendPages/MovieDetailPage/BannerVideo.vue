<template>
	<div class="video-container iq-main-slider">
	  <video class="video d-block" controls loop>
		 <!-- <source src="../../../assets/video/sample-video.mp4" type="video/mp4"> -->
		 <source  :src="videoURL" type="video/mp4">
	  </video>
   </div>
</template>
<script>

import { BIconChevronDoubleLeft } from 'bootstrap-vue';
import _ from 'lodash'
// 
export default {
  name: 'BannerVideo',
  
  props: ["baseURL, playlistID, itemID"],
  components: {
  },
  mounted () {
	// console.log('videoObject', this.$route  );
	
  },
  methods: {
	getVideoURLDebounced: _.debounce( function(){
		console.log('getVideoURLDebounced');
		this.getVideoURL();
	}, 300),



	async getVideoURL(){
		
	  let params = {
		

			/*
			baseURL: this.$router.params.baseURL,
			playlistID: this.$router.params.playlistID,
			videoID: this.$router.params.itemID
			*/
			baseURL: this.$route.query.baseURL,
			playlistID: this.$route.query.playlistID,
			videoID: this.$route.query.itemID

		
	  }
	  console.log('bannervideo params: ', params);
	  try {
		await this.$store.dispatch("video/getVideoURL", params)
		const url = this.$store.getters["video/getVideoURL"]
		
		this.videoURL = url;
	  	console.log('videoURL ')
		console.log( this.videoURL);
	  } catch( e ){
		console.log( 'video error:', e)
	  }
	  
	}
  },

  created() {
	this.getVideoURLDebounced();
  },

  data: () => ( {
	videoURL: null
  })
}
</script>
