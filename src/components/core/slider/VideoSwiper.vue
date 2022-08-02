<!-- START COMPONENT -->
<template>
	<li>
		<div class="block-images position-relative">
			<div class="img-box">
				<img :src="item.poster" class="img-fluid" alt="">
			</div>
			<div class="block-description">
				<h6 class="iq-title">
					<router-link :to="{ 
						name: 'landing-page.movie-detail', 
						movie: {itemID: item.id,playlistID: item.playlistID,baseURL: item.baseURL
	
						},
						meta: {itemID: item.id,playlistID: item.playlistID,baseURL: item.baseURL
	
						},
						query: {itemID: item.id,playlistID: item.playlistID,baseURL: item.baseURL
	
						},
						params: { 
							itemID: item.id,
							playlistID: item.playlistID,
							baseURL: item.baseURL
	
							/*
	
								phoebe should you send a hair pic today
	
	
							*/
						}
					 }" :movie="{ itemID: item.id,playlistID: item.playlistID,baseURL: item.baseURL}">{{ item.title }}</router-link>
					 <!-- <ul>
						<li  v-for="(item,index) in item" :key="index">{{index}} :: {{item}}</li>
					 </ul> -->
				</h6>
				<div class="movie-time d-flex align-items-center my-2 iq-ltr-direction">
					<div class="badge badge-secondary p-1 mr-2">{{ item.age }}</div>
					<span class="text-white">{{ item.time }}</span>
				</div>
				<div class="hover-buttons">
					<router-link :to="{ 
							name: 'landing-page.movie-detail', 
						
							params: { 
								itemID: item.id,
								playlistID: item.playlistID,
								baseURL: item.baseURL
							} 
						}" role="button" class="btn btn-hover iq-button"><i class="fa fa-play mr-1" aria-hidden="true"></i>
						Play Now
					</router-link>
				</div>
			</div>
			<div class="block-social-info">
				<ul class="list-inline p-0 m-0 music-play-lists">
					<li class="share">
						<span><i class="ri-share-fill"></i></span>
						<div class="share-box">
							<div class="d-flex align-items-center">
								<a href="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" class="share-ico" tabindex="0"><i class="ri-facebook-fill"></i></a>
								<a href="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" class="share-ico" tabindex="0"><i class="ri-twitter-fill"></i></a>
								<a href="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" class="share-ico iq-copy-link" tabindex="0"><i class="ri-links-fill"></i></a>
							</div>
						</div>
					</li>
					<li>
						<span><i class="ri-heart-fill"></i></span>
						<span class="count-box">19+</span>
					</li>
					<li><span><i class="ri-add-line"></i></span></li>
				</ul>
			</div>
		</div>
	</li>
</template>
<!-- END COMPONENT -->

<script>

	export default {
		name: 'VideoSwiper',
		
		
		props: ['item'],
		
		computed: {
			boxFormatted() {
				return this.boxID.replace(/\s+/g, '-')
			}
		},
		data: () => ({
		
		}),
		created() {
			// console.log('item in VideoSwiper.vue ', this.item)
		},
		mounted() {
			
		}
	}
	
	
</script>