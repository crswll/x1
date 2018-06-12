import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    focusedGuid: 'tabs',
    focusables: [],
    transition: {
      enter: 'fadeIn',
      leave: 'fadeOut',
      mode: 'out-in',
    },
  },

  getters: {
    focusedGuid: ({ focusedGuid }) => focusedGuid,
    focusables: ({ focusables }) => focusables,
    transition: ({ transition }) => transition,
  },

  mutations: {
    setFocusedGuid (state, { guid }) {
      state.focusedGuid = guid
    },

    setTransition (state, { enter, leave, mode }) {
      console.log(enter, leave, mode)

      state.transition = { enter, leave, mode }
    },
  },

  actions: {
    focus ({ commit }, guid) {
      Vue.nextTick(() => commit('setFocusedGuid', { guid }))
    },
  },
}
