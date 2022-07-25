import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
import Category from './Category/index'
import Movie from './Movie/index'
import Show from './Show/index'


import content from './modules/content-module';
import profile from './modules/profile-module';
import suggestion from './modules/suggestion-module';
import video from './modules/video-module';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    Category,
    Movie,
    Show,

    content,
    profile,
    suggestion,
	video
  },
  
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
  
})
