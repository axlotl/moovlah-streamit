import service from'@/store/services/content-service';

const state = {
	list: {},
	content: {},
	meta: {},
	single: null
	
};

const mutations = {
	SET_LIST: (state, list) => {
		state.list = list
	},
	SET_SINGLE: (state, single) => {
		state.single = single
	}
}

const actions = {
	async list({commit, dispatch}, params) {
		const rv = await service.list( params )
		
		commit('SET_LIST', rv);
		return rv;
	},
	
	async getSingle({commit, dispatch}, params){
		const rv = await service.getSingle(params);
		console.info(`in module content`);
		commit(SET_SINGLE, $rv);
		return rv;
	}
}

const getters = {
	list: state => state.list,
	getSingle: state => state.singlw
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
