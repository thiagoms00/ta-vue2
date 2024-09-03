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
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext("2d");

      const labels = ["Nível 1", "Nível 2", "Nível 3", "Nível 4", "Nível 5"];

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Turma 1",
              data: this.data.turma1,
              backgroundColor: "rgba(255, 99, 132, 0.2)", // Red
              borderColor: "rgba(255, 99, 132, 1)", // Red
              borderWidth: 1,
            },
            {
              label: "Turma 2",
              data: this.data.turma2,
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
                  const index = tooltipItem.dataIndex;
                  const turma = tooltipItem.dataset.label;
                  const value = tooltipItem.raw;

                  return `${turma}: ${value}% dos alunos`;
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
              min: 0, // Valor mínimo
              max: Math.max(...this.data.turma1, ...this.data.turma2) + 10, // Valor máximo dinamicamente ajustado
              
            },
          },
        },
      });
    },
  },
  watch: {
    data(newData) {
      this.chart.data.datasets[0].data = newData.turma1;
      this.chart.data.datasets[1].data = newData.turma2;
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
