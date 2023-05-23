<template>
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

<script lang="ts" setup>
import { useDashboardStore } from '@/stores/dashboard'
import { computed } from 'vue'
const dashboardStore = useDashboardStore()

const currencyPair = computed(() => dashboardStore.currencyPair)
const currentPriceFormatted = computed(() => dashboardStore.currentPriceFormatted)
const priceDifferenceFormatted = computed(() => dashboardStore.priceDifferenceFormatted)
const priceDifferencePercentageFormatted = computed(() => dashboardStore.priceDifferencePercentageFormatted)
</script>

<style scoped>
.card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header-title {
  display: flex;
  align-items: center;
}

.card-header-subtitle-currency-pair {
  font-size: 10px;
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
