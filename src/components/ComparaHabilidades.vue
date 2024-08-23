<template>
  <div v-if="resultado">
    <ChartComparaHabilidades :data="resultado" />
  </div>
  
</template>

<script>
import ChartComparaHabilidades from "@/components/ChartComparaHabilidades.vue";
import axios from "axios";

export default {
  components: {
    ChartComparaHabilidades,
  },

  data() {
    return {
      resultado: null, // Objeto para armazenar o resultado da requisição
    };
  },

  props: {
    // Suas props aqui
  },

  watch: {
    // Monitora mudanças na variável `resultado`
    resultado(newResultado) {
      if (newResultado) {
        // Lógica adicional, se necessário
        console.log("Dados atualizados:", newResultado);
      }
    },
  },

  created() {
    // Requisição Axios rodando assim que o componente for criado
    const data = {}; // Substitua com os dados apropriados para a requisição

    axios({
      url: "https://ta-back.onrender.com/professores/returnPercentHabTurmas",
      data,
      method: "POST",
    })
      .then((response) => {
        this.resultado = response.data; // Armazena o resultado no objeto 'resultado'
        console.log(this.resultado);
      })
      .catch((error) => {
        // Tratar erros aqui
        console.error(error);
      });
  },
};
</script>
