<template>
<section id="iq-favorites">
   <b-container fluid>
      <b-row>
         <b-col sm="12" class="overflow-hidden">
            <div class="iq-main-header d-flex align-items-center justify-content-between">
               <h4 class="main-title">
                 {{item.name}}
               </h4>
               <router-link :to="{ name: 'landing-page.movie-category' }" class="iq-view-all">View All</router-link>
            </div>
            <div class="upcoming-contents">
               <Slick v-if="table && table.length > 0" class="favorites-slider list-inline row p-0 mb-0 iq-rtl-direction" ref="dSlick" :option="favOption">
					
				  		<VideoSwiper v-if="table.length > 0" class="slide-item" v-for="(item,index) in table" :key="index" :item="item" />
                  
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
	props: ['item'],
	
	
	data: () => ({
		// item: { 'title': 'here is a title'},
		table: [],
		query: null,
		sort: "created_at",
		permissions: [],
		playlistID: '',
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
		query: {
			handler: "getListDebounced",
			immediate: true
		}
	},
	created() {
		console.log('created');
		// this.permissions =  this.$store.getters["profile/permissions"];
		console.log( 'uuid:' , this.item.uuid)
		console.log('Favorites.vue item: ', this.item)

		
		

		/*
		this.$store.watch(
			
			() => this.$store.getters["profile/permissions"],
			(permissions) => {
			this.permissions = permissions;
			console.log('permissions');
			
		});
		*/
		this.getList()
		
	},
	methods: {

		getListDebounced: _.debounce( function(){
			console.log('getListDebounced this.item.uuid:: ', this.item.uuid);
			this.getList();
		}, 300),

		async getList(){
			console.log('getList', this.item.uuid)
			
			
			let params = {
				include: (this.sort ? { sort: this.sort }: {}),
				filter: (this.query ? { title: this.query } : {}),
				page: {
				},
				uuid: this.item.uuid 
				//uuid: "afe53c7d-4700-4b02-a13d-8febca6fbb55"
			}
			console.log('params in Favorite.vue:',params)
			try {
				await this.$store.dispatch("content/list", params);
				const table = this.$store.getters["content/list"];
				this.playlistID = table.placement.id;
				//this has hundreds of items.
				table.placement.playlist.slice(0, 10).forEach( (object) => {
					object.playlistID = this.playlistID;
					object.baseURL = process.env.VUE_APP_API_BASE_URL;
					
					this.table.push( object );
				}); 
				console.log('Favorite.vue table: ', this.table)
			} catch(e){
				console.log('error');
				console.log(e);
			}
			
		},
		
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
