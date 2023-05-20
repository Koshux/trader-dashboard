<template>
  <Line
    id="chart-container"
    :options="chartOptions"
    :data="chartData"
  />
  Hi.
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  // LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'


const chartData = ref({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
    ],
    borderWidth: 1
  }]
})

const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

onMounted(() => {
  ChartJS.register(
    CategoryScale,
    // LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
})
</script>
