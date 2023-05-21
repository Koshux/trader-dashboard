<template>
  <el-row :gutter="10">
    <el-col class="grid-content" :xs="24" :md="8" :lg="4">
      <el-form :model="form">
        <el-form-item>
          <el-select v-model="form.firstCurrency" placeholder="Select currency">
            <el-option
              v-for="item in currencyPairs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.secondCurrency" placeholder="Select currency">
            <el-option
              v-for="item in currencyPairs"
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
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <!-- I want to show the first and second currency refs which are the currency-flag from the library transferwise/currency-flags -->
            <span class="card-header-title">
              <currency-flag :currency="form.firstCurrency" />
              <span class="card-header-title-separator">/</span>
              <currency-flag :currency="form.secondCurrency" />

              <!-- I want to show the currency pair computed ref -->
              <span class="card-header-title-separator">{{ currencyPair }}</span>
            </span>

            <!-- I want to show the current trading price for the currency pairs from tradermade.com -->
            <span class="card-header-value">{{ currentPrice }}</span>

            <span class="card-header-difference">
              <span class="card-header-difference-value">{{ priceDifference }}</span>
              <!-- +0.0000 -->
              <span class="card-header-difference-percentage">({{ priceDifferencePercentage }})</span>
              <!-- +0.00% -->
            </span>
          </div>
        </template>

        <LineChart />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import { computed, reactive, ref, type ComputedRef, onMounted } from 'vue'
import type { CurrencyPair } from '@/types/CurrencyPair'
// import CurrencyFlag from 'currency-flags'

const currentPrice = ref(0)
const priceDifference = ref(0)
const priceDifferencePercentage = ref(0)

const currencyPairs: CurrencyPair[] = reactive([
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'USD', label: 'USD' },
  { value: 'USD', label: 'USD' },
  { value: 'USD', label: 'USD' },
  { value: 'AUD', label: 'AUD' },
  { value: 'NZD', label: 'NZD' }
])

const form = ref({
  firstCurrency: '',
  secondCurrency: ''
})

const currencyPair: ComputedRef<string> = computed(() => {
  return `${form.value.firstCurrency}/${form.value.secondCurrency}`
})

const getCurrencyPair = (firstCurrency: string, secondCurrency: string) => {
  return `${firstCurrency}/${secondCurrency}`
}

const getCurrencyPairPrice = (firstCurrency: string, secondCurrency: string) => {
  const currencyPair = getCurrencyPair(firstCurrency, secondCurrency)
  const url = `https://api.tradermade.com/v1/live?api_key=${process.env.VUE_APP_TRADERMADE_API_KEY}&currency=${currencyPair}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentPrice.value = data.quotes[0].mid
      priceDifference.value = data.quotes[0].change
      priceDifferencePercentage.value = data.quotes[0].change_pct
    })
}

onMounted(() => {
  getCurrencyPairPrice(form.value.firstCurrency, form.value.secondCurrency)
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
.box-card {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
}
</style>
