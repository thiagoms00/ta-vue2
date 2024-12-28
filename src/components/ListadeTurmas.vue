<template>
  <!-- Sheet que engloba todo o componente -->
  <v-sheet elevation="2" class="d-flex flex-column rounded-b-lg" color="white">
    <div class="d-flex flex-column w-100">
      <div>
        <v-row class="pa-8">
          <!-- Iteração das turmas existentes -->
          <v-col
            v-for="(turma, index) in turmasFinal"
            :key="index"
            cols="12"
            sm="4"
          >
            <v-sheet
              elevation="3"
              rounded="lg"
              class="pa-4 d-flex align-center borda-diagonal degrade clickable-item"
              @click="handleCardClick(turma, index)"
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
                <!-- Card "Adicionar Nova Turma" -->
                <template v-if="turma.nome === 'Adicionar Nova Turma'">
                  <v-avatar
                    size="50"
                    color="white"
                    class="mr-4 hidden-sm-and-down"
                  >
                    <v-icon size="large" color="primary">mdi-plus</v-icon>
                  </v-avatar>
                  <div class="mx-2">
                    <div class="font-weight-bold text-center">
                      Adicionar Nova Turma
                    </div>
                  </div>
                </template>

                <!-- Card padrão para as outras turmas -->
                <template v-else>
                  <v-avatar
                    size="50"
                    color="white"
                    class="mr-4 hidden-sm-and-down"
                  >
                    <v-icon size="large" color="primary"
                      >mdi-account-group</v-icon
                    >
                  </v-avatar>
                  <div class="mx-2">
                    <div>
                      Nome:
                      <span class="font-weight-bold">{{ turma.nome }}</span>
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
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-sheet>
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
    nomeEscolaAtual:{
      type: String
    }
  },

  computed: {
    turmasFinal() {
      return [
        { novaTurma: true, nome: "Adicionar Nova Turma" },
        ...this.turmas,
      ];
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
    handleCardClick(turma, index) {
      if (turma.nome === "Adicionar Nova Turma") {
        console.log("Adicionar nova turma");
      } else {
        this.selecionaTurma(turma._id, index, turma.nome);
      }
    },

    selecionaTurma(turmaId, index, turmaNome) {
      // Define o loader apenas para o card clicado
      this.isCardLoading[index] = true;

      const data = {
        idTurma: turmaId,
        tokenAdmin: localStorage.getItem("tokenAdmin"),
        idAdmin: localStorage.getItem("idAdmin"),
      };

      axios({
        url: "https://ta-back.onrender.com/admin/dadosTurma",
        data,
        method: "POST",
      })
        .then((response) => {
          this.dadosTurma = response.data;
          console.log(this.dadosTurma);
          this.$emit("changeLevel", "turmaselecionado", this.dadosTurma);
          this.$emit("changeNomeTurma", turmaNome);
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
