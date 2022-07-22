<template>
    <div class="video-container iq-main-slider">
      <video class="video d-block" controls loop>
         <!-- <source src="../../../assets/video/sample-video.mp4" type="video/mp4"> -->
         <source :src="this.$route.query.videoUrl" type="video/mp4">
      </video>
   </div>
</template>
<script>
export default {
  name: 'BannerVideo',
  props: {
    
  },
  components: {
  },
  mounted () {
    console.log('videoObject', this.$route.params  );
    
  },
  data () {
    return {
    }
  }
}
</script>
