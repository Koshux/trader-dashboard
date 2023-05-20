<template>
  <div>
    <canvas id="chartContainer"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
// import Chart from 'chart.js'

// const chartInstance = ref<HTMLElement>()
// const route = useRoute()

onMounted(() => {
  // const ctx = document.getElementById('chartContainer')
  // chartInstance.value = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         // ...
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         // ...
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // })
  // if (chartContainer.value) {
  //   chartContainer.value.appendChild(route.meta.chart)
  // }
})
</script>
