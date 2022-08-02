import service from'@/store/services/playlists-service';

const state = {
	list: {},
	content: {},
	meta: {},
	url: null,
	playlists: []
};

const mutations = {
	SET_PLAYLISTS: (state, playlists) => {
		state.playlists = playlists
	}
}

const actions = {
	
	async getPlaylists({commit, dispatch}, params) {
		const rv = await service.getPlaylists( params )
		// console.info(`in module playlists`, rv);
		commit('SET_PLAYLISTS', rv);
		return rv;
	}
}

const getters = {
	getPlaylists: state => state.playlists
}

const items = {
	name: 'playlists',
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

export default items;