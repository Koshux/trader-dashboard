<template>
  <Line
    id="chart-container"
    size="lg"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import {
  Chart as ChartJS,
  registerables
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

onBeforeMount(() => {
  ChartJS.register(...registerables)
})
</script>
