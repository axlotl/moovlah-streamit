import service from'@/store/services/video-service';

const state = {
	list: {},
	content: {},
	meta: {},
	url: null,
	videoObj: null
};

const mutations = {
	SET_VIDEO_OBJ: (state, videoObj) => {
		state.videoObj = videoObj
	}
}

const actions = {
	async getVideoObj({commit, dispatch}, params) {
		const rv = await service.getVideoObj( params )
		console.info(`in module video`, rv);
		commit('SET_VIDEO_OBJ', rv);
		return rv;
	}
}

const getters = {
	getVideoObj: state => state.videoObj
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
