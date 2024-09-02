<!-- Chart.vue -->
<template>
  <div class="chart-container d-flex justify-center ma-0">
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
                "rgba(34, 139, 34, 0.2)",
                "rgba(153, 102, 255, 0.2)", // Purple
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)", // Red
                "rgba(54, 162, 235, 1)", // Blue
                "rgba(255, 206, 86, 1)", // Yellow
                "rgba(34, 139, 34, 1)",
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
              title: {},
              position: "left",
              align: "center",
              labels: {
                padding: 10,
                boxWidth: 15,
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

                  // Busca a descrição com base no índice
                  const index = tooltipItem.dataIndex;
                  const description = descriptions[index];
                  const value = tooltipItem.raw;

                  // Define um limite de comprimento para cada linha
                  const maxLength = 50;
                  const words = description.split(" ");
                  let line = "";
                  const lines = [];

                  words.forEach((word) => {
                    if (line.length + word.length + 1 <= maxLength) {
                      line += (line ? " " : "") + word;
                    } else {
                      lines.push(line);
                      line = word;
                    }
                  });

                  // Adiciona a última linha
                  if (line) {
                    lines.push(line);
                  }

                  // Adiciona o valor de alunos na última linha
                  lines.push(`${value} alunos`);

                  return lines;
                },
                title: function (tooltipItems) {
                  const total = tooltipItems[0].dataset.data.reduce(
                    (sum, value) => sum + value,
                    0
                  );
                  const value = tooltipItems[0].raw;
                  const percentage = ((value / total) * 100).toFixed(2); // Calcula a porcentagem com 2 casas decimais

                  return `${tooltipItems[0].label}: ${percentage}% dos alunos`;
                },
              },
              backgroundColor: "rgba(0,0,0,0.7)", // Cor de fundo da tooltip
              titleColor: "#fff", // Cor do título do texto
              bodyColor: "#fff", // Cor do corpo do texto
              borderColor: "#ddd", // Cor da borda da tooltip
              borderWidth: 1, // Largura da borda da tooltip
              position: "nearest",
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
  overflow: visible;
  padding: 20px;
}
</style>
