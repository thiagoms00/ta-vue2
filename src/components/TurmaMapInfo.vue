<template>
  <v-row>
    <v-col cols="12">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet
        class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between"
        color="#1E3892"
        height="48"
      >
      <div class="d-flex align-center" >
        <v-icon icon="mdi-ballot"> </v-icon>
        <div class="text-button ml-2">Mapa de habilidade</div>
      </div>
        
        <div class="text-button mr-2"> {{ this.nomeTurma }} </div>
      </v-sheet>

      <v-sheet>
        <v-table>
          <thead>
            <tr>
              <th class="pa-0" style="width: 20%">
                <div class="text-center text-overline">Nome</div>
              </th>

              <th class="pa-0" style="width: 80%">
                <v-row style="height: 100%">
                  <v-col
                    v-for="i in 3"
                    :key="i"
                    cols="4"
                    class="d-flex pa-0 d-flex align-center"
                    style="height: 100%"
                  >
                    <v-divider vertical></v-divider>

                    <div class="text-center text-overline" style="width: 100%;">
                      Percurso {{ i-aux_estrato }}
                    </div>
                  </v-col>
                </v-row>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in listaTurma" :key="item.name">
              <td class="pa-0" style="width: 20%; ">
                <div class="text-center">
                  {{ item.user["nome"] }}
                </div>
              </td>

              <td style="width: 80%" class="pa-0">
                <v-row style="height: 100%">
                  <v-col
                    v-for="i in 3"
                    :key="i"
                    cols="4"
                    class="d-flex pa-0 d-flex align-center"
                  >
                    <v-divider vertical></v-divider>
                    <div class="d-flex flex-column w-100">
                      <!-- Primeira linha de 6 chips -->
                      <v-row class="ma-0 d-flex justify-start">
                        <v-chip
                          v-for="(itemListQuest, index) in getChipsForEstrato(
                            i,
                            item.listaDeTestes?.[item.listaDeTestes.length - 1]
                              ?.listaQuest
                          ).slice(0, 6)"
                          :key="index"
                          :color="getColor(itemListQuest.acertou)"
                          size="x-small"
                          label
                          class="ml-1"
                        >
                          <v-tooltip text="" activator="parent" location="top" :open-delay="0" :close-delay="0" transition="fade-transition">
                            {{
                              getHabilidadeDescricao(
                                extractDigitsFromId(itemListQuest.id)
                              )
                            }}
                          </v-tooltip>

                          <span>{{
                            extractDigitsFromId(itemListQuest.id)
                          }}</span>
                        </v-chip>
                      </v-row>

                      <div class="mt-1"></div>

                      <!-- Segunda linha de 6 chips -->
                      <v-row class="ma-0 d-flex justify-start">
                        <v-chip
                          v-for="(itemListQuest, index) in getChipsForEstrato(
                            i,
                            item.listaDeTestes?.[item.listaDeTestes.length - 1]
                              ?.listaQuest
                          ).slice(6, 12)"
                          :key="index"
                          class="ml-1"
                          :color="getColor(itemListQuest.acertou)"
                          size="x-small"
                          label
                        >
                          <v-tooltip activator="parent" location="top" :open-delay="0" :close-delay="0" transition="fade-transition">
                            {{
                              getHabilidadeDescricao(
                                extractDigitsFromId(itemListQuest.id)
                              )
                            }}
                          </v-tooltip>
                          <span>{{
                            extractDigitsFromId(itemListQuest.id)
                          }}</span>
                        </v-chip>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      listaAlunos: [
        {
          nome: "Aluno 1",
          respostas: [true, false, true, true, false],
        },
        {
          nome: "Aluno 2",
          respostas: [false, true, false, true, true],
        },
        // Adicione mais alunos conforme necessário
      ],
      listaTurma: [],
      //numeros dos estratos  *mudar quando permitir que o professor defina o estrato inicial de cada turma
      e1: 0,
      e2: 1,
      e3: 2,
      aux_estrato: 0,

    };
  },

  props: {
    listaDeAlunos: {
      type: Array,
      required: true,
      default: () => [],
    },
    anoTurma : {
      type : Number,
      required : true,
      default: 1,
    },
    nomeTurma: {
      type: String,
      required: true,
      default: "",
    },
  },

  created() {
    if(this.anoTurma<=3){
       this.aux_estrato=1;
      }
      else{
        this.aux_estrato=0;
      }
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
      if(this.anoTurma<=3){
        this.aux_estrato=1;
      }
      else{
        this.aux_estrato=0;
      }

    },
  },

  mounted() {
    this.listaTurma = this.listaDeAlunos;

  },

  methods: {

    getColor(acertou) {
      return acertou ? "green-darken-3" : "deep-orange-darken-2";
    },

    getChipsForEstrato(estratoIndex, listaQuest) {
      estratoIndex = estratoIndex-this.aux_estrato;
      if (!Array.isArray(listaQuest)) return [];
      return listaQuest.filter((item) => item.estrato == estratoIndex);
    },

    extractDigitsFromId(itemId) {
      const match = itemId.match(/_(H\d{2})_/);
      return match ? match[1] : "";
    },

    getHabilidadeDescricao(habilidadeCode) {
      const habilidades = {
        H01: "Reconhecer letras do alfabeto.",
        H02: "Identificar o número de sílabas de uma palavra.",
        H03: "Reconhecer letras reproduzidas com diferentes fontes e formatos.",
        H04: "Identificar elementos sonoros (sílaba, rima, fonema) em palavras.",
        H05: "Ler palavras com diferentes padrões silábicos.",
        H06: "Reconhecer informações explícitas em textos.",
        H07: "Analisar informações em gráficos, infográficos, tabelas e outros textos que apresentam recursos multissemióticos.",
        H08: "Identificar o assunto ou tema principal de um texto.",
        H09: "Reconhecer a finalidade ou o objetivo de um texto.",
        H10: "Inferir informações em textos de diferentes gêneros.",
        H11: "Estabelecer relações de causa e consequência em textos de diferentes gêneros.",
      };

      return habilidades[habilidadeCode] || "Habilidade desconhecida";
    },
  },
};
</script>

<style> 

</style>
