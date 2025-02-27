<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" bg-color="#fcae21">
        <v-tab value="teste1">
          <v-icon icon="mdi-numeric-1"></v-icon>
        </v-tab>
      </v-tabs>
    </v-card>

    <v-window v-model="tab">
      <v-window-item value="teste1">
        <v-table v-if="this.testes_org.length >= 1">
          <thead>
            <tr>
              <th class="text-left">Questão</th>
              <th class="text-left">Percurso</th>
              <th class="text-left">Habilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class=""
              v-for="(item, index) in testes_org[0]"
              :key="item.estrato"
            >
              <!--  <td v-if="item.acerto==='Sim'" class="cor-acerto">
                            {{ index + 1 }}</td>
                        <td v-else class="cor-erro">{{ index + 1 }}</td> -->
              <td class="cor-padrao">{{ index + 1 }}</td>
              <td class="cor-padrao">{{ item.estrato + 1 }}</td>
              <td v-if="item.acerto === 'Sim'" class="cor-acerto">
                {{ this.getHabilidadeDescricao(item.habilidade) }}
                <v-tooltip
                  activator="parent"
                  location="top left"
                  class="main-tooltip"
                  :open-delay="0"
                  :close-delay="0"
                  transition="fade-transition"
                >
                  <!-- Conteúdo da Tooltip com Quebra de Linha -->
                  <div class="tooltip1Teste">
                    <v-chip color="green lighten-1" dark small class="mr-2">
                      VERDE
                    </v-chip>
                    {{ tooltip1 }}
                  </div>
                </v-tooltip>
              </td>
              <td v-else class="cor-erro">
                {{ this.getHabilidadeDescricao(item.habilidade) }}
                <v-tooltip
                  activator="parent"
                  location="top left"
                  class="main-tooltip"
                  :open-delay="0"
                  :close-delay="0"
                  transition="fade-transition"
                >
                  <!-- Conteúdo da Tooltip com Quebra de Linha -->

                  <div class="my-2 tooltip1Teste">
                    <v-chip color="red darken-2" dark small class="mr-2">
                      VERMELHO
                    </v-chip>
                    {{ tooltip2 }}
                  </div>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-window-item>
   
    </v-window>
  </v-container>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      qtdTestes: 1,
      tab: "teste1",
      tooltip1: " Aluno acertou a questão.",
      tooltip2: " Aluno errou a questão.",

      testes_org: [],
    };
  },

  props: {
    listaTestes: {
      type: Array,
      required: true,
      default: [],
    },
  },

  watch: {
    // Observa mudanças em `listaDeAlunos`
  },

  created() {
    this.qtdTestes = this.listaTestes.length; //Obtendo o total de testes.
    console.log(this.listaTestes);
    this.organizaTestes();
  },

  mounted() {},

  methods: {
    printaTestes() {
      console.log(this.listaTestes);
      console.log(`QTD DE TESTES : ${this.qtdTestes}`);
    },

    organizaTestes() {
      //Obtendo os dados armazenados nas planilhas...
      let i = 1;
      let aux = 5;
      if (this.listaTestes.length < 4) {
        aux = this.listaTestes.length;
        console.log(aux);
      }

      while (this.testes_org.length < aux) {
        if (
          this.listaTestes[this.listaTestes.length - i].status === "Finalizado"
        ) {
          let teste_p =
            this.listaTestes[this.listaTestes.length - i].planilha_teste;
          this.testes_org.push(teste_p);
        }
        i++;
      }

      console.log(this.testes_org);
    },

    getHabilidadeDescricao(habilidadeCode) {
      const habilidades = {
        H01: "Reconhece letras do alfabeto.",
        H02: "Identifica o número de sílabas de uma palavra.",
        H03: "Reconhece letras reproduzidas com diferentes fontes e formatos.",
        H04: "Identifica elementos sonoros (sílaba, rima, fonema) em palavras.",
        H05: "Lê palavras com diferentes padrões silábicos.",
        H06: "Reconhece informações explícitas em textos.",
        H07: "Analisa informações em gráficos, infográficos, tabelas e outros textos que apresentam recursos multissemióticos.",
        H08: "Identifica o assunto ou tema principal de um texto.",
        H09: "Reconhece a finalidade ou o objetivo de um texto.",
        H10: "Infere informações em textos de diferentes gêneros.",
        H11: "Estabelece relações de causa e consequência em textos de diferentes gêneros.",
      };

      return habilidades[habilidadeCode] || "Habilidade desconhecida";
    },
  },
};
</script>

<style>
.text-left {
  font-size: 1rem;
  font-weight: bold !important;
}

.cor-padrao {
  color: black;
  font-size: 1rem;
  font-weight: 500;
  padding-left: 1vw !important;
}

.cor-acerto {
  color: #1a7a11;
  font-size: 1rem;

  font-weight: 500;
}

.cor-erro {
  color: #ef2d2d;
  font-size: 1rem;

  font-weight: 500;
}

.info-btn {
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #1e3892;
  color: #fff;
  margin-left: 25vw !important;
}

.t-text {
  font-size: 1rem;
}

.tooltip1Teste {
  color: #fff !important;
}
</style>
