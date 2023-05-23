<template>
  <el-row :gutter="10">
    <el-col class="grid-content" :xs="24" :md="8" :lg="4">
      <el-form :model="dashboardStore.form">
        <el-form-item>
          <el-select v-model="dashboardStore.form.firstCurrency" placeholder="Select currency">
            <el-option
              v-for="item in dashboardStore.currencyPairs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="dashboardStore.form.secondCurrency" placeholder="Select currency">
            <el-option
              v-for="item in dashboardStore.currencyPairs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col class="grid-content" :xs="24" :md="16" :lg="20">
      <el-card
        class="box-card"
        shadow="always"
        style="border-bottom: none;"
      >
        <template #header>
          <TheDashboardCardHeader />
        </template>

        <TheDashboardChart />
        <TheDashboardLegend />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheDashboardChart from '@/components/TheDashboardChart.vue'
import TheDashboardCardHeader from '@/components/TheDashboardCardHeader.vue'
import TheDashboardLegend from '@/components/TheDashboardLegend.vue'
import { useDashboardStore } from '@/stores/dashboard'
import { onMounted, watch } from 'vue'

const dashboardStore = useDashboardStore()

onMounted(async () => {
  await dashboardStore.getLiveCurrenciesList()
})

watch(() => dashboardStore.currencyPair, async () => {
  await dashboardStore.getTimeseries(
    dashboardStore.form.firstCurrency,
    dashboardStore.form.secondCurrency
  )
})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
}

.box-card {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
  width: 100%;
}
</style>
