<template>
  <v-row class="main-row">
    <v-col cols="12" class="main-col">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between" color="#1E3892"
        height="48">

        <div class="d-flex align-center">
          <v-icon icon="mdi-ballot"> </v-icon>
          <div class="text-button ml-2">Níveis de Aprendizado</div>
        </div>

        <div class="text-button mr-2">{{ this.nomeTurma }}</div>
      </v-sheet>

      <v-sheet>



        <v-sheet class="d-flex flex-column rounded-t-lg">
          <v-container class="d-flex flex-row rounded-b-lg title-container">
            <v-row>
              <v-col class="pa-0" cols="3">
                <div class="text-left ml-8 text-overline title-column">
                  Aluno
                </div>
              </v-col>
              <v-col class="pa-0" cols="1">
                <div class="text-center text-overline ml-2 title-column">
                  Nível
                </div>
              </v-col>

              <v-col class="pa-0" cols="7">
                <div class="text-center ml-2 text-overline title-column">
                  Descrição
                </div>
              </v-col>
            </v-row>

          </v-container>
          <v-container>
            <v-expansion-panels variant="accordion" class="">
              <v-expansion-panel v-for="(item, index) in listaTurma" :key="item.name" ref="panels" class=""
                style="border-radius: 0px">
                <v-expansion-panel-title style="height: 6vh" @click="geraDescricaoHab(index)">
                  <v-row class="align-center">
                    <v-col class="pa-0" cols="3">
                      <div class="text-left ml-7 main-text">
                        {{ item.user["nome"] }}
                      </div>
                    </v-col>

                    <v-col class="pa-0" cols="1">
                      <div class="text-center main-text">
                        <p v-if="getResultadoFinal(item)">
                          {{ getResultadoFinal(item) }}
                        </p>
                      </div>
                    </v-col>

                    <v-col class="pa-0" cols="7">
                      <p class="text-center main-text">
                        {{ getDescricaoResultadoFinal(item) }}
                      </p>
                    </v-col>
                  </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-table class="">
                    <thead>
                      <tr class="tread1">
                        <th class="table-text">Habilidade</th>
                        <th class="table-text">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in habilidades" :key="item.nome">
                        <td class="">{{ item.nome }}</td>
                        <td>{{ item.desc }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-expansion-panel-text>
              </v-expansion-panel>

            </v-expansion-panels>
          </v-container>
        </v-sheet>

      </v-sheet>
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
      isOpen: false,
      oldIndex: 99,
      habilidades: [
        {
          nome: 'H01',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H02',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H03',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H04',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H05',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H06',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H07',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H08',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H09',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H10',
          desc: 'PLACEHOLDER'
        },
        {
          nome: 'H11',
          desc: 'PLACEHOLDER'
        },
      ]

    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    nomeTurma: {
      type: String,
      required: true,
      default: "",
    },
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
    },
  },

  created() {
    this.listaTurma = this.listaDeAlunos;

  },

  mounted() {

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
    //Gera a descrição adequada com base na lista de habilidades de cada aluno
    geraDescricaoHab(index) {
      console.clear();

      if (index !== this.oldIndex) {
        console.log(index);
        this.oldIndex = index;

        //Alterando habilidade 01:
        for (let i = 0; i <= 10; i++) {
          const hab = this.listaTurma[index].listaDeHab['Lingua Portuguesa'][i];
          console.log(hab);

          if (hab.tentativas === 0) {
            this.habilidades[i].desc = 'O aluno não respondeu uma questão com essa habilidade.';
          }
          else if (hab.tentativas >= 1 && hab.porcentagemAcertos === 100) {
            this.habilidades[i].desc = 'Reconheceu uma letra do alfabeto.';
          }
          else if (hab.tentativas >= 1 && hab.porcentagemAcertos === 0) {
            this.habilidades[i].desc = 'Não reconheceu uma letra do alfabeto.';
          }
          else if (hab.tentativas >= 1 && hab.porcentagemAcertos >= 0 && hab.porcentagemAcertos <= 99.9) {
            this.habilidades[i].desc = 'Há situações em que se reconhece uma letra do alfabeto e outras em que isso não ocorre, o que possivelmente evidencia que essa habilidade está em desenvolvimento.';
          }
        }

        //Alterando habilidade 02



      }
      else {
        this.oldIndex = 99;
      }




    },

    descByHab(numHab,tentativas,acertos) {
      switch (numHab) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;
        case 10:
          break;
        case 11:
          break;

      }
    }


  },
};
</script>

<style>
.title-column {
  font-weight: bold !important;
  font-size: 0.91rem !important;
}


.table-text {
  font-size: 1rem !important;
  font-weight: bold !important;
}

.main-text {
  font-size: 1rem !important;
}

@media (max-width: 1800px) {}
</style>
