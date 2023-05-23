<template>
  <!-- Create 5 buttons that will display in the order as follows: 15M, 1H, 1D, 1W, 1M -->
  <div class="card-header-title-buttons">
    <el-button
      :type="buttonType"
      size="small"
      @click="selectTimeFrame(dashboardStore.timeFrames.fifteenMinutes.value)"
    >
      {{ dashboardStore.timeFrames.fifteenMinutes.label }}
    </el-button>
    <el-button
      :type="buttonType"
      size="small"
      @click="selectTimeFrame(dashboardStore.timeFrames.oneHour.value)"
    >
      {{ dashboardStore.timeFrames.oneHour.label }}
    </el-button>
    <el-button
      :type="buttonType"
      size="small"
      @click="selectTimeFrame(dashboardStore.timeFrames.oneDay.value)"
    >
      {{ dashboardStore.timeFrames.oneDay.label }}
    </el-button>
    <el-button
      :type="buttonType"
      size="small"
      @click="selectTimeFrame(dashboardStore.timeFrames.oneWeek.value)"
    >
      {{ dashboardStore.timeFrames.oneWeek.label }}
    </el-button>
    <el-button
      :type="buttonType"
      size="small"
      @click="selectTimeFrame(dashboardStore.timeFrames.oneMonth.value)"
    >
      {{ dashboardStore.timeFrames.oneMonth.label }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useDashboardStore } from '@/stores/dashboard'
import { computed, type ComputedRef } from 'vue';

const dashboardStore = useDashboardStore()

const selectTimeFrame = (timeFrame: string) => {
  dashboardStore.selectedTimeFrame = timeFrame
}

const buttonType: ComputedRef<string> = computed(() => {
  // Go through each time frame and check if it is selected
  // If it is selected, return primary, otherwise return default
  for (const timeFrame in dashboardStore.timeFrames) {
    if (dashboardStore.timeFrames[timeFrame] === dashboardStore.selectedTimeFrame) {
      return 'primary'
    }
  }

  return 'default'
})
</script>

<style scoped>
.card-header-title-buttons {
  display: flex;
  align-items: center;
}
</style>
