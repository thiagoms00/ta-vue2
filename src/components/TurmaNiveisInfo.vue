<template>
  <v-row>
    <v-col cols="12">
      <!-- Mensagem de Seleção de Turma -->
      <v-row>
        <v-col>
          <v-sheet class="rounded-t-lg pa-2 d-flex align-center justify-space-between" color="#1E3892" height="50">
            <div class="d-flex align-center">
              <!--               <v-icon icon="mdi-ballot"> </v-icon>
 -->
              <div class="text-button ml-2 mt-1 tab-name-niveis">
                Estágios de Aprendizado
              </div>
            </div>

            <div class="text-button mr-2">{{ this.nomeTurma }}</div>
          </v-sheet>
        </v-col>
      </v-row>

      <v-sheet>
        <v-expansion-panels :readonly="true">
          <v-expansion-panel style="border-radius: 0">
            <v-expansion-panel-title style="height: 6vh" disable-icon>
              <template v-slot:actions>
                <!-- Só pra retirar o ícone. -->
              </template>
              <v-row class="align-center">
                <v-col class="pa-2" cols="3">
                  <div class="text-overline map-column-title">Aluno</div>
                </v-col>

                <v-col class="pa-2" cols="1">
                  <div class="text-center main-text">
                    <div class="text-overline map-column-title">Nível</div>
                  </div>
                </v-col>

                <v-col class="pa-2" cols="8">
                  <div class="text-overline map-column-title">Descrição</div>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
          </v-expansion-panel>
        </v-expansion-panels>

