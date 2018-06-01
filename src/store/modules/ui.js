import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    focusedGuid: 'programs1',
    focusables: [],
  },

  getters: {
    focusedGuid: ({ focusedGuid }) => focusedGuid,
    focusables: ({ focusables }) => focusables,
  },

  mutations: {
    setFocusedGuid (state, { guid }) {
      state.focusedGuid = guid
    },

    // We can query this maybe?
    activateFocusable (state, { guid, order, active }) {
      const focusableIndex = state.focusables.findIndex(focusable => focusable.guid === guid)

      if (focusableIndex > -1) {
        state.focusables.splice(focusableIndex, 1, {
          ...state.focusables[focusableIndex],
          active,
        })
      } else {
        state.focusables.push({
          guid,
          order,
          active,
        })
      }
    },

    deactivateFocusable (state, { guid, active }) {
      const focusableIndex = state.focusables.findIndex(focusable => focusable.guid === guid)

      if (focusableIndex > -1) {
        state.focusables.splice(focusableIndex, 1, {
          ...state.focusables[focusableIndex],
          active,
        })
      }
    },
  },

  actions: {
    // This should maybe be in a global mixin?
    focus ({ commit }, guid) {
      Vue.nextTick(() => commit('setFocusedGuid', { guid }))
    },
  },
}
