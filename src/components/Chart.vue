<template>
  <div>
    <canvas ref="chart" width="350" height="350"></canvas>
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
    },
    chartId: {
      type: String,
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
        type: 'doughnut',
        data: this.chartData,
        options: {
          plugins: {
            legend: {
              title: {
                display: true,
                text: 'HABILIDADES',
                
              },
              position: 'left', // Define a posição da legenda para a direita
              align: 'center', // Alinha a legenda no início da área reservada para ela
              labels: {
                padding: 10, // Adiciona um espaçamento entre os itens da legenda
                boxWidth: 20, // Define a largura das caixas de cor na legenda
              }
            },
            

          },
          scales: {
            x: {
              display: false // Oculta a escala x
            },
            y: {
              display: false // Oculta a escala y
            }
          },
          layout:{
            padding:10
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