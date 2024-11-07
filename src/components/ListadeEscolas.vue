<template>
    <div class="d-flex flex-column w-100">
    <div class="mt-16">
      <v-row class="pa-8">
        <v-col
          v-for="(escola, index) in escolas"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-sheet
            elevation="3"
            rounded="lg"
            class="pa-4 d-flex flex-column align-center borda-diagonal degrade clickable-item"
            @click="fetchTurmas(escola._id)"
            style="cursor: pointer"
          >
            <v-avatar size="70" color="white" class="mb-3">
              <v-icon size="x-large" color="primary">mdi-school</v-icon>
            </v-avatar>
            <div class="text-center">{{ escola.nome }}</div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ListadeEscolas",

    data:() =>({
        turmas: [],
        escolaId: "66c5d8d672360c41d2e1ba0f",
    }),

    props: {
    escolas: {
      type: Array,
      required: true
    }
  },
   methods:{
    fetchTurmas() {
      const data = {
        escola_id: this.escolaId,
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
            console.log(this.turmas);
            this.$emit('changeLevel', 'turmas', this.turmas);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar turmas:", error);
        });
    },
   }

}
</script>