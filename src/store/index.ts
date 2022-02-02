import Vue from "vue";
import Vuex from "vuex";
import * as types from "./state";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: new types.State(),
  mutations: {
    // Lazy settings of items
    setItem(state: types.State, data: { path: string; value: any }) {
      _.set(state, data.path, data.value);
    },
    // Lazy pushing of items
    pushItem(state: types.State, data: { path: string; value: any }) {
      _.update(state, data.path, function (n: Array<any>) {
        n.push(data.value);
        return n;
      });
    },
  },
  actions: {
    // Lazy settings of items
    setItem(context: any, data: { path: string; value: any }) {
      context.commit("setItem", data);
    },
    // Lazy pushing of items
    pushItem(context: any, data: { path: string; value: any }) {
      context.commit("pushItem", data);
    },
  },
  modules: {},
  getters: {
    getState: (state: types.State): types.State => {
      return state;
    },
  },
});
