<template>

	<div>
		<Home id="home" v-if="this.$route.meta.slider === 'true' && ( this.playlists.length > 0)"  :playlist="homePlaylist"/>
		
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
import { async } from '@firebase/util';
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
		playlistsArray: [],
		// playlistsObject,
		homePlaylist: [],
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
					
					
					
					
				});

				console.log('MainPage playlists', this.playlists)
				this.populatePlaylists()
			} catch (e) {
				console.log('getPlaylists error: ', e);
			}


		},
		async populatePlaylists(){
			console.log('populate', this.playlists)
			//for(const {playlistIndex, playlist} of this.playlists){
				// console.log( 'for loop ' + playlistIndex + ' ', playlist)
			//}
			//this.playlists.forEach((playlist, playlistIndex) => {

			await Promise.all( this.playlists.map( async (playlist, playlistIndex) =>{
				// console.log( 'outer map  ', playlist);
				// console.log( 'playlistIndex: ', playlistIndex)
				try {
						const params = {
							uuid: playlist.uuid
						}
						await this.$store.dispatch("content/list", params);
						const table = this.$store.getters["content/list"];
						this.playlistID = table.placement.id;
						//this has hundreds of items.
						//table.placement.playlist.slice(0, 10).forEach( (object, index) => {
						// console.log( 'table.placement.playlist ', table.placement.playlist)
						
						
						
						/* for( const [index, object] of table.placement.playlist ){
							console.log( 'inside for loop: [' + index +']', object)
						
							object.playlistID = object.id;
							object.baseURL = process.env.VUE_APP_API_BASE_URL;
							object.uuid = playlist.uuid;
							this.playlistsArray[index].push( object );
							// this.homePlaylist.push( object );
						} */
						
						await Promise.all( table.placement.playlist.map(async (object, index) => {
							
							
							object.playlistID = table.placement.id;
							object.baseURL = process.env.VUE_APP_API_BASE_URL;
							object.uuid = object.id;
							console.log( 'inner map : [' + playlistIndex + '] [' + index +']', object)
							// debugger;

							// console.log('isArray? ');
							// console.log(typeof(this.playlistsArray))
							// console.log(!Array.isArray(this.playlistsArray[playlistIndex]))
							if( !Array.isArray(this.playlistsArray[playlistIndex])){
								this.playlistsArray[playlistIndex] = [];
							}
							if( !Array.isArray(this.playlistsArray[playlistIndex][index])){
								this.playlistsArray[playlistIndex][index] = [];
							}
							
							// console.log( 'this.playlistsArray inside map: ', this.playlistsArray);	
								
							
							this.playlistsArray[playlistIndex][index].push( object );
						}));
						console.log( 'this.playlistsArray: ', this.playlistsArray);
						
					} catch(e){
						console.log('error');
						console.log(e);
					}
			}));
				
				/*
				async (playlist, playlistIndex) => {
					console.log( 'anonymous async')
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
							this.playlistsArray[playlistIndex].push( object );
							// this.homePlaylist.push( object );
						}); 
						
					} catch(e){
						console.log('error');
						console.log(e);
					}
					console.log('MainPage.vue playlistsArray: ', this.playlistsArray)
				}
				
				
			}
			*/
		},
		async populateSinglePlaylist(playlist){
			
		}
	}
}
</script>
