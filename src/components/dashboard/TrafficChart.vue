<template>
  <div class="traffic-chart bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: 'TrafficChart',
  components: { Line },
  props: {
    title: {
      type: String,
      default: 'Trafic sur 30 jours'
    },
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    chartData() {
      const labels = this.data.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
      });

      return {
        labels,
        datasets: [
          {
            label: 'Utilisateurs',
            data: this.data.map(d => d.users),
            borderColor: '#f1b04c',
            backgroundColor: 'rgba(241, 176, 76, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Pages vues',
            data: this.data.map(d => d.pageViews),
            borderColor: '#f5c77e',
            backgroundColor: 'rgba(245, 199, 126, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      };
    }
  }
};
</script>

<style scoped>
.traffic-chart {
  border: 1px solid #e5e7eb;
}
</style>
