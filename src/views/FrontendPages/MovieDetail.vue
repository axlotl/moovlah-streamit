<template>
<div>
	<BannerVideo :videoObj="videoObj" v-if="videoObj !== undefined"/>
	<Details :videoObj="videoObj" />
	<MoreLike/>
	<Upcomming/>
</div>
</template>
<script>
import { core } from '@/config/pluginInit'
import Details from '@/views/FrontendPages/MovieDetailPage/Detail'
import Upcomming from '@/views/FrontendPages/MovieDetailPage/Upcomming'
import MoreLike from '@/views/FrontendPages/MovieDetailPage/MoreLike'
import BannerVideo from '@/views/FrontendPages/MovieDetailPage/BannerVideo'

import _ from 'lodash'
export default {
  name: 'MovieDetail',
  components: {
    Details,
    Upcomming,
    MoreLike,
	BannerVideo
  },
  props: ["videoObj"],
  
  mounted () {
	// console.log('Details', Details)
	// console.log('BannerVideo:',BannerVideo)
	
    // console.info(`MoviePageMovieDetail.vue route`, this.$route);
	// console.log( 'MoviePageMovieDetail.vue videoOb:', this.vidoObj)
	core.index()
  },
  created() {
	this.getVideoObjDebounced();
	// this.setVideoObj();
	
  },

  methods: {
	// setVideoObj(){
	// 	this.videoObj = videoObj;
	// },
	getVideoObjDebounced: _.debounce( function(){
		console.log('getVideoObjDebounced');
		this.getVideoObj();
	}, 300),



	async getVideoObj(){
		console.log('getVideoObj')
		let params = {
		
			baseURL: this.$route.query.baseURL,
			playlistID: this.$route.query.playlistID,
			videoID: this.$route.query.itemID
	
		};
		
		
		console.log('...MovieDetail.vue params:::: ', params);
		try {
			console.log('inside try')
			await this.$store.dispatch("video/getVideoObj", params)
			const videoObj = this.$store.getters["video/getVideoObj"]
		
			

			this.videoObj = videoObj; 
			console.log( 'MovieDetail.vue video object: ', this.videoObj)
			// const url = videoObj.sources.mp4._676p
			// this.videoURL = url;
			// this.videoTile = videoObj.title;
			// this.videoDescription = videoObj.description;
	  		// console.log('videoURL in MovieDetails.vue ');
			// console.log( this.videoURL);
			// console.log('videoObj in MovieDetails.vue:',this.videoObj);

		} catch( e ){
			console.log( 'video error:', e)
		}
		
		
	}
  },
  data: () => ({
    	
	})
}
</script>
