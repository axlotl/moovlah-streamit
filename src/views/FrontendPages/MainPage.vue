<template>

	<div>
		<Home id="home" v-if="this.$route.meta.slider === 'true' && ( this.playlists.length > 0)"  :playlists="homePlaylists"/>
		
			<component 
				v-for="(playlist, index) in playlists" 
				:key="index"
				:is="templateOption" 
				:item="playlist" />
				
		</div>
		
		<!--
	<UpComming/>
    <TopTen/>
    <Suggested/>
    <Detail/>
    <Trending/>
    <Thrillers/>
	-->
	
</template>
<script>
import { core } from '../../config/pluginInit'
const Home = () => import('@/views/FrontendPages/Components/Home/Home');
const Favorites = () => import('./Components/Favorites/Favorite');
const Foo = () => import('./Components/Suggested/Suggestion');
const Bar = () => import('./Components/TopTen/Top');

// import Detail from './Components/Details/Detail'
// import Suggested from './Components/Suggested/Suggestion'
// import TopTen from './Components/TopTen/Top'
// import Trending from './Components/Trending/Trending'
// import Thrillers from './Components/TvThrillers/Thrillers'
// import UpComming from './Components/UpcomingMovie/Upcomming'

import axios from 'axios'
export default {
	name: 'MainPage',

	props: [
		// "playlist",
		
		"viewtest"
	],
	components: {
		Home,
		Favorites,
		Foo,
		Bar
		/*
		Detail,
		Suggested,
		TopTen,
		Trending,
		Thrillers,
		UpComming
		*/
	},
	computed: {
		templateOption(){
			let min =  Math.ceil(0);
			let max = Math.floor(2)
			let randomKey = Math.floor(Math.random() * (max - min + 1 ) + min);
			let templates = [
				'foo','bar','favorites'
			];
			// console.log( 'random[' + randomKey +']' , templates[randomKey])
			switch (templates[randomKey]) {
				/*
				case 'foo':
					return Foo;
				case 'bar':
					return Bar;
				case 'favorites':
					return Favorites;
				*/
				default:
					return Favorites;
			}
		},
		bindOption() {
		// console.log('bindOption this.playlists: ', this.playlists);
			
				// console.log('bind subcomonent: ', this);
				// console.log('bind subcomponent: ');
				// console.log(playlist, index)
				// console.log('done')
				switch (this.subComponent) {
					case 'foo':
						return Foo;
					case 'bar':
						return Bar;
					default:
						return "afe53c7d-4700-4b02-a13d-8febca6fbb55"

				}
			
			
		},
		currentTab: {
			get() {

			},
			set() {

			}
		}
	},
	data: () => ({
		playlists: [],
		homePlaylists: [],
		playlist: null,
		subComponent: 'Favorites',
		foo: null,
		bar: null
	}),

	mounted() {
		core.index()
		console.log("viewtest: ", this.viewtest)
	},
	created() {
		this.getPlaylists()
	},
	methods: {
		async getPlaylists() {

			const params = {

				limit: 12

			};
			try {


				/*
				*	probably you shoud just get all the data in one chunk.
				*	(instead of a list of uuids)
				*	
				*	might take two requests.... (list of playlists, each playlist in detail)
				*
				*	see Favorite.vue
				*
				*	OR, better, get it all in one object and pass it on down to favorite
				*
				*	see commented try{} block below.
				*	do it here and pass it down the component chain.
				*
				*/

				await this.$store.dispatch("playlists/getPlaylists", params)
				const playlistsResponse = this.$store.getters["playlists/getPlaylists"]
				// console.log('playlists: ',playlistsResponse);


				playlistsResponse.forEach((playlist, index) => {
					// console.log('index: ' + index + ' uuid: ' + playlist.uuid + ' name: ' + playlist.name);

					

					// stripped down, let's populate it
					this.playlists.push(playlist);
					this.populatePlaylists(playlist)
					
					
					
				});

				console.log('MainPage playlists', this.playlists)
			} catch (e) {
				console.log('getPlaylists error: ', e);
			}


		},
		async populatePlaylists(playlist){
			let params = {
				include: (this.sort ? { sort: this.sort }: {}),
				filter: (this.query ? { title: this.query } : {}),
				page: {
				},
				uuid: playlist.uuid
				// uuid: this.item.uuid 
				//uuid: "afe53c7d-4700-4b02-a13d-8febca6fbb55"
			}
			try {
				await this.$store.dispatch("content/list", params);
				const table = this.$store.getters["content/list"];
				this.playlistID = table.placement.id;
				//this has hundreds of items.
				table.placement.playlist.slice(0, 10).forEach( (object) => {
					object.playlistID = this.playlistID;
					object.baseURL = process.env.VUE_APP_API_BASE_URL;
					object.uuid = playlist.uuid;
					this.homePlaylists.push( object );
				}); 
				console.log('MainPage.vue playlists: ', this.homePlaylists)
			} catch(e){
				console.log('error');
				console.log(e);
			}
		}
	}
}
</script>
