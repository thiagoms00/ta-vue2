<template>
    <div v-if="data" class="chart-container d-flex justify-center">
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);
  
  export default {
    name: "ChartNivel",
    props: {
      data: {
        type: Array, // Ajuste para array para refletir os dados de uma turma
        required: true,
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.chart.getContext("2d");
  
        const labels = [
          "Habilidade 1", "Habilidade 2", "Habilidade 3", "Habilidade 4",
          "Habilidade 5", "Habilidade 6", "Habilidade 7", "Habilidade 8",
          "Habilidade 9", "Habilidade 10", "Habilidade 11"
        ];
  
        this.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Desempenho da Turma",
                data: this.data,
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
                borderColor: "rgba(54, 162, 235, 1)", // Blue
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                position: "top",
                labels: {
                  padding: 15,
                  boxWidth: 10,
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const value = tooltipItem.raw;
                    return `Acertos: ${value}%`;
                  },
                  title: function (tooltipItems) {
                    return tooltipItems[0].label;
                  },
                },
                backgroundColor: "rgba(0,0,0,0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#ddd",
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
                max: 100, // Percentual máximo
              },
            },
          },
        });
      },
    },
    watch: {
      data(newData) {
        this.chart.data.datasets[0].data = newData;
        this.chart.update();
      },
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
  };
  </script>
  
  <style>
  .chart-container {
    width: 100%;
    height: 450px; /* Ajuste a altura conforme necessário */
    max-width: 600px; /* Opcional: Defina uma largura máxima */
    margin: 0 auto; /* Centralize o gráfico horizontalmente */
  }
  </style>
  