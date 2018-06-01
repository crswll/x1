import Vue from 'vue'
import Vuex from 'vuex'
import { ui, programs } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    programs,
  },
})
