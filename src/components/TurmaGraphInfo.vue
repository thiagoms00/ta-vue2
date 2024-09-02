<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="rounded-t-lg elevation-4" color="#1E3892" height="48">
        <v-tabs
          v-model="tab"
          color="primary"
          style="width: 100%"
          class="selectColor"
        >
          <v-tab
            prepend-icon="mdi-apple-keyboard-caps"
            text="Nível"
            value="option-1"
            class="pa-1 d-flex justify-center"
          ></v-tab>

          <v-tab
            prepend-icon="mdi-align-vertical-bottom"
            text="Habilidade"
            value="option-2"
            class="pa-1 d-flex justify-center"
          ></v-tab>
        </v-tabs>
      </v-sheet>

      <v-col class="pa-0 rounded-b-lg">
        <v-window v-model="tab">
          <!-- Janela de Dados 1 -->
          <v-window-item value="option-1">
            <!-- Layout de titulo de gráfico -->
            <v-sheet class="pa-2 d-flex align-center elevation-2 rounded-b-lg">
              <v-row>
                <v-col cols="6">
                  <div class="text-button ml-2">
                    <v-icon icon="mdi-apple-keyboard-caps"> </v-icon>
                    Níveis de Alfabetização e Letramento
                  </div>
                  <ChartNivel :data="dadosGraphNivel" />
                </v-col>
                <v-col cols="6"> </v-col>
              </v-row>
            </v-sheet>

            <v-sheet class="rounded-b-lg"> </v-sheet>
          </v-window-item>

          <!-- Janela de Dados 2 -->
          <v-window-item value="option-2">

            <!-- Layout de titulo de gráfico -->
            <v-sheet class=" pa-2 d-flex align-center" v-if="isAtivo" >
              <v-row>
                <v-col>
                  <div class="text-button ml-2">
                    <v-icon icon="mdi-align-vertical-bottom"></v-icon>
                    Porcentagem de Acerto por Habilidade da turma
                  </div>

                  <ChartHabilidade :data="habilidadesTurma" />
                </v-col>
              </v-row>
              
              
            </v-sheet>
          </v-window-item>
        </v-window>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import ChartNivel from "@/components/ChartNivel.vue";
import ChartHabilidade from "./ChartHabilidade.vue";

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
      tab: "option-1",
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

  created() {},

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

<style>
.selectColor .text-primary {
  color: orange !important;
}
</style>
