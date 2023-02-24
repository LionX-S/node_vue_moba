import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

const actions = {
	setUserMsg(context, value) {
		context.commit("SetUserMsg", value);
	}
};
const mutations = {
	SetUserMsg(state, value) {
		state.username = value.username;
		state.avatarUrl = value.avatarUrl;
	}
};
const state = {
	username: "",
	avatarUrl: ""
};

export default new vuex.Store({
	actions,
	mutations,
	state
});
