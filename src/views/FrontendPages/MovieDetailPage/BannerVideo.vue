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
	console.log('BannerVideo videoObject', this.videoObj  );
	
	this.videoURL = this.videoObj.sources.mp4._676p;
	console.log('videoURL:',this.videoURL)
  },
  methods: {
	
  },

  created() {
	
  },

  data: () => ( {
	
  })
}
</script>
