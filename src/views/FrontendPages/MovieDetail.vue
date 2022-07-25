<template>
<div>
  <Details :movie="movie" />
  <MoreLike/>
  <Upcomming/>
</div>
</template>
<script>
import { core } from '../../config/pluginInit'
import Details from './MovieDetailPage/Detail'
import Upcomming from './MovieDetailPage/Upcomming'
import MoreLike from './MovieDetailPage/MoreLike'
export default {
  name: 'MovieDetail',
  components: {
    Details,
    Upcomming,
    MoreLike
  },
  data() {
	return {
		movie: {}
	}
  },
  mounted () {
    console.info(`MoviePage`, this.$route);
	//movie = store.get()
	core.index()
  }
}
</script>
