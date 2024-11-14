<template>
  <div class="d-flex flex-column w-100">
    <div>
      <v-row class="pa-8">
        <v-col cols="12" sm="4">
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex align-center borda-diagonal degrade 
            clickable-item"
            style="cursor: pointer"
            height="100"
          >
            <v-avatar size="50" color="white">
              <v-icon size="x-large" color="primary">mdi-plus</v-icon>
            </v-avatar>
            <div class="text-center text-body-2 mx-4">Adicionar Nova Turma</div>
          </v-sheet>
        </v-col>
        <!-- Iteração das turmas existentes -->
        <v-col v-for="(turma, index) in turmas" :key="index" cols="12" sm="4">
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex align-center borda-diagonal degrade clickable-item"
            @click="selecionaTurma(turma._id, index)"
            style="cursor: pointer"
            height="100"
          >
            <!-- Loader Circular Condicional -->
            <div
              v-if="isCardLoading[index]"
              class="w-100 d-flex align-center justify-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
                size="40"
              ></v-progress-circular>
            </div>

            <!-- Conteúdo do Card -->
            <template v-else>
              <v-avatar size="50" color="white" class="mr-4 hidden-sm-and-down">
                <v-icon size="large" color="primary">mdi-account-group</v-icon>
              </v-avatar>
              <div class="mx-2">
                <div>
                  Nome: <span class="font-weight-bold">{{ turma.nome }}</span>
                </div>
                <div>
                  Número de alunos:
                  <span class="font-weight-bold">{{
                    turma.numero_alunos
                  }}</span>
                </div>
              </div>
              <div class="ml-5 hidden-lg-and-down">
                <div>Professores:</div>
                <div>
                  <span
                    v-for="(professor, profIndex) in turma.listaDeProfs"
                    :key="profIndex"
                    class="font-weight-bold"
                  >
                    {{ professor }}
                  </span>
                </div>
              </div>
            </template>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListadeTurmas",

  data: () => ({
    dadosTurma: {},
    isCardLoading: [], // Controla o loader em cada card específico
  }),

  props: {
    turmas: {
      type: Array,
      required: true,
    },
  },

  watch: {
    turmas: {
      handler(newVal) {
        // Inicializa isCardLoading como false para cada turma
        if (newVal.length > 0) {
          this.isCardLoading = newVal.map(() => false);
        }
      },
      immediate: true, // Executa o watch imediatamente ao carregar o componente
    },
  },

  methods: {
    selecionaTurma(turmaId, index) {
      // Define o loader apenas para o card clicado
      this.isCardLoading[index] = true;

      const data = {
        idTurma: turmaId,
        token: localStorage.getItem("token"),
        id: localStorage.getItem("id"),
      };

      axios({
        url: "https://ta-back.onrender.com/admin/dadosTurma",
        data,
        method: "POST",
      })
        .then((response) => {
          this.dadosTurma = response.data;
          this.$emit("changeLevel", "turmaselecionado", this.dadosTurma);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          // Desativa o loader circular do card específico após o carregamento
          this.isCardLoading[index] = false;
        });
    },
  },
};
</script>
