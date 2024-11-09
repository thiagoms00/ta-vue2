<template>
  <v-row>
    <v-col cols="12">
      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between"
        color="#1E3892"
        height="48"
      >
      <div class="d-flex align-center" >
        <v-icon icon="mdi-chart-bar"> </v-icon>
        <div class="text-button ml-2">Dados gerais da turma</div>
      </div>
      <div class="text-button mr-2"> {{ this.nomeTurma }} </div>
      </v-sheet>

      <v-col class="pa-0 rounded-b-lg">
        <v-sheet>
          <v-tabs
            v-model="tab"
            color="primary"
            style="width: 100%"
            class="selectColor"
          >
            <v-tab
              prepend-icon="mdi-apple-keyboard-caps"
              text="Níveis de Alfabetização e Letramento"
              value="option-1"
              class="pa-1 d-flex justify-center"
              style="width: 50%"
            ></v-tab>

            <v-tab
              prepend-icon="mdi-align-vertical-bottom"
              text="Porcentagem de Acerto por Habilidade da turma"
              value="option-2"
              class="pa-1 d-flex justify-center"
              style="width: 50%"
            ></v-tab>

            
          </v-tabs>
        </v-sheet>

        <v-window v-model="tab">
          <!-- Janela de Dados 1 -->
          <v-window-item value="option-1">
            <!-- Layout de titulo de gráfico -->
            <v-sheet class="pa-2 d-flex align-center elevation-2 rounded-b-lg">
              <v-row>
                <v-col cols="6">
                  <ChartNivel :data="dadosGraphNivel" />
                </v-col>

                <v-col cols="6" class="d-flex align-center">
                  <v-sheet class="rounded-lg" border>
                    <v-table density="compact">
                      <thead>
                        <tr>
                          <th class="text-center">Nível</th>
                          <th class="text-left">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in descricoes">
                          <td>{{ index + 1}}</td>
                          <td>{{ item }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-sheet>
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
      descricoes: [
        "Está desenvolvendo habilidades de reconhecimento de letras.", // Para "0 - Reprovado"
        "Reconhece letras, e está desenvolvendo habilidades de decodificação de palavras.", // Para "0 - Aprovado", "1 - Reprovado", "1 - Indefinido"
        "Lê palavras e identifica informações explícitas em textos curtos de léxico e sintaxe simples.", // Para "1 - Aprovado", "2 - Reprovado", "2 - Indefinido"
        "Lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal.", // Para "2 - Aprovado", "3 - Reprovado", "3 - Indefinido"
        "Alfabetização Consolidada", // Para "3 - Aprovado"
      ],
    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    habilidadesTurma: {
      type: Object,
      required: true,
      default: {},
    },
    nomeTurma: {
      type: String,
      default: "",
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
  color: #1e3892;
}
</style>
