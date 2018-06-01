import axios from 'axios'

export default {
  namespaced: true,

  state: {
    programs: [],
  },

  getters: {
    programs: ({ programs }) => programs,
    getProgramById: ({ programs }) => programId => programs.find(program => program.programId === programId),
  },

  mutations: {
    setPrograms (state, { programs }) {
      state.programs = programs
    },
  },

  actions: {
    fetch ({ commit }) {
      return axios.get('/programs.json').then(response => {
        commit('setPrograms', {
          programs: response.data,
        })
      })
    },
  },
}
