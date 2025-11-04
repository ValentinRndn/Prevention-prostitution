<template>
  <div class="traffic-sources-chart bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Sources de trafic</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="mt-4 space-y-2">
      <div v-for="(source, index) in sources" :key="source.source" class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: colors[index] }"></div>
          <span class="font-medium capitalize">{{ source.source }}</span>
        </div>
        <span class="text-gray-600">{{ source.users }} ({{ source.percentage }}%)</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'TrafficSourcesChart',
  components: { Doughnut },
  props: {
    sources: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      colors: [
        '#f1b04c', // doré foncé
        '#f5c77e', // doré clair
        '#d4a159', // bronze
        '#c89858', // marron doré
        '#e6c89c', // beige doré
      ]
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.sources.map(s => s.source.charAt(0).toUpperCase() + s.source.slice(1)),
        datasets: [
          {
            data: this.sources.map(s => s.users),
            backgroundColor: this.colors.slice(0, this.sources.length),
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.traffic-sources-chart {
  border: 1px solid #e5e7eb;
}
</style>
