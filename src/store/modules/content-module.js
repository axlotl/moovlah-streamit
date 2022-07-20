import service from'@/store/services/content-service';

const state = {
	list: {},
	content: {},
	meta: {},
	url: null
};

const mutations = {
	SET_LIST: (state, list) => {
		state.list = list
	}
}

const actions = {
	async list({commit, dispatch}, params) {
		const rv = await service.list( params )
		console.info(`in module content`);
		commit('SET_LIST', rv);
		return rv;
	}
}

const getters = {
	list: state => state.list
}

const items = {
	name: 'content',
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

export default items;
