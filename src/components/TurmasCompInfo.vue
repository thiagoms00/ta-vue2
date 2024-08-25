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
          <v-btn class="btn-start" @click="">TESTE</v-btn>
        </v-sheet>
  
        <v-sheet class="main-sheet">
            
        </v-sheet>
  
        <v-divider class="mb-4"> </v-divider>
  
      
  
        
  
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
  import ChartNivel from "@/components/ChartNivel.vue";
  import ComparaHabilidades from "@/components/ComparaHabilidades.vue";
  
  export default {
    components: {
      ChartNivel,
      ComparaHabilidades
    },
  
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
        this.getMaiorNivel(this.listaTurma);
      },
    },
  
    created() {},
  
    mounted() {
      this.listaTurma = this.listaDeAlunos;
      this.gerarDadosGrafico();
    },
  
    methods: {
      getMaiorNivel(listaTurma) {
        for (let i = 0; i < listaTurma.length; i++) {
          console.log();
        }
      },

      /* Modificar depois ,permitindo até 4 turmas */

     
      
  
     
    }
  };
  </script>
  