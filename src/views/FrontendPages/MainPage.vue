<template>

	<div>
		<!-- <div class="playlist-container" v-for="(playlist,index) in playlists" :key="index">
			<Favorites v-if="playlist.uuid !== undefined" :uuid="playlist.uuid"/>
		</div> -->
		<!-- <div v-for="(playlist, index) in playlists">
		<p>item: {{playlist}}</p>
		<p>index: {{this.playlists['index']}}</p> -->
			<!-- <component :is="templateOption" :item="bindOptions" :playlist="playlist" :index="index"/> -->
			<component 
				v-for="(playlist, index) in playlists" 
				
				:is="templateOption" 
				:item="playlist" />
		</div>
		
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
	
</template>
<script>
import { core } from '../../config/pluginInit'
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
		// "playlists"
	],
	components: {
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
			console.log( 'random[' + randomKey +']' , templates[randomKey])
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
		playlist: null,
		subComponent: 'Favorites',
		foo: null,
		bar: null
	}),

	mounted() {
		core.index()
		console.log('Favorites:')
		console.log(Favorites)
	},
	created() {
		this.getPlaylists()
	},
	methods: {
		async getPlaylists() {

			const params = {

				limit: 8

			};
			try {
				await this.$store.dispatch("playlists/getPlaylists", params)
				const playlistsResponse = this.$store.getters["playlists/getPlaylists"]
				// console.log('playlists: ',playlistsResponse);


				playlistsResponse.forEach((playlist, index) => {
					console.log('index: ' + index + ' uuid: ' + playlist.uuid + ' name: ' + playlist.name);

					// console.log( 'pushing playlist: ', playlist)
					this.playlists.push(playlist);

					
				});

				console.log('MainPage playlists', this.playlists)
			} catch (e) {
				console.log('getPlaylists error: ', e);
			}


		},
		playlistToProp(){

		}
	}
}
</script>
