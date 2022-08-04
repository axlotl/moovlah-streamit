<template>
<section id="iq-favorites" class="s-margin iq-rtl-direction">
   <b-container fluid>
	  <b-row>
		 <b-col sm="12" class="overflow-hidden">
			<div class="iq-main-header d-flex align-items-center justify-content-between">
			   <h4 class="main-title">
			   <router-link :to="{ name: 'landing-page.show-category' }" >More Like This</router-link>
			   </h4>
				<div class="d-flex slick-arrow-block">
					<button
					  class="slick-prev slick-arrow"
					  aria-label="Previous"
					  type="button"
					  style="display: block;"
					  @click="prev()"
					>
					</button>
					<button
					  class="slick-next slick-arrow"
					  aria-label="Next"
					  type="button"
					  style="display: block;"
					  @click="next()"
					>
					</button>
			   </div>
			</div>
			<div class="upcoming-contens">
				<Slick v-if="favoriteData" class="favorites-slider list-inline row p-0 mb-0 iq-rtl-direction" ref="dSlick" :option="favOption">
					
				  		<VideoSwiper v-if="favoriteData.length > 0" class="slide-item" v-for="(item,index) in favoriteData" :key="index" :item="item" />
				  
			   </Slick>
			   <!-- <Slick class="favorites-slider list-inline row p-0 mb-0" ref="dSlick" :option="favOption">
				  <li class="slide-item"  v-if="favoriteData" v-for="(item,index) in favoriteData" :key="index">
					 <router-link :to="{ name: 'landing-page.movie-detail' }">
						<div class="block-images position-relative">
						   <div class="img-box">
							  <img :src="item.image" class="img-fluid" alt="">
						   </div>
						   <div class="block-description">
							  <h6>{{item.title}}</h6>
							  <div class="movie-time d-flex align-items-center my-2 iq-ltr-direction">
								 <div class="badge badge-secondary p-1 mr-2">{{item.releasedate}}</div>
								 <span class="text-white">item.time</span>
							  </div>
							  <div class="hover-buttons">
								 <span class="btn btn-hover"><i class="fa fa-play mr-1" aria-hidden="true"></i>
								 Play Now
								 </span>
							  </div>
						   </div>
						   <div class="block-social-info">
							  <ul class="list-inline p-0 m-0 music-play-lists">
								 <li><span><i class="ri-volume-mute-fill"></i></span></li>
								 <li><span><i class="ri-heart-fill"></i></span></li>
								 <li><span><i class="ri-add-line"></i></span></li>
							  </ul>
						   </div>
						</div>
					 </router-link>
				  </li>
			   </Slick> -->
			</div>
		 </b-col>
	  </b-row>
   </b-container>
</section>
</template>
<script>
import _ from 'lodash';
import VideoSwiper from '@/components/core/slider/VideoSwiper';
export default {
  name: 'MoreLike',
  components: {
		VideoSwiper
	},
  mounted () {
  },
  created() {
	this.getListDebounced()
  },
  props: ["playlistID"],
  data: () => ({
	favoriteData: [],
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

  methods: {
	getListDebounced: _.debounce( function(){
		// console.log('getListDebounced this.item.uuid:: ', this.item.uuid);
		this.getList();
	}, 300),
	async getList(){
		
		
		
		let params = {
			
			uuid: this.playlistID
			
		}
		// console.log('params in Favorite.vue:',params)
		try {
			await this.$store.dispatch("content/list", params);
			const table = this.$store.getters["content/list"];
		
			//this has hundreds of items.
			table.placement.playlist.slice(0, 10).forEach( (object) => {
				object.playlistID = this.playlistID;
				object.baseURL = process.env.VUE_APP_API_BASE_URL;
				
				this.favoriteData.push( object );
			}); 
			console.log('MoreLike .vue favoriteData: ', this.favoriteData)
		} catch(e){
			console.log('error');
			console.log(e);
		}
		
	},
	next () {
	  this.$refs.dSlick.next();
	},
	prev () {
	  this.$refs.dSlick.prev();
	}
  }
}
</script>
