<template>
  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
    color="#1E3892"
    height="48"
  >
    <v-icon icon="mdi-ballot"> </v-icon>
    <div class="text-button ml-2">
      Escolha uma turma para ser comparada
      {{ iDTurmaAtual }}
    </div>
  </v-sheet>

  <v-sheet class="rounded-b-lg">
    <v-row class="justify-space-evenly ma-0">
      <v-col
        v-for="(item, index) in turmasFiltradas"
        :key="index"
        cols="12"
        md="2"
      >
        <v-card
          class="mx-auto d-flex align-center justify-center"
          width="150"
          height="90"
          variant="elevated"
          elevation="4"
          color="blue-lighten-2"
          @click="selecionarTurmaParaComparar(item)"
        >
          <p class="text-center">
            <v-icon icon="mdi-animation"></v-icon>
            {{ item.nome }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center mt-10"
    color="#1E3892"
    height="48"
  >
    <v-icon icon="mdi-ballot"> </v-icon>
    <div class="text-button ml-2">Comparativo de habilidades entre Turma</div>
  </v-sheet>

  <v-sheet>
    <div v-if="resultadoHabilidade">
      <ChartComparaHabilidades :data="resultadoHabilidade" />
      <ChartComparaNivel :data="resultadoNivel" />
      
    </div>
  </v-sheet>
</template>

<script>
import axios from "axios";
import ChartComparaHabilidades from "@/components/ChartComparaHabilidades.vue";
import ChartComparaNivel from "@/components/ChartComparaNivel.vue";

export default {
  data: () => ({
    iDTurmaAtual: null,
    resultadoHabilidade: [],
    resultadoNivel : []
  }),

  props: {
    iDsTurma: {
      type: Array,
      required: true,
      default: () => [],
    },
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    isAtivo: {
      type: Boolean,
      required: true,
      default: true,
    },
    turmaAtual: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: {
    ChartComparaHabilidades,
    ChartComparaNivel
  },

  methods: {
    selecionarTurmaParaComparar(itemTurma) {
      const data = {
        id_turma1: this.turmaAtual,
        id_turma2: itemTurma.id,
      };

      axios({
        url: "https://ta-back.onrender.com/professores/returnPercentHabTurmas",
        data,
        method: "POST",
      })
        .then((response) => {
          this.resultadoHabilidade = response.data.habilidade;
          this.resultadoNivel = response.data.nivel;
          console.log(this.resultadoNivel);
          console.log(this.resultadoHabilidade);
        })
        .catch((error) => {
          // Tratar erros aqui
          console.error(error);
        });
    },
  },

  computed: {
    turmasFiltradas() {
      return this.iDsTurma.filter((item) => item.id !== this.turmaAtual);
    },
  },

  watch: {
    turmaAtual(newValue) {
      this.iDTurmaAtual = newValue;
    },
  },
};
</script>
