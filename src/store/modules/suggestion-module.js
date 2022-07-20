import service from'@/store/services/suggestion-service';

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
		console.info(`in module suggestion`);
		commit('SET_LIST', rv);
		return rv;
	}
}

const getters = {
	list: state => state.list
}

const items = {
	name: 'suggestion',
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

export default items;
