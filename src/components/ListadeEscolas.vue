<template>
  <div class="d-flex flex-column w-100">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" class="pa-8 d-flex align-center justify-center">
        <!-- Avatar de adicionar nova escola -->
        <div class="d-flex flex-column align-center ">
          <v-avatar
            size="70"
            class="mb-3 degrade clickable-item"
            @click=""
            style="cursor: pointer"
          >
            <v-icon size="x-large" color="white">mdi-plus</v-icon>
            <!-- Ícone de adicionar -->
          </v-avatar>
          <div class="text-center">Adicionar Nova Escola</div>
        </div>
      </v-col>

      <!-- Iteração das escolas existentes -->
      <v-col
        v-for="(escola, index) in escolas"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-8"
      >
        <v-sheet
          elevation="3"
          rounded="lg"
          class="pa-4 d-flex flex-column align-center borda-diagonal degrade clickable-item"
          @click="fetchTurmas(escola.id_escola)"
          style="cursor: pointer"
        >
          <v-avatar size="70" color="white" class="mb-3">
            <v-icon size="x-large" color="primary">mdi-school</v-icon>
          </v-avatar>
          <div class="text-center text-body-2">{{ escola.nome_escola }}</div>
          <div class="text-center text-subtitle-2 mt-2">
            {{ escola.diretor_nome }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListadeEscolas",

  data: () => ({
    turmas: [],
  }),

  props: {
    escolas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    fetchTurmas(id) {
      const data = {
        escola_id: id,
      };

      axios({
        url: "https://ta-back.onrender.com/admin/getTurmas",
        data,
        method: "POST",
      })
        .then((response) => {
          if (response.status === 200) {
            // Armazena as turmas retornadas na variável `turmas`
            this.turmas = response.data.turmas;
            this.$emit("changeLevel", "turmas", this.turmas);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar turmas:", error);
        });
    },
  },
};
</script>
