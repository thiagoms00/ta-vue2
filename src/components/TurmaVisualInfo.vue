<template>
  <v-row>
    <v-col cols="12">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
        color="#1E3892"
        height="48"
      >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-2">Resultado dos alunos</div>
      </v-sheet>

      <v-sheet v-if="!mostrarDiv">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listaTurma" :key="item.name">
              <td>{{ item.user["nome"] }}</td>
              <td>
                <v-chip
                  v-for="(code, index) in item.listaDeTestes?.[item.listaDeTestes.length - 1]?.listaQuest"
                  :key="index"
                  class="ma-2"
                  color="blue lighten-4"
                  text-color="black"
                  outlined
                  style="border-radius: 8px; width: 33px; height: 33px"
                >
                  <span class="text-h6">{{ code.alternativa }}</span>
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>

      <!-- DIV de seleção de turma -->
      <div>
        <v-sheet
          v-if="mostrarDiv"
          class="d-flex justify-center align-center rounded-b-lg"
          height="250"
          color="grey-lighten-5"
          border="md"
        >
          <p
            class="text-overline"
            style="
              color: #cfd8dc;
              font-size: 3rem !important;
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
            "
          >
            Selecione uma turma
          </p>
        </v-sheet>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      mostrarDiv: true,
      listaAlunos: [
        {
          nome: "Aluno 1",
          respostas: [true, false, true, true, false],
        },
        {
          nome: "Aluno 2",
          respostas: [false, true, false, true, true],
        },
        // Adicione mais alunos conforme necessário
      ],
      listaTurma: [],
    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
    },
  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
  },

  methods: {
    mudarTela() {
      this.mostrarDiv = false;
      console.log("2");
    },
  },
};
</script>

<style scoped>
.bg-green {
  background-color: #4caf50 !important;
}

.bg-red {
  background-color: #f44336 !important;
}
</style>
