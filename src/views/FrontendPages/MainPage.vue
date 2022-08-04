<template>

	<div>

		<Home id="home" v-if="this.$route.meta.slider === 'true' && homePlaylist.length > 0"  :playlist="homePlaylist"/>
		
			<!-- <component 
				v-for="(single, index) in this.playlistsObject" 
				:key="index"
				:is="templateOption" 
				:playlistObject="single"/> -->

			<Favorite 
				v-for="(single, index) in playlistsObject" 
				:playlistObject="single"
			/>

				
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
import { core } from '@/config/pluginInit'
const Home = () => import('@/views/FrontendPages/Components/Home/Home');
const  Favorite = () => import('@/views/FrontendPages/Components/Favorites/Favorite');
const Foo = () => import('@/views/FrontendPages/Components/Suggested/Suggestion');
const Bar = () => import('@/views/FrontendPages/Components/TopTen/Top');

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
		
	],
	components: {
		Home,
		Favorite,
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
		playlistsObject: {},
		homePlaylist: [],
		
		subComponent: 'Favorites',
		foo: null,
		bar: null
	}),

	mounted() {
		core.index()
	},
	created() {
		this.getPlaylists()
	},
	methods: {
		async getPlaylists() {

			const params = {

				limit: 6

			};
			try {


				await this.$store.dispatch("playlists/getPlaylists", params)
				const playlistsResponse = this.$store.getters["playlists/getPlaylists"]
				// console.log('playlists: ',playlistsResponse);


				playlistsResponse.forEach((playlist, index) => {

					// stripped down, let's populate it
					this.playlists.push(playlist);
										
					
				});

				// console.log('MainPage playlists', this.playlists);
				this.populatePlaylists();
				
				
			} catch (e) {
				console.log('getPlaylists error: ', e);
			}
			// console.log( 'this.playlistsObject: ', this.playlistsObject);

		},

		async populatePlaylists(){
			
			const outerStart = window.performance.now();
			
			await Promise.all( this.playlists.map( async (playlist, playlistIndex) =>{
				// console.log( 'outer map  ', playlist);
				
				try {
						const params = {
							uuid: playlist.uuid, 
							limit: 10
						}
						await this.$store.dispatch("content/list", params);
						const table = this.$store.getters["content/list"];
						this.playlistID = table.placement.id;
						
						
						
						const innerStart = window.performance.now();
 

						// this.playlistsObject[table.placement.id] = [];
						// this.playlistsObject[table.placement.id].playlistID = playlistIndex;
						this.playlistsObject[playlistIndex] = {};
						this.playlistsObject[playlistIndex].playlistID = this.playlistID;
						this.playlistsObject[playlistIndex].playlist = []

						

						await Promise.all( table.placement.playlist.map(async (object, index) => {
							
							
							object.playlistID = table.placement.id;
							object.baseURL = process.env.VUE_APP_API_BASE_URL;
							object.uuid = object.id;
							// console.log( 'playlistIndex: ', playlistIndex)
							// console.log( 'index: ', index)
							

							if( !this.playlistsObject[playlistIndex]){
								this.playlistsObject[playlistIndex] = {'playlist' : []};
							}
							

							this.playlistsObject[playlistIndex].playlist.push( object );
							 
							
						}));

						const innerEnd = window.performance.now();
						// console.log(`Inner Execution time: ${innerEnd - innerStart} ms`);
						
						
					} catch(e){
						console.log('error');
						console.log(e);
					}
			}));
			
			const outerEnd = window.performance.now();
			// console.log(`Outer Execution time: ${outerEnd - outerStart} ms`);
			
			
			// console.log( 'this.playlistsObject: ', this.playlistsObject);
			this.homePlaylist = this.playlistsObject['0'].playlist;
			
			// console.log('this.homePlaylist', this.homePlaylist)
			return;
		},

		async populateSinglePlaylist(playlist){
			
		}
	}
}
</script>
