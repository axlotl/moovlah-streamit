<template>
	<div class="video-container iq-main-slider">
	  <video class="video d-block" controls loop>
		 <!-- <source src="../../../assets/video/sample-video.mp4" type="video/mp4"> -->
		 <source v-if="videoURL !== null"  :src="videoURL" type="video/mp4">
	  </video>
   </div>
</template>
<script>

import { BIconChevronDoubleLeft } from 'bootstrap-vue';

// 
export default {
  name: 'BannerVideo',
  
  props: ["videoObj", "videoURL"],
  components: {
  },
  mounted () {
	// console.log('BannerVideo videoObject', this.videoObj  );
	

	this.getURL()
	console.log('BannerVideo.vue videoURL:' ,this.videoURL)

  },
  methods: {
	
	async getURL(){
		console.log( 'getURL')
		
		// this.videoURL = this.videoObj.sources.mp4._676p
		
		try {
			await this.$store.dispatch("video/mp4URL", this.videoObj.sources.mp4)
			const mp4URL =  this.$store.getters["video/mp4URL"]
			// console.log( 'mp4URL: ', mp4URL)
			this.videoURL = mp4URL;
		
		} catch( e ){
			console.log( 'mp4URL error: ', e)
		}
	}
	
  },

  created() {
	
  },

  data: () => ( {
	
  })
}
</script>
