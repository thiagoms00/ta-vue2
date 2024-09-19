<template>
  <div v-if="data" class="d-flex justify-center">
    <v-row class="d-flex justify-center">
      <v-col cols="10">
        <canvas ref="chart"></canvas>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "ChartHabilidade",
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

      // Extraindo as labels das habilidades
      const labels = Object.keys(this.data);

      // Calculando o número de alunos em cada faixa
      const faixa0_30 = labels.map((label) => this.data[label]["0-30%"] || 0);
      const faixa30_60 = labels.map((label) => this.data[label]["30-60%"] || 0);
      const faixa60_90 = labels.map((label) => this.data[label]["60-90%"] || 0);
      const faixa90_100 = labels.map(
        (label) => this.data[label]["90-100%"] || 0
      );

      // Calculando o total de alunos para cada habilidade
      const totals = labels.map(
        (label) =>
          faixa0_30[labels.indexOf(label)] +
          faixa30_60[labels.indexOf(label)] +
          faixa60_90[labels.indexOf(label)] +
          faixa90_100[labels.indexOf(label)]
      );

      // Calculando a porcentagem de cada faixa
      const faixa0_30_percent = faixa0_30.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa30_60_percent = faixa30_60.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa60_90_percent = faixa60_90.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa90_100_percent = faixa90_100.map(
        (value, index) => (value / totals[index]) * 100
      );

      // Configurando o gráfico
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "0-30%",
              data: faixa0_30_percent,
              backgroundColor: "rgba(255, 159, 64, 0.5)",
              dataNominal: faixa0_30, // Armazena os valores nominais
            },
            {
              label: "30-60%",
              data: faixa30_60_percent,
              backgroundColor: "rgba(255, 206, 86, 0.5)",
              dataNominal: faixa30_60,
            },
            {
              label: "60-90%",
              data: faixa60_90_percent,
              backgroundColor: "rgba(144, 238, 144, 0.5)",
              dataNominal: faixa60_90,
            },
            {
              label: "90-100%",
              data: faixa90_100_percent,
              backgroundColor: "rgba(0, 128, 0, 0.5)",
              dataNominal: faixa90_100,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
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
                  console.log(tooltipItem);
                  const posi = tooltipItem.dataIndex
                  // Obtém o valor da faixa e a faixa correspondente
                  const datasetIndex = tooltipItem.datasetIndex;
                  const datasetLabel = tooltipItem.dataset.label;
                  const dataValue = tooltipItem.dataset.dataNominal[posi]; // Número de alunos
                  const label = tooltipItem.label;

                  // Formata a tooltip para mostrar a quantidade de alunos
                  return `${datasetLabel}: ${dataValue} alunos em ${label}`;
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
              stacked: true, // Empilhar as colunas no eixo X
            },
            y: {
              beginAtZero: true,
              stacked: true, // Empilhar as colunas no eixo Y
              max: 100, // As colunas sempre somam até 100%
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          },
        },
      });
    },
  },
  watch: {
    data(newData) {
      const labels = Object.keys(newData);

      // Atualizar dados com base nos novos dados
      const faixa0_30 = labels.map((label) => newData[label]["0-30%"] || 0);
      const faixa30_60 = labels.map((label) => newData[label]["30-60%"] || 0);
      const faixa60_90 = labels.map((label) => newData[label]["60-90%"] || 0);
      const faixa90_100 = labels.map((label) => newData[label]["90-100%"] || 0);

      // Calculando o total de alunos para cada habilidade
      const totals = labels.map(
        (label) =>
          faixa0_30[labels.indexOf(label)] +
          faixa30_60[labels.indexOf(label)] +
          faixa60_90[labels.indexOf(label)] +
          faixa90_100[labels.indexOf(label)]
      );

      // Calculando a porcentagem de cada faixa
      const faixa0_30_percent = faixa0_30.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa30_60_percent = faixa30_60.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa60_90_percent = faixa60_90.map(
        (value, index) => (value / totals[index]) * 100
      );
      const faixa90_100_percent = faixa90_100.map(
        (value, index) => (value / totals[index]) * 100
      );

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = faixa0_30_percent;
      this.chart.data.datasets[1].data = faixa30_60_percent;
      this.chart.data.datasets[2].data = faixa60_90_percent;
      this.chart.data.datasets[3].data = faixa90_100_percent;

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
