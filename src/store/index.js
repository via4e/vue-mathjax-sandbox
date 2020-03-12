import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config/config.json'

// Modules
import user from './modules/user'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: config
  },
  getters: {},
  mutations: {
    SETSERVER (state, payload) {
      state.config.serverUrl = payload
      state.config.fullServerUrl = payload + '/api'

      console.log(
        'state.config.fullServerUrl',
        state.config.fullServerUrl,
        'payload',
        payload
      )
    }
  },
  actions: {
    SETNEWSERVER (context, payload) {
      context.commit('SETSERVER', payload)
    }
  },
  modules: {
    user,
    ui
  }
})
