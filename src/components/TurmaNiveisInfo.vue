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
          <v-container class="exp-container">
            <v-expansion-panels variant="accordion" class="">
              <v-expansion-panel v-for="(item, index) in listaTurma" :key="item.name" ref="panels" class=""
                @click="geraDescricaoHab(index)" style="border-radius: 0px">
                <v-expansion-panel-title style="height: 6vh">
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
                        <th class="table-text">Habilidade
                          <v-tooltip activator="parent" location="end"
                            class="main-tooltip">

                            <p class="tooltip-hab t-text">
                              <span class="t-text" :style="{ color: '#1a7a11' }">VERDE</span> {{ tooltip1 }}
                            </p>
                            <p class="tooltip-hab t-text">
                              <span class="t-text" :style="{ color: '#ee7b1d' }">LARANJA</span> {{ tooltip2 }}
                            </p>
                            <p class="tooltip-hab t-text">
                              <span class="t-text" :style="{ color: '#ef2d2d' }">VERMELHO</span> {{ tooltip3 }}
                            </p>
                          </v-tooltip>
                        </th>
                        <th class="table-text">Descrição</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in habilidades" :key="item.nome">
                        <td class="text-left text-h">{{ item.nome }} 
                          
                        </td>
                        <td class="desc-hab" :class="habilidades[index].colorClass">
                          {{ item.desc }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>

                  <v-divider :thickness="10" color="grey"></v-divider>
                  <v-table>
                    <thead>
                      <tr class="tread1">
                        <th class="table-text">Cor
                        </th>
                        <th class="table-text">Significado</th>

                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(item, index) in info" :key="item.nome">
                        <td class="text-left text-h" :class="info[index].colorClass">{{ item.nome }} 
                          
                        </td>
                        <td class="desc-hab">
                          {{ item.desc }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-divider :thickness="10" color="grey"></v-divider>
                  
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
      descColor: '',
      info : [
        {
          nome : 'Verde',
          desc : 'Taxa de acerto de 100% na habilidade.',
          colorClass : 'hab100'
        },
        {
          nome : 'Laranja',
          desc : 'Taxa de acerto inferior à 100% na habilidade.',
          colorClass : 'hab50'

        },
        {
          nome : 'Vermelho',
          desc : 'Nenhum acerto na habilidade.',
          colorClass : 'hab0'

        }
      ],
      habilidades: [
        {
          nome: 'H01',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H02',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H03',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H04',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H05',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H06',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H07',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H08',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H09',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H10',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
        {
          nome: 'H11',
          desc: 'PLACEHOLDER',
          colorClass: '',
        },
      ],
      tooltip1: ' -  Taxa de acerto de 100% na habilidade.',
      tooltip2: ' - Taxa de acerto inferior à 100% na habilidade.',
      tooltip3: ' - Nenhum acerto na habilidade.'
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
          this.habilidades[i].desc = this.descByHab(i + 1, hab.tentativas, hab.porcentagemAcertos);


        }




      }
      else {
        this.oldIndex = 99;
      }




    },
    //descByHab(i,hab.tentativas,hab.acertos)
    descByHab(numHab, tentativas, acertos) {
      console.log(this.habilidades[numHab - 1].colorClass)

      switch (numHab) {
        case 1:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0';
            return ('O aluno não respondeu uma questão com essa habilidade');
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100';
            return ('Reconheceu uma letra do alfabeto.');
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50';
            return ('Há situações em que se reconhece uma letra do alfabeto e outras em que isso não ocorre, o que possivelmente evidencia que essa habilidade está em desenvolvimento.');
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0';
            return ('Não reconheceu uma letra do alfabeto.');
          }
          break;
        case 2:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Identificou o número de sílabas de uma palavra.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('Não identificou o número de sílabas de uma palavra.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('A oscilação entre erros e acertos sugere que a habilidade de reconhecer o número de sílabas de uma palavra está em desenvolvimento.')
          }

          break;
        case 3:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Reconheceu uma mesma letra escrita com fontes e formatos distintos.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('O reconhecimento de uma mesma letra reproduzida com diferentes fontes e formatos ora é realizado, ora não, o que indicia que essa habilidade está em desenvolvimento.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não reconheceu uma mesma letra reproduzida com diferentes fontes e formatos.')
          }
          break;
        case 4:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Reconheceu um elemento sonoro específico em uma palavra.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('Há ocorrências de erro e de acerto no reconhecimento de elementos sonoros específicos em palavras, o que pode sinalizar que essa habilidade está em desenvolvimento.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não reconheceu um elemento sonoro específico em uma palavra.')
          }
          break;
        case 5:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Decodificou uma palavra.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('A decodificação de palavras oscila entre acertos e erros, o que pode indicar que essa habilidade está em desenvolvimento')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não decodificou uma palavra.')
          }
          break;
        case 6:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Reconheceu uma informação explícita em um texto.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('O reconhecimento de informações explícitas em textos pode estar em desenvolvimento, com ocorrências de erros e acertos.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não reconheceu uma informação explícita em um texto.')
          }
          break;
        case 7:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Reconheceu uma informação em um texto que articula linguagem verbal e não verbal.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('A produção de respostas corretas e incorretas na análise de textos que articulam linguagem verbal e não verbal indicia que essa habilidade está em desenvolvimento.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não reconheceu uma informação em um texto que articula linguagem verbal e não verbal.')
          }
          break;
        case 8:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Identificou o tema ou o assunto principal de um texto.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('A presença de erros e acertos em questões que demandam a identificação do tema ou do assunto principal de textos indica que essa é uma habilidade em desenvolvimento')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não identificou o tema ou o assunto principal de um texto.')
          }
          break;
        case 9:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Identificou a finalidade ou o objetivo de um texto.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('A presença de erros e acertos em questões que demandam a identificação do tema ou do assunto de diferentes textos indica que essa habilidade está em desenvolvimento.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não identificou a finalidade ou o objetivo de um texto.')
          }
          break;
        case 10:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Inferiu uma informação implícita em um texto.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('A presença de erros e acertos indicia que a habilidade de inferir informações em textos está em desenvolvimento.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('Não inferiu uma informação implícita em um texto.')
          }
          break;
        case 11:
          if (tentativas === 0) {
            this.habilidades[numHab - 1].colorClass = 'tent0'
            return ('O aluno não respondeu uma questão com essa habilidade')
          }
          else if (tentativas >= 1 && acertos === 100) {
            this.habilidades[numHab - 1].colorClass = 'hab100'
            return ('Estabeleceu relação de causa e consequência em um texto.')
          }
          else if (tentativas >= 1 && acertos > 0 && acertos < 100) {
            this.habilidades[numHab - 1].colorClass = 'hab50'
            return ('Não conseguiu estabelecer relação de causa e consequência em um texto.')
          }
          else if (tentativas >= 1 && acertos === 0) {
            this.habilidades[numHab - 1].colorClass = 'hab0'
            return ('A habilidade de estabelecer relações de causa e consequência pode estar em desenvolvimento, com ocorrências de respostas corretas e incorretas.')
          }
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
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

.text-h{
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
  color: #ef2d2d !important;
}



@media (max-width: 1800px) {}
</style>
