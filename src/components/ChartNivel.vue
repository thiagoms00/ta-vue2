<!-- Chart.vue -->
<template>
  <div class="chart-container">
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
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Nível 1", "Nível 2", "Nível 3", "Nível 4", "Nível 5"],
          datasets: [
            {
              label: "Dataset",
              data: this.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // Red
                "rgba(54, 162, 235, 0.2)", // Blue
                "rgba(255, 206, 86, 0.2)", // Yellow
                "rgba(75, 192, 192, 0.2)", // Green
                "rgba(153, 102, 255, 0.2)", // Purple
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)", // Red
                "rgba(54, 162, 235, 1)", // Blue
                "rgba(255, 206, 86, 1)", // Yellow
                "rgba(75, 192, 192, 1)", // Green
                "rgba(153, 102, 255, 1)", // Purple
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              title: {
                display: true,
                text: "Nível",
              },
              position: "left",
              align: "center",
              labels: {
                padding: 15,
                boxWidth: 10,
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  // Descrições dos níveis
                  const descriptions = [
                    "O aluno está desenvolvendo habilidades de reconhecimento de letras.",
                    "O aluno reconhece letras, e está desenvolvendo habilidades de decodificação de palavras.",
                    "O aluno lê palavras e identifica informações explícitas em textos curtos de léxico e sintaxe simples.",
                    "O aluno lê pequenos textos, recuperando informações explícitas e começa a identificar seu tema ou assunto principal.",
                    "Alfabetização Consolidada.",
                  ];

                  const label = tooltipItem[0].label;
                  const index = label.indexOf(label);

                  return descriptions[index-1]

                },
                title: function (tooltipItem) {
                  return `${tooltipItem[0].label}`;
                },
              },
              backgroundColor: "rgba(0,0,0,0.7)", // Cor de fundo da tooltip
              titleColor: "#fff", // Cor do título do texto
              bodyColor: "#fff", // Cor do corpo do texto
              borderColor: "#ddd", // Cor da borda da tooltip
              borderWidth: 1, // Largura da borda da tooltip
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
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
  height: 450px; /* Adjust the height as needed */
  max-width: 600px; /* Optional: Set a max-width if you want to limit the size */
  margin: 0 auto; /* Center the chart horizontally */
}
</style>
