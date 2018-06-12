import http from '../../http'

export default {
  namespaced: true,

  state: {
    programs: [],
  },

  getters: {
    programs: ({ programs }) => programs,
    getProgramById: ({ programs }) => programId => programs.find(program => program.programId === programId),
    programsByYear: ({ programs }) => programs.reduce((years, program) => {
      if (!years[program.year]) years[program.year] = []
      years[program.year].push(program)
      return years
    }, {}),
  },

  mutations: {
    setPrograms (state, { programs }) {
      state.programs = programs
    },
  },

  actions: {
    fetch ({ commit }) {
      return http.get('/programs.json').then(response => {
        commit('setPrograms', {
          programs: response.data,
        })
      })
    },
  },
}
