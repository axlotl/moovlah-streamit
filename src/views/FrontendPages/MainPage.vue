<template>
  <div>
	<Favorites v-if="this.playlist0 !== undefined" :uuid="playlist0"/>
    <!-- 
	<Favorites :playlist="playlist1"/>
	<Favorites :playlist="playlist2"/>
	<Favorites :playlist="playlist3"/>
	<Favorites :playlist="playlist4"/>
	<Favorites :playlist="playlist5"/>
	<Favorites :playlist="playlist6"/>
	<Favorites :playlist="playlist7"/>
	 -->
    <!--
	<UpComming/>
    <TopTen/>
    <Suggested/>
    <Detail/>
    <Trending/>
    <Thrillers/>
	-->
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import Favorites from './Components/Favorites/Favorite'
// import Detail from './Components/Details/Detail'
// import Suggested from './Components/Suggested/Suggestion'
// import TopTen from './Components/TopTen/Top'
// import Trending from './Components/Trending/Trending'
// import Thrillers from './Components/TvThrillers/Thrillers'
// import UpComming from './Components/UpcomingMovie/Upcomming'

import axios from 'axios'
export default {
  name: 'MainPage',

  props: [ "playlist0"],
  components: {
    Favorites,
    /*
	Detail,
    Suggested,
    TopTen,
    Trending,
    Thrillers,
    UpComming
	*/
  },
  data: () => ({
	playlists : []
  }),

  mounted () {
    core.index()
	console.log('MainPage.vue')
  },
  created(){
	this.getPlaylists()
  },
  methods: {
	async getPlaylists(){
		console.log('getPlaylists');
		const params = {
			
			limit: 5
		
		};
		try {
			await this.$store.dispatch("playlists/getPlaylists", params)
			const playlistsResponse = this.$store.getters["playlists/getPlaylists"]
			console.log('playlists: ',playlistsResponse);
			this.playlists = playlistsResponse;
			console.log(this.playlists)
			this.playlists.forEach((playlist, index) =>{
				console.log( 'index: ' + index + ' uuid: ' + playlist.uuid + ' name: ' + playlist.name);
			if( index === 0){
				playlist = playlist.uuid;
			}
			
		});
		} catch( e) {
			console.log( 'getPlaylists error: ', e);
		}
		
	},
  }
}
</script>
