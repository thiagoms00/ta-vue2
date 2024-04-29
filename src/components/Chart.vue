<template>
  <div>
    <canvas ref="chart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: this.chartData,
        options: {
          plugins: {
            legend: {
              position: 'right', // Define a posição da legenda para a direita
              align: 'start', // Alinha a legenda no início da área reservada para ela
              labels: {
                padding: 20, // Adiciona um espaçamento entre os itens da legenda
                boxWidth: 20 // Define a largura das caixas de cor na legenda
              }
            }
          },
          scales: {
            x: {
              display: false // Oculta a escala x
            },
            y: {
              display: false // Oculta a escala y
            }
          }
        }
      });
    }
  },
  watch: {
    chartData(newData) {
      this.chart.data = newData;
      this.chart.update();
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
</script>