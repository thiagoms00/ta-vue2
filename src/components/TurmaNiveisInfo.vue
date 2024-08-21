<template>
    <v-row>
      <v-col cols="12">
        <!-- Mensagem de Seleção de Turma -->
  
        <v-sheet
          class="rounded-t-lg elevation-2 pa-2 d-flex align-center"
          color="#1E3892"
          height="48"
        >
          <v-icon icon="mdi-ballot"> </v-icon>
          <div class="text-button ml-2">Níveis de Aprendizado</div>
        </v-sheet>
  
        <v-sheet>
          <v-table v-if="isAtivo">
            <thead>
              <tr>
                <th class="pa-0" style="width: 30%">
                  <div class="text-center text-overline">Aluno</div>
                </th>
                <th class="pa-0" style="width: 10%">
                  <div class="text-center text-overline">Nível</div>
                </th>
                <th class="pa-0" style="width: 60%">
                  <div class="text-center text-overline">Descrição</div>
                </th>

                <!-- <th class="pa-0" style="width: 80%">
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
                        Estrato {{ i }}
                      </div>
                    </v-col>
                  </v-row>
                </th> -->
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="item in listaTurma" :key="item.name">
                <td class="pa-0" style="width: 25%">
                  <div class="text-center">
                    {{ item.user["nome"] }}
                  </div>
                </td>

                <td class="pa-0" style="width: 15%">
                  <div class="text-center">
<!--                     {{ item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === "Finalizado"? item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final : "-"}}
                      
 -->                  
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='0 - Reprovado'">1</p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='0 - Aprovado'">2</p>

                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='1 - Reprovado'">2</p>
        
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='1 - Aprovado'">3</p>
        
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='2 - Reprovado'">3</p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='2 - Aprovado'">4</p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='3 - Reprovado'">4</p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='3 - Aprovado'">5</p>
                  </div>
                </td>

                <td class="pa-0" style="width: 60%">
                  <div class="text-center">
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='0 - Reprovado'">
                         O aluno está desenvolvendo habilidades de reconhecimento de letras.
                    </p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='0 - Aprovado'">
                         O aluno reconhece letras, e está desenvolvendo habilidades de decodificação de palavras. 
                    </p>

                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='1 - Reprovado'">
                         O aluno reconhece letras, e está desenvolvendo habilidades de decodificação de palavras. 
                    </p>
        
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='1 - Aprovado'">
                         O aluno lê palavras e identifica informações explícitas em textos curtos de léxico e sintaxe simples.
                    </p>
        
                    <p v-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='2 - Reprovado'">
                         O aluno lê palavras e identifica informações explícitas em textos curtos de léxico e sintaxe simples.
                    </p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='2 - Aprovado'">
                         O aluno lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal
                    </p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='3 - Reprovado'">
                         O aluno lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal
                    </p>

                    <p v-else-if="item.listaDeTestes.length > 0 && item.listaDeTestes[item.listaDeTestes.length - 1].status === 'Finalizado' 
                    && item.listaDeTestes[item.listaDeTestes.length - 1].resultado_final==='3 - Aprovado'">
                         Alfabetização Consolidada
                    </p>
        
        
        
                  </div>
                </td>
              
              </tr>
            </tbody>
          </v-table>
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
        </div>
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
        melhoresResultados : [],
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
        this.getMaiorNivel(this.listaTurma)
      },
    },

    created (){
    },
  
    mounted() {
      this.listaTurma = this.listaDeAlunos;
    },
  
    methods: {

      getMaiorNivel(listaTurma){
        for(let i=0; i<listaTurma.length; i++){
            console.log()
        }
      },
  
      getColor(acertou) {
        return acertou ? "green-darken-3" : "deep-orange-darken-2";
      },
  
      getChipsForEstrato(estratoIndex, listaQuest) {
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
  