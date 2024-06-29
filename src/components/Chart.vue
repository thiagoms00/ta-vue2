<!-- Chart.vue -->
<template>
  <div>
    <canvas ref="chart" width="350" height="350"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'Chart',
  props: {
    data: {
      type: Array,
      required: true
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08', 'H09', 'H10', 'H11'],
          datasets: [{
            label: 'Dataset',
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
        },
        options: {
          plugins: {
            legend: {
              title: {
                display: true,
                text: 'HABILIDADES',
              },
              position: 'left',
              align: 'center',
              labels: {
                padding: 15,
                boxWidth: 10,
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },

        }
      });
    }
  },
  watch: {
    data(newData) {
      this.chart.data.datasets[0].data = newData;
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
