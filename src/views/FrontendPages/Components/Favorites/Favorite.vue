<template>
<section id="iq-favorites">
   <b-container fluid>
      <b-row>
         <b-col sm="12" class="overflow-hidden">
            <div class="iq-main-header d-flex align-items-center justify-content-between">
               <h4 class="main-title">
                 {{playlistObject.playlist.title}}
               </h4>
               <router-link :to="{ name: 'landing-page.movie-category' }" class="iq-view-all">View All</router-link>
            </div>
            <div class="upcoming-contents">
               <Slick v-if="playlistObject.playlist && playlistObject.playlist.length > 0" class="favorites-slider list-inline row p-0 mb-0 iq-rtl-direction" ref="dSlick" :option="favOption">
					
				  		<VideoSwiper v-if="playlistObject.playlist.length > 0" class="slide-item" v-for="(item,index) in playlistObject.playlist" :key="index" :item="item" />
                  
               </Slick>
            </div>
         </b-col>
      </b-row>
   </b-container>
</section>
</template>
<script>

import _ from 'lodash';
import VideoSwiper from '@/components/core/slider/VideoSwiper';
// console.log(VideoSwiper)

export default {
	name: 'Favorites',
	components: {
		VideoSwiper
	},
	props: ['playlistObject', "item"],
	
	
	data: () => ({
		
		table: [],
		query: null,
		sort: "created_at",
		permissions: [],
		
		favOption: {
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			autoplay: false,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="fa fa-chevron-left"></i></div>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="fa fa-chevron-right"></i></div>',
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		}
	}),
	mounted () {
		console.log('favorites mounted');
		
		
		
	},
	watch: {
		/* query: {
			handler: "getListDebounced",
			immediate: true
		} */
	},
	created() {
		
		// console.log('favorites playlist:')
		// console.log(this.playlistObject)
		/*
		this.$store.watch(
			
			() => this.$store.getters["profile/permissions"],
			(permissions) => {
			this.permissions = permissions;
			console.log('permissions');
			
		});
		*/
		// this.getList()
		
	},
	methods: {

		next () {
		this.$refs.dSlick.next()
		},
		prev () {
			this.$refs.dSlick.prev()
		},
		async list() {

		}
		
	}	
}
</script>