<!--         <v-divider></v-divider>
 -->
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(item, index) in listaTurma" :key="item.name" ref="panels" style="border-radius: 0"
            @click="geraDescricaoHab(index)">
            <v-expansion-panel-title style="height: 6vh">
              <v-row class="align-center">
                <v-col class="pa-2" cols="3">
                  <div class="nome-aluno">
                    {{ item.user["nome"] }}
                  </div>
                </v-col>

                <v-col class="pa-2" cols="1">
                  <div class="text-center">
                    <p v-if="getResultadoFinal(item)">
                      {{ getResultadoFinal(item) }}
                    </p>
                  </div>
                </v-col>

                <v-col class="pa-2" cols="8">
                  <div class="px-2">
                    <p class="desc-text" style="
                        font-weight: normal !important;
                        font-size: 0.9375rem !important;
                      ">
                      {{ getDescricaoResultadoFinal(item) }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-table class="rounded-lg elevation-2">
                <thead>
                  <tr>
                    <th class="text-overline">Habilidade</th>
                    <th class="text-overline">Descrição</th>
                  </tr>
                </thead>

                <tbody>
                  <template v-for="(item, index) in habilidades" :key="item.nome">
                    <tr v-if="item.desc !== 'O aluno não respondeu uma questão com essa habilidade.'">
                      <td>
                        <v-chip :class="habilidades[index].colorClass" outlined>
                          {{ item.nome }}
                        </v-chip>
                      </td>
                      <td class="desc-hab" :class="habilidades[index].colorClass">
                        {{ item.desc }}

                        <!-- Início da Tooltip -->
                        <v-tooltip activator="parent" location="top left" class="main-tooltip" :open-delay="0"
                          :close-delay="0" transition="fade-transition" v-if="
                            habilidades[index].colorClass == 'hab100' ||
                            habilidades[index].colorClass == 'hab50' ||
                            habilidades[index].colorClass == 'hab0'
                          ">
                          <!-- Conteúdo da Tooltip com Quebra de Linha -->

                          <div v-if="habilidades[index].colorClass === 'hab100'">
                            <div class="tooltip1Teste">
                              <v-chip color="green lighten-1" dark small class="mr-2">
                                VERDE
                              </v-chip>
                              {{ tooltip1 }}
                            </div>
                          </div>
                          <div v-if="habilidades[index].colorClass === 'hab50'">
                            <div class="my-2 tooltip1Teste">
                              <v-chip color="orange darken-1" dark small class="mr-2">
                                LARANJA
                              </v-chip>
                              {{ tooltip2 }}
                            </div>
                          </div>
                          <div v-if="habilidades[index].colorClass === 'hab0'">
                            <div class="tooltip1Teste">
                              <v-chip color="red darken-2" dark small class="mr-2">
                                VERMELHO
                              </v-chip>
                              {{ tooltip3 }}
                            </div>
                          </div>
                          <div v-else></div>
                        </v-tooltip>
                        <!-- Fim da Tooltip -->
                      </td>
                    </tr>
                  </template>

                  <!-- Jogar um V-for aqui quando tiver as listas de sub-habilidades. -->
                  <!--  <tr>
                    <td class="text-left text-h subHab">H2.1</td>
                    <td class="desc-hab">
                      O aluno não respondeu uma questão com essa habilidade.
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left text-h subHab">H5.1</td>
                    <td class="desc-hab">
                      O aluno não respondeu uma questão com essa habilidade.
                    </td>
                  </tr> -->
                </tbody>
              </v-table>

            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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
      descColor: "",
      info: [
        {
          nome: "Verde",
          desc: "Taxa de acerto de 100% na habilidade.",
          colorClass: "hab100",
          chipColor: "Verde",
        },
        {
          nome: "Laranja",
          desc: "Taxa de acerto inferior à 100% na habilidade.",
          colorClass: "hab50",
          chipColor: "Laranja",
        },
        {
          nome: "Vermelho",
          desc: "Nenhum acerto na habilidade.",
          colorClass: "hab0",
          chipColor: "Vermelho",
        },
      ],
      habilidades: [
        {
          nome: "H01",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H02",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H03",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H04",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H05",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H06",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H07",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H08",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H09",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H10",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
        {
          nome: "H11",
          desc: "PLACEHOLDER",
          colorClass: "",
        },
      ],
      tooltip1: " Habilidade consolidada.",
      tooltip2: " Habilidade em desenvolvimento.",
      tooltip3: " Habilidade Inicial.",
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

  mounted() { },

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
        return "Ausente.";
      }

      const ultimoTeste = item.listaDeTestes[item.listaDeTestes.length - 1];

      if (ultimoTeste.status !== "Finalizado") {
        return "Aluno ausente.";
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
          return "Lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal.";
        case "3 - Aprovado":
          return "Alfabetização Consolidada.";
        default:
          return "-";
      }
    },

    //Gera a descrição adequada com base na lista de habilidades de cada aluno
    geraDescricaoHab(index) {
      console.clear();

      if (index !== this.oldIndex) {
        console.log(index);
        this.oldIndex = index;

        for (let i = 0; i <= 10; i++) {
          const hab = this.listaTurma[index].listaDeHab["Lingua Portuguesa"][i];
          console.log(hab);
          this.habilidades[i].desc = this.descByHab(
            i + 1,
            hab.tentativas,
            hab.porcentagemAcertos
          );
        }
      } else {
        this.oldIndex = 99;
      }
    },
    //descByHab(i,hab.tentativas,hab.acertos)
    descByHab(numHab, tentativas, acertos) {
      console.log(this.habilidades[numHab - 1].colorClass);

      switch (numHab) {
        case 1:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Reconheceu uma letra do alfabeto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "Há situações em que se reconhece uma letra do alfabeto e outras em que isso não ocorre, o que possivelmente evidencia que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não reconheceu uma letra do alfabeto.";
          }
          break;
        case 2:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Reconheceu letra(s) reproduzida(s) com fontes ou formatos distintos.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "O reconhecimento de letra(s) reproduzida(s) com diferentes fontes e formatos ora é realizado, ora não, o que indicia que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não reconheceu letra(s) reproduzida(s) com diferentes formatos ou fontes.";
          }
          break;
        case 3:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Identificou o número de sílabas de uma palavra. ";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "As oscilações entre erros e acertos sugerem que a habilidade de reconhecer o número de sílabas de uma palavra está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não identificou o número de sílabas de uma palavra.";
          }
          break;
        case 4:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Reconheceu um elemento sonoro específico em uma palavra.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "Há ocorrências de erro e de acerto no reconhecimento de elementos sonoros específicos em palavras, o que pode sinalizar que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não reconheceu um elemento sonoro específico em uma palavra.";
          }
          break;
        case 5:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Decodificou uma palavra composta por sílaba canônica CV (consoante/vogal).";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "A decodificação de palavra composta por sílaba canônica CV (consoante/vogal). Oscila entre acertos e erros, o que parece indicar que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não decodificou uma palavra composta por sílaba canônica CV (consoante/vogal).";
          }
          break;
        case 6:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Reconheceu uma informação explícita em um texto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "O reconhecimento de informações explícitas em textos pode estar em desenvolvimento, com ocorrências de erros e acertos.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não reconheceu uma informação explícita em um texto.";
          }
          break;
        case 7:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Reconheceu uma informação em um texto que articula linguagem verbal e não verbal.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "A produção de respostas corretas e incorretas na análise de textos que articulam linguagem verbal e não verbal indicia que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não reconheceu uma informação em um texto que articula linguagem verbal e não verbal.";
          }
          break;
        case 8:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Identificou o tema ou o assunto principal de um texto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "A presença de erros e acertos em questões que demandam a identificação do tema ou do assunto principal de textos indica que essa é uma habilidade em desenvolvimento";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não identificou o tema ou o assunto principal de um texto.";
          }
          break;
        case 9:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Identificou a finalidade ou o objetivo de um texto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "A presença de erros e acertos em questões que demandam a identificação do tema ou do assunto de diferentes textos indica que essa habilidade está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não identificou a finalidade ou o objetivo de um texto.";
          }
          break;
        case 10:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Inferiu uma informação implícita em um texto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "A presença de erros e acertos indicia que a habilidade de inferir informações em textos está em desenvolvimento.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "Não inferiu uma informação implícita em um texto.";
          }
          break;
        case 11:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = "tent0";
            return "O aluno não respondeu uma questão com essa habilidade.";
          } else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = "hab100";
            return "Estabeleceu relação de causa e consequência em um texto.";
          } else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = "hab50";
            return "Não conseguiu estabelecer relação de causa e consequência em um texto.";
          } else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = "hab0";
            return "A habilidade de estabelecer relações de causa e consequência pode estar em desenvolvimento, com ocorrências de respostas corretas e incorretas.";
          }
          break;
      }
    },
  },
};
</script>

