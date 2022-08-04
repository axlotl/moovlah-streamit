<template>
<div>
	<BannerVideo :videoObj="videoObj" v-if="videoObj"/>
	<Detail :videoObj="videoObj" v-if="videoObj" />
	<MoreLike :playlistID="playlistID" v-if="playlistID"/>
	<!-- <Upcomming/> -->
</div>
</template>
<script>
import { core } from '@/config/pluginInit'
import Detail from '@/views/FrontendPages/MovieDetailPage/Detail'
// import Upcomming from '@/views/FrontendPages/MovieDetailPage/Upcomming'
import MoreLike from '@/views/FrontendPages/MovieDetailPage/MoreLike'
import BannerVideo from '@/views/FrontendPages/MovieDetailPage/BannerVideo'

import _ from 'lodash'
export default {
  name: 'MovieDetail',
  components: {
    Detail,
    // Upcomming,
    MoreLike,
	BannerVideo
  },
  props: [],
  
  mounted () {
	
	
	core.index()
  },
  created() {
	// console.log('route: ', this.$route)
	// console.log( 'this:', this);
	
	this.getVideoObjDebounced();
	this.playlistID = this.$route.query.playlistID
	
  	},
	 data: () => ({
		videoObj: null,
		playlistURL: null
	}),

  methods: {
	
	getVideoObjDebounced: _.debounce( function(){
		// console.log('getVideoObjDebounced');
		this.getVideoObj();
	}, 300),



	async getVideoObj(){
		// console.log('getVideoObj');
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
			// console.log( 'MovieDetail.vue video object: ', this.videoObj)
			

		} catch( e ){
			console.log( 'video error:', e)
		}
		
		
	}
  } 
}
</script>
