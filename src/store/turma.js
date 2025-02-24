export default {
    namespaced: true,
    state: {
      turmaAtiva: null,
    },
    mutations: {
      setTurmaAtiva(state, turma) {
        state.turmaAtiva = turma;
      },
    },
    getters: {
      turmaAtiva: (state) => state.turmaAtiva,
    },
  };
  