<style scoped>
.v-expansion-panel--active .v-expansion-panel-title {
  background-color: #c5d4e2;
  /* Cor desejada para o painel expandido */
}

.v-expansion-panel--active .v-expansion-panel-text {
  background-color: #d5e3f0;
  /* Cor desejada para o conteúdo do painel */
  color: #333;
  /* Ajuste a cor do texto, se necessário */
  padding: 16px;
  /* Opcional: ajuste de espaçamento interno */
}

.v-expansion-panel-text__wrapper {
  padding: 0 4px;
}

.nome-aluno {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  /* Você pode ajustar o valor conforme necessário */
}

.title-column {
  font-weight: bold !important;
  font-size: 0.91rem !important;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
  margin-top: 2vh !important;
}

.title-container {
  min-width: 100%;
}

.exp-container {
  min-width: 100%;
}

.table-text {
  font-size: 1rem !important;
  font-weight: bold !important;
}

.text-h {
  text-transform: bold;
  font-size: 1rem;
}

.main-text {
  font-size: 1rem !important;
}

.desc-hab {
  font-size: 1rem !important;
}

.info-btn {
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffffff;
  color: rgb(53, 53, 90);
}

.t-text {
  font-size: 1rem;
}

.tent0 {
  background-color: #fff !important;
}

.hab100 {
  color: #1a7a11 !important;
}

.hab50 {
  color: #ee7b1d !important;
}

.hab0 {
  color: #c93c3c !important;
}

.tooltip1Teste {
  color: #fff;
}

.subHab {
  font-style: italic;
}

.tab-name-niveis {
  font-family: "Urbanist-SB";
  font-size: 0.92rem !important;
}

.table-title {
  font-weight: bold;
}


.desc-text{
    line-height:3vh;
    width: 90%;
  }

@media (max-width: 1200px) {

  .desc-text{
    line-height:3vh;
  }


}
</style>
