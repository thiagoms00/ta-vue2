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
        <!-- <v-card
          class="mx-auto d-flex align-center justify-center"
          width="150"
          height="90"
          variant="elevated"
          elevation="4"
          :color="turmaSelecionada === item.nome ? 'info' : 'white'"
          @click="selecionarTurmaParaComparar(item)"
        >
          <p class="text-center">
            <v-icon icon="mdi-animation"></v-icon>
            {{ item.nome }}
          </p>
        </v-card> -->

        <v-btn
          variant="tonal"
          prepend-icon="mdi-animation"
          min-width="155"
          :color="
            turmaSelecionada === item.nome ? 'info' : 'blue-grey-darken-4'
          "
          elevation="4"
          @click="selecionarTurmaParaComparar(item)"
        >
          {{ item.nome }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="rounded-t-lg elevation-2 pa-2 d-flex align-center mt-10"
    color="#1E3892"
    height="48"
  >
    <v-icon icon="mdi-ballot"> </v-icon>
    <div class="text-button ml-2">Comparativo</div>
  </v-sheet>

  <v-sheet>
    <v-tabs
      v-model="tab"
      color="primary"
      style="width: 100%"
      class="selectColor"
    >
      <v-tab
        prepend-icon="mdi-align-vertical-bottom"
        text="Habilidades das turmas"
        value="option-1"
        class="pa-1 d-flex justify-center"
        style="width: 50%"
      ></v-tab>

      <v-tab
        prepend-icon="mdi-apple-keyboard-caps"
        text="Níveis das turmas"
        value="option-2"
        class="pa-1 d-flex justify-center"
        style="width: 50%"
      ></v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- Janela de Dados 1 -->
      <v-window-item value="option-1">
        <!-- Layout de titulo de gráfico -->
        <v-sheet class="pa-2 d-flex align-center elevation-2 rounded-b-lg">
          <v-row>
            <v-col>
              <ChartComparaHabilidades :data="resultadoHabilidade" />
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet class="rounded-b-lg"> </v-sheet>
      </v-window-item>

      <!-- Janela de Dados 2 -->
      <v-window-item value="option-2">
        <!-- Layout de titulo de gráfico -->
        <v-sheet class="pa-2 d-flex align-center">
          <v-row>
            <v-col>
              <ChartComparaNivel :data="resultadoNivel" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-window-item>
    </v-window>
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
    resultadoNivel: [],
    tab: "option-1",
    turmaSelecionada: null,
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
    turmaAtual: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: {
    ChartComparaHabilidades,
    ChartComparaNivel,
  },

  methods: {
    selecionarTurmaParaComparar(itemTurma) {
      this.turmaSelecionada = itemTurma.nome;
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

<style>
.selectColor .text-primary {
  color: #1e3892;
}
</style>
