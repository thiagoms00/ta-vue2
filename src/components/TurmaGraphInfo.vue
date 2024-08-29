<template>
    <v-row>
      <v-col cols="12">
        <v-sheet class="d-flex justify-center">
        <ChartNivel :data="dadosGraph" />
      </v-sheet>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import ChartNivel from "@/components/ChartNivel.vue";
  
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
      gerarDadosGrafico() {
      // Inicializa o array para armazenar a contagem de cada nível
      const niveis = [0, 0, 0, 0, 0]; // Índices 0-4 correspondem aos níveis 1-5
      
      // Itera sobre a lista de alunos
      this.listaDeAlunos.forEach(aluno => {
        const resultadoFinal = this.getResultadoFinal(aluno);
        if (resultadoFinal !== "-" && resultadoFinal !== null) {
          niveis[resultadoFinal - 1] += 1;
        }
      });

      // Define os dados para o gráfico
      this.dadosGraph = niveis;
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

     
      
  
     
    }
  };
  </script>
  