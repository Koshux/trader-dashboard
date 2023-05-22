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
        shadow="always"
        style="border-bottom: none;"
      >
        <template #header>
          <!-- I want to create the card-header with a title and subtitle. The title will show the flags of the firstCurrency and secondCurrency selected. The subtitle which is below the flags title will show the currency pair on one side and the price difference and percentage on the right. -->
          <div class="card-header">
            <div class="card-header-title">
              <span class="card-header-title-flag">
                <!-- <CurrencyFlag currency="USD" size="xl" /> -->
                <!-- <country-flag country='it' size='sm'/> -->
                Flag 1
              </span>
              <span class="card-header-title-flag">
                <!-- <CurrencyFlag currency="EUR" size="xl" /> -->
                Flag 2
              </span>

              <span class="card-header-title-advert">
                Forex.com
              </span>

            </div>

            <div class="card-header-subtitle">
              <div class="card-header-subtitle-currency-pair">
                {{ currencyPair }}
              </div>

              <div class="card-header-subtitle-price">
                <span class="card-header-subtitle-price-value">{{ currentPriceFormatted }}</span>

                <div class="card-header-subtitle-price-difference">
                  <span class="card-header-subtitle-price-difference-value">{{ priceDifferenceFormatted }}</span>
                  <span class="card-header-subtitle-price-difference-percentage">({{ priceDifferencePercentageFormatted }})</span>
                </div>
              </div>
            </div>
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

const currentPrice = ref(1.234567)
const priceDifference = ref(0.123456)
const priceDifferencePercentage = ref(0.123456)

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

// Create a computed to format the currentPrice to be using 6 decimal places and to be in the currency of the secondCurrency selected using Intl.NumberFormat
const currentPriceFormatted: ComputedRef<string | undefined> = computed(() => {
  if (!form.value.secondCurrency) return

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: form.value.secondCurrency,
    minimumFractionDigits: 6
  }).format(currentPrice.value)
})

// Create a computed to format the priceDifference by calculating the difference between the firstCurrency and secondCurrency and then formatting it to be using 6 decimal places not with Intl.NumberFormat but with toFixed(6)
const priceDifferenceFormatted: ComputedRef<string> = computed(() => {
  return priceDifference.value.toFixed(6)
})

// Create a computed to format the priceDifferencePercentage by calculating the difference between the firstCurrency and secondCurrency and then formatting it to be as a percentage out of 100%
const priceDifferencePercentageFormatted: ComputedRef<string> = computed(() => {
  // Calculate the priceDifferencePercentage by dividing the priceDifference by the currentPrice and then multiplying it by 100
  const percentage = (priceDifference.value / currentPrice.value) * 100
  return percentage.toFixed(6)
})

const currencyPair: ComputedRef<string> = computed(() => {
  return `${form.value.firstCurrency}/${form.value.secondCurrency}`
})

const getCurrencyPair = (firstCurrency: string, secondCurrency: string) => {
  return `${firstCurrency}/${secondCurrency}`
}

// Create a function which will request the traderapi.com API to get the live_currencies_list to be used by the firstCurrency and secondCurrency select dropdowns
const getLiveCurrenciesList = () => {
  // const url = `/v1/live_currencies_list?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}`
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     form.firstCurrency.value = data.currencies
  //     form.secondCurrency.value = data.currencies
  //   })
}

const getCurrencyPairPrice = (firstCurrency: string, secondCurrency: string) => {
  // const currencyPair = getCurrencyPair(firstCurrency, secondCurrency)
  // const url = `/v1/live?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}&currency=${currencyPair}`
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     currentPrice.value = data.quotes[0].mid
  //     priceDifference.value = data.quotes[0].change
  //     priceDifferencePercentage.value = data.quotes[0].change_pct
  //   })

  // Use Intl.NumberFormat to format the currentPrice to be using 6 decimal places and to be in the currency of the secondCurrency selected
  currentPrice.value = 1.234567
  priceDifference.value = 0.123456
  priceDifferencePercentage.value = 0.123456
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
}

.el-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
}

.box-card {
  border-radius: 4px;
  min-height: 36px;
  padding: 30px;
  width: 100%;
}

.card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header-title {
  display: flex;
  align-items: center;
}

.card-header-title-separator {
  margin: 0 10px;
}

.card-header-currency-pair {
  font-size: 24px;
  font-weight: 600;
}

.card-header-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-subtitle-currency-pair {
  font-size: 24px;
  font-weight: 600;
}

.card-header-subtitle-price {
  display: flex;
  flex-direction: column;
}

.card-header-subtitle-price-value {
  font-size: 24px;
  font-weight: 600;
}

.card-header-subtitle-price-difference {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #00C48C;
}

.card-header-subtitle-price-difference-value {
  font-weight: bold;
}

.card-header-subtitle-price-difference-percentage {
  font-weight: bold;
}

.card-header-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-subtitle-currency-pair {
  font-size: 24px;
  font-weight: 600;
}

.card-header-subtitle-price-difference {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #00C48C;
}

.card-header-subtitle-price-difference-value {
  font-weight: bold;
}

.card-header-subtitle-price-difference-percentage {
  font-weight: bold;
}

.card-header-title-flag {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.card-header-title-advert {
  font-size: 12px;
  color: #877F7F;
  font-weight: bold;
}
</style>
