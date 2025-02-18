<template>
  <v-row>
    <v-col cols="12">
      <!-- Mensagem de Seleção de Turma -->

      <v-sheet class="rounded-t-lg elevation-2 pa-2 d-flex align-center justify-space-between" color="#1E3892"
        height="50">
        <div class="d-flex align-center ">

          <div class="text-button ml-2 mt-1 tab-name-niveis">Fases do Teste</div>
           
        </div>

        <div class="text-button mr-2">{{ this.nomeTurma }}</div>
      </v-sheet>

      <v-sheet class="rounded-b-lg elevation-2">
        <v-table>
          <thead>
            <tr>
              <!-- Coluna para Nome -->
              <th style="width: 20%">
                <div class="text-center text-overline table-title">Aluno</div>
              </th>

              <!-- Percurso colunas com `v-for` -->
              <th v-for="i in 3" :key="i" style="width: calc(80% / 3); border-left: 1px solid #ccc">
                <div class="text-center text-overline table-title">
                  Percurso {{ i - aux_estrato + 1 }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in listaTurma" :key="item.name" class="pa-6">
              <td style="width: 20%" class="px-4 py-2">
                <div>{{ item.user["nome"] }}</div>
              </td>

              <td v-for="i in 3" :key="i" style="width: calc(80% / 3); border-left: 1px solid #ccc">
                <div class="d-flex flex-wrap">
                  <v-chip v-for="(itemListQuest, index) in getChipsForEstrato(
                    i,
                    item.listaDeTestes?.[item.listaDeTestes.length - 1]
                      ?.listaQuest
                  )" :key="index" :color="getColor(itemListQuest.acertou)" size="x-small" label class="ml-1 mb-1">
                    <v-tooltip activator="parent" location="top" :open-delay="0" :close-delay="0"
                      transition="fade-transition">
                      {{
                        getHabilidadeDescricao(
                          extractDigitsFromId(itemListQuest.id)
                        )
                      }}
                    </v-tooltip>

                    <span>{{ extractDigitsFromId(itemListQuest.id) }}</span>
                  </v-chip>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>

      <!-- MUDANÇAS ----------------------------------------------------- -->
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
    anoTurma: {
      type: Number,
      default: 1,
    },
    nomeTurma: {
      type: String,
      default: "",
    },
  },

  created() {
    if (this.anoTurma <= 3) {
      this.aux_estrato = 1;
    } else {
      this.aux_estrato = 0;
    }
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
    listaDeAlunos(newVal) {
      this.listaTurma = newVal;
      if (this.anoTurma <= 3) {
        this.aux_estrato = 1;
      } else {
        this.aux_estrato = 0;
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
      estratoIndex = estratoIndex - this.aux_estrato;
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
.button-area {
  align-items: center;
  justify-content: center;
  margin-left: 58vw;

}

.planilha-btn{
  width: 0.1vw !important;
}
</style>
