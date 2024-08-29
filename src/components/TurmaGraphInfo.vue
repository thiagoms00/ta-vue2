<template>
  <v-row>
    <v-col cols="12">
      <!-- Layout indormativo de seleção de turma -->
      <v-sheet
        v-if="!isAtivo"
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

      <!-- Layout de titulo de gráfico -->
      <v-sheet
        class="rounded-t-lg pa-2 d-flex align-center elevation-2"
        color="#1E3892"
        height="48"
      >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-2">Porcentagem de nível por turma</div>
      </v-sheet>

      <!-- Layout do gráfico -->
      <v-sheet class="d-flex justify-center rounded-b-lg" v-if="isAtivo">
        <ChartNivel :data="dadosGraphNivel" />
      </v-sheet>

      <!-- Layout de titulo de gráfico -->
      <v-sheet
        class="rounded-t-lg pa-2 d-flex align-center  mt-4"
        color="#1E3892"
        height="48"
      >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-2">Porcentagem de Habilidade por turma</div>
      </v-sheet>

      <!-- Layout do gráfico -->
      <v-sheet class="d-flex justify-center rounded-b-lg" v-if="isAtivo">
        <ChartHabilidade :data="habilidadesTurma" />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import ChartNivel from "@/components/ChartNivel.vue";
import ChartHabilidade from "./ChartHabilidade.vue";
import axios from "axios";

export default {
  components: {
    ChartNivel,
    ChartHabilidade,
  },

  data() {
    return {
      listaTurma: [],
      melhoresResultados: [],
      dadosGraphNivel: [],
      dadosGraphHabilidade: [],
    };
  },

  props: {
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
    habilidadesTurma: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
      this.gerarDadosGraficoNivel();
    },
  },

  created() {
  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;
    this.gerarDadosGraficoNivel();
  },

  methods: {
    gerarDadosGraficoNivel() {
      // Inicializa o array para armazenar a contagem de cada nível
      const niveis = [0, 0, 0, 0, 0]; // Índices 0-4 correspondem aos níveis 1-5

      // Itera sobre a lista de alunos
      this.listaDeAlunos.forEach((aluno) => {
        const resultadoFinal = this.getResultadoFinal(aluno);
        if (resultadoFinal !== "-" && resultadoFinal !== null) {
          niveis[resultadoFinal - 1] += 1;
        }
      });

      // Define os dados para o gráfico
      this.dadosGraphNivel = niveis;
    },

    getResultadoFinal(item) {
      if (item.listaDeTestes.length === 0) {
        return "-";
      }

      const ultimoTeste = item.listaDeTestes[item.listaDeTestes.length - 1];

      if (ultimoTeste.status !== "Finalizado") {
        return "-";
      }

      switch (ultimoTeste.resultado_final) {
        case "0 - Reprovado":
          return 1;
        case "0 - Aprovado":
        case "1 - Reprovado":
        case "1 - Indefinido":
          return 2;
        case "1 - Aprovado":
        case "2 - Reprovado":
        case "2 - Indefinido":
          return 3;
        case "2 - Aprovado":
        case "3 - Reprovado":
        case "3 - Indefinido":
          return 4;
        case "3 - Aprovado":
          return 5;
        default:
          return null;
      }
    },
  },
};
</script>
