<template>
  <!-- Sheet que engloba todo o componente -->
  <v-sheet
    elevation="2"
    class="d-flex flex-column rounded-b-lg"
    color="white"
  >
    <div class="d-flex flex-column w-100">
      <v-row>
        <!-- Avatar de adicionar nova escola -->
        <v-col cols="12" sm="6" md="4" lg="3" class="pt-8 pb-8 pl-8 d-flex align-center justify-center">
          <v-sheet
            height="200"
            width="300"
            elevation="2"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center borda-diagonal clickable-item position-relative justify-center degrade"
          >
            <div class="d-flex flex-column align-center">
              <v-avatar size="70" class="mb-3" color="white">
                <v-icon size="x-large" color="primary">mdi-plus</v-icon>
              </v-avatar>
              <div class="text-center text-body-2">Adicionar Nova Escola</div>
            </div>
          </v-sheet>
        </v-col>

        <!-- Skeleton Loader enquanto os dados estão carregando -->
        <v-col
          v-if="isLoading"
          v-for="n in 3"
          :key="n"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-8"
        >
          <v-skeleton-loader
            class="mx-auto border"
            elevation="2"
            max-width="300"
            type="card, divider"
          ></v-skeleton-loader>
        </v-col>

        <!-- Iteração das escolas existentes quando carregadas -->
        <v-col
          v-if="!isLoading"
          v-for="(escola, index) in escolas"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-8"
        >
          <v-sheet
            elevation="2"
            height="200"
            width="300"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center borda-diagonal degrade clickable-item position-relative justify-center"
            @click="fetchTurmas(index, escola.id_escola)"
            style="cursor: pointer"
          >
            <!-- Loader circular quando o card específico está em carregamento -->
            <div
              v-if="isCardLoading[index]"
              class="d-flex align-center justify-center degrade borda-diagonal"
              style="position: absolute; inset: 0; z-index: 1"
            >
              <v-progress-circular indeterminate color="white" size="30"></v-progress-circular>
            </div>

            <!-- Conteúdo do card (avatar e textos), que some ao clicar -->
            <template v-else>
              <v-avatar size="70" color="white" class="mb-3">
                <v-icon size="x-large" color="primary">mdi-school</v-icon>
              </v-avatar>
              <div class="d-flex flex-column escola-info">
                <div class="text-center text-body-2 nome-escola">{{ escola.nome_escola }}</div>
                <div class="text-center text-subtitle-2 mt-2 nome-diretor">
                  {{ escola.diretor_nome }}
                </div>
              </div>
            </template>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>



<script>
import axios from "axios";

export default {
  name: "ListadeEscolas",

  data: () => ({
    turmas: [],
    isLoading: true, // Indicador de carregamento geral
    isCardLoading: [], // Array de carregamento para cada card
  }),

  props: {
    escolas: {
      type: Array,
      required: true,
    },
  },

  watch: {
    escolas: {
      handler(newVal) {
        // Verifica se `escolas` não está vazio
        this.isLoading = newVal.length === 0;

        // Inicializa o array `isCardLoading` com 'false' para cada card apenas se `escolas` não estiver vazio
        if (newVal.length > 0) {
          this.isCardLoading = newVal.map(() => false);
        }
      },
      immediate: true, // Executa o watch imediatamente ao carregar o componente
    },
  },

  methods: {
    fetchTurmas(index, id) {
      // Ativa o carregamento para o card específico pelo índice
      this.isCardLoading[index] = true;

      const data = {
        escola_id: id,
        tokenAdmin: localStorage.getItem("tokenAdmin"),
        idAdmin: localStorage.getItem("idAdmin"),
      };

      axios({
        url: "https://ta-back.onrender.com/admin/getTurmas",
        data,
        method: "POST",
      })
        .then((response) => {
          if (response.status === 200) {
            this.turmas = response.data.turmas;
            this.$emit("changeLevel", "turmas", this.turmas);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar turmas:", error);
        })
        .finally(() => {
          // Desativa o carregamento para o card específico
          this.isCardLoading[index] = false;
        });
    },
  },
};
</script>

<style scoped>
.escola-info{
  border-radius: 0.3rem;
  overflow: hidden;
  padding: 2px;
}

.nome-escola{
  font-size: 1.02rem !important;
  font-family: 'Urbanist-Regular';
  font-weight: 600;
  margin-top:0.3vh;
}

</style>