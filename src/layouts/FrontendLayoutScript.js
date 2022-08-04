import { core } from '../config/pluginInit'
import Loader from '../components/core/loader/Loader'
import profile from '../assets/images/frontend/user/user.jpg'
import loader from '../assets/images/logo-full.png'
import Footer from '../views/FrontendPages/Components/Footer/Footer'
// import Home from '../views/FrontendPages/Components/Home/Home'
import Slider from '../views/FrontendPages/CategoryPage/Slider'
import MovieSlider from '../views/FrontendPages/MovieCategoryPage/Slider'
import NavHeader from '../components/core/navbars/FrontendNav'

import BannerVideo from '@/views/FrontendPages/MovieDetailPage/BannerVideo'

import Banner from '../views/FrontendPages/ShowSinglePage/Banner'
import Breadcrumb from '../views/FrontendPages/Components/Breadcrumb/Breadcrumb'
export default {
	name: 'FrontendLayout',
	props: [
		"query",
		"emittest",
		"viewtest"
	],
	components: {
	  Footer,
	  Loader,
	//   Home,
	  NavHeader,
	  Slider,
	  MovieSlider,
	  BannerVideo,
	  Banner,
	  Breadcrumb
	},
	mounted () {
	  core.index();
	//   console.log('props', this.$props);
	//   console.log('route', this.$route);
	},
	data () {
	  return {
		profile: '',
		animated: { enter: 'fadeInUp', exit: 'fadeOut' },
		userProfile: profile,
		onlyLogo: false,
		onlyLogoText: false,
		logo: loader,
		headerItem: [
		  { title: 'Home', link: '/', child: false },
		  { title: 'Movies', link: '/movie-category', child: false },
		  { title: 'Tv Shows', link: '/show-category', child: false },
		  {
			title: 'Blog',
			link: '#',
			child: true,
			children: [
			  {
				title: 'Blog',
				link: '/blog',
				grandchild: false
			  },
			  {
				title: 'Blog Details',
				link: '/blogdetail',
				grandchild: false
			  }
			]
		  },
		  {
			title: 'pages',
			link: '#',
			child: true,
			children: [
			  {
				title: 'About Us',
				link: '/about',
				grandchild: false
			  },
			  {
				title: 'Contact',
				link: '/contact',
				grandchild: false
			  },
			  {
				title: 'FAQ',
				link: '/faq',
				grandchild: false
			  },
			  {
				title: 'Privacy-Policy',
				link: '/privacy-policy',
				grandchild: false
			  },
			  {
				title: 'Pricing',
				link: '#',
				grandchild: true,
				children: [
				  {
					title: 'Pricing1',
					link: '/pricing-plan1'
				  },
				  {
					title: 'Pricing2',
					link: '/pricing-plan2'
				  }
				]
			  }
			]
		  }
		]
	  }
	},
	methods: {
	  changeLogo (e) {
		this.logo = e
	  },
	  routerAnimationChange (e) {
		this.animated = e
	  }
	}
  }