<template>
  <div class="d-flex flex-column w-100">
    <div>
      <v-row class="pa-8">
        <v-col v-for="(turma, index) in turmas" :key="index" cols="12" sm="6">
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex align-center borda-diagonal degrade clickable-item"
            @click="fetchTurma(turma._id)"
            style="cursor: pointer"
          >
            <v-avatar size="50" color="white" class="mr-4">
              <v-icon size="large" color="primary">mdi-account-group</v-icon>
            </v-avatar>
            <div>
              <div>
                Nome: <span class="font-weight-bold">{{ turma.nome }}</span>
              </div>
              <div>
                Número de alunos:
                <span class="font-weight-bold">{{ turma.numero_alunos }}</span>
              </div>
            </div>
            <div>
              <div>
                Professores:
                <ul class="pl-3">
                  <li
                    v-for="(professor, profIndex) in turma.listaDeProfs"
                    :key="profIndex"
                    class="font-weight-bold"
                  >
                    {{ professor }}
                  </li>
                </ul>
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListadeTurmas",

  data: () => ({}),

  props: {
    turmas: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>
