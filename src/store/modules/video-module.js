import service from'@/store/services/video-service';

const state = {
	list: {},
	content: {},
	meta: {},
	url: null,
	videoObj: null,
	mp4URL: null
};

const mutations = {
	SET_VIDEO_OBJ: (state, videoObj) => {
		state.videoObj = videoObj
	},
	SET_MP4: (state, mp4URL) => {
		state.mp4URL = mp4URL;
	}

}

const actions = {
	async getVideoObj({commit, dispatch}, params) {
		const rv = await service.getVideoObj( params )
		// console.info(`in module video`, rv);
		commit('SET_VIDEO_OBJ', rv);
		return rv;
	},
	async mp4URL({commit, dispatch}, obj){
		const rv = await service.mp4URL(obj)
		// console.info(`in module video mp4URL`, rv);
		commit( 'SET_MP4', rv);
		return rv;
	}
	
}

const getters = {
	getVideoObj: state => state.videoObj,
	mp4URL: state => state.mp4URL
}

const items = {
	name: 'video',
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

export default items;
