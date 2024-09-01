<template>
  <v-row class="main-row">
    <v-col cols="12" class="main-col">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
        color="#1E3892"
        height="48"
      >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-5 font-weight-bold area-title">Níveis de Aprendizado</div>
      </v-sheet>

      <v-sheet v-if="isAtivo" class="">
        <div ref="teste">
          <v-table v-if="isAtivo">
            <thead>
              <tr>
                <th class="pa-0" style="width: 30%">
                  <div class="text-left ml-8 text-overline title-column">Aluno</div>
                </th>
                <th class="pa-0" style="width: 10%">
                  <div class="text-center text-overline ml-2 title-column">Nível</div>
                </th>
                <th class="pa-0" style="width: 60%">
                  <div class="text-center ml-2 text-overline title-column">Descrição</div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in listaTurma" :key="item.name">
                <td class="pa-0" style="width: 30%">
                  <div class="text-left ml-8 main-text">
                    {{ item.user["nome"] }}
                  </div>
                </td>

                <td class="pa-0" style="width: 10%">
                  <div class="text-center main-text">
                    <!-- Substitui o resultado final pelo nível correspondente -->
                    <p v-if="getResultadoFinal(item)">
                      {{ getResultadoFinal(item) }}
                    </p>
                  </div>
                </td>

                <td class="pa-0" style="width: 60%">
                  <p class="text-center main-text">
                    {{ getDescricaoResultadoFinal(item) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <!--         <v-btn @click="generateTurmasPDf()">TESTE</v-btn -->
      </v-sheet>

      <!-- DIV de seleção de turma -->
      <div>
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

        <div class="mb-4"> </div>

        
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ChartNivel from "@/components/ChartNivel.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  components: {
    ChartNivel,
  },

  data() {
    return {
      listaTurma: [],
      melhoresResultados: [],
      dadosGraph: [],
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
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
      this.gerarDadosGrafico();
    },
  },

  created() {},

  mounted() {
    this.listaTurma = this.listaDeAlunos;
    this.gerarDadosGrafico();
  },

  methods: {
    generateTurmasPDf() {
      const pdfContent = this.$refs.teste;

      html2canvas(pdfContent).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape", // This makes the page landscape
          unit: "mm", // Unit of measurement
          format: [397, 238], // Custom size, [width, height] in mm (A4 in landscape)
        });
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");
      });
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

    getDescricaoResultadoFinal(item) {
      if (item.listaDeTestes.length === 0) {
        return "-";
      }

      const ultimoTeste = item.listaDeTestes[item.listaDeTestes.length - 1];

      if (ultimoTeste.status !== "Finalizado") {
        return "-";
      }

      switch (ultimoTeste.resultado_final) {
        case "0 - Reprovado":
          return "Está desenvolvendo habilidades de reconhecimento de letras.";
        case "0 - Aprovado":
        case "1 - Reprovado":
        case "1 - Indefinido":
          return "Reconhece letras, e está desenvolvendo habilidades de decodificação de palavras.";
        case "1 - Aprovado":
        case "2 - Reprovado":
        case "2 - Indefinido":
          return "Lê palavras e identifica informações explícitas em textos curtos de léxico e sintaxe simples.";
        case "2 - Aprovado":
        case "3 - Reprovado":
        case "3 - Indefinido":
          return "Lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal";
        case "3 - Aprovado":
          return "Alfabetização Consolidada";
        default:
          return "-";
      }
    },

    getResultadoFinal2(item) {
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
          return 2;
        case "1 - Aprovado":
        case "2 - Reprovado":
          return 3;
        case "2 - Aprovado":
        case "3 - Reprovado":
          return 4;
        case "3 - Aprovado":
          return 5;
        default:
          return null;
      }
    },

    gerarDadosGrafico() {
      // Inicializa o array para armazenar a contagem de cada nível
      const niveis = [0, 0, 0, 0, 0]; // Índices 0-4 correspondem aos níveis 1-5

      // Itera sobre a lista de alunos
      this.listaDeAlunos.forEach((aluno) => {
        const resultadoFinal = this.getResultadoFinal(aluno);
        if (resultadoFinal !== "-" && resultadoFinal !== null) {
          niveis[resultadoFinal - 1] += 1; // Incrementa a contagem para o nível correspondente
        }
      });

      // Define os dados para o gráfico
      this.dadosGraph = niveis;
    },
  },
};
</script>

<style>


.title-column{
  font-weight: bold !important;
  font-size: 0.8rem !important;    
}

.main-text{
  font-size: 0.93rem !important;
}


@media (max-width: 1800px){

}

</style>