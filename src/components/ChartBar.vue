<template>
    <div>
      <canvas ref="myChart" :width="width" :height="height"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  export default {
    name: 'MyChart',
    props: {
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 300
      },
      data: {
      type: Array,
      required: true
    }
    },
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      // Dados e configuração do gráfico
      const labels = ['H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08', 'H09', 'H10', 'H11'];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Atividades por Habilidade',
          data: this.data,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',  // Red
              'rgba(54, 162, 235, 0.2)',  // Blue
              'rgba(255, 206, 86, 0.2)',  // Yellow
              'rgba(75, 192, 192, 0.2)',  // Green
              'rgba(153, 102, 255, 0.2)', // Purple
              'rgba(255, 159, 64, 0.2)',  // Orange
              'rgba(201, 203, 207, 0.2)', // Grey
              'rgba(255, 99, 71, 0.2)',   // Tomato
              'rgba(144, 238, 144, 0.2)', // Light Green
              'rgba(173, 216, 230, 0.2)', // Light Blue
              'rgba(221, 160, 221, 0.2)'  // Plum
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',    // Red
              'rgba(54, 162, 235, 1)',    // Blue
              'rgba(255, 206, 86, 1)',    // Yellow
              'rgba(75, 192, 192, 1)',    // Green
              'rgba(153, 102, 255, 1)',   // Purple
              'rgba(255, 159, 64, 1)',    // Orange
              'rgba(201, 203, 207, 1)',   // Grey
              'rgba(255, 99, 71, 1)',     // Tomato
              'rgba(144, 238, 144, 1)',   // Light Green
              'rgba(173, 216, 230, 1)',   // Light Blue
              'rgba(221, 160, 221, 1)'    // Plum
            ],
          borderWidth: 1
        }]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false
      };
  
      // Registra todos os componentes do Chart.js
      Chart.register(...registerables);
  
      // Renderiza o gráfico
      this.chart = new Chart(this.$refs.myChart, {
        type: 'bar',
        data: data,
        options: options
      });
    },
    beforeUnmount() {
      // Destrói o gráfico ao desmontar o componente para liberar recursos
      if (this.chart) {
        this.chart.destroy();
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  </style>
  