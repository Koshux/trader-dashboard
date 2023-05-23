import { computed, reactive, ref, type ComputedRef, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CurrencyPair } from '@/types/CurrencyPair'

export const useDashboardStore = defineStore('dashboard', () => {
  const currentPrice = ref(1.234567)
  const priceDifference = ref(0.123456)
  const priceDifferencePercentage = ref(0.123456)

  const currencyPairs: CurrencyPair[] = reactive([
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'USD', label: 'USD' },
    { value: 'AUD', label: 'AUD' },
    { value: 'NZD', label: 'NZD' }
  ])

  const firstCurrency = ref('')
  const secondCurrency = ref('')
  const selectedTimeFrame = ref('')

  const timeFrames = reactive({
    fifteenMinutes: { value: 'fifteenMinutes', label: '15m' },
    oneHour: { value: 'oneHour', label: '1h' },
    oneDay: { value: 'oneDay', label: '1d' },
    oneWeek: { value: 'oneWeek', label: '1w' },
    oneMonth: { value: 'oneMonth', label: '1M' }
  })

  const form = {
    get firstCurrency () {
      return firstCurrency.value
    },
    set firstCurrency (value: string) {
      firstCurrency.value = value
    },
    get secondCurrency () {
      return secondCurrency.value
    },
    set secondCurrency (value: string) {
      secondCurrency.value = value
    }
  }

  const currentPriceFormatted: ComputedRef<string | undefined> = computed(() => {
    if (!form.secondCurrency) return

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: form.secondCurrency,
      minimumFractionDigits: 6
    }).format(currentPrice.value)
  })

  const priceDifferenceFormatted: ComputedRef<string> = computed(() => {
    return priceDifference.value.toFixed(6)
  })

  const priceDifferencePercentageFormatted: ComputedRef<string> = computed(() => {
    const percentage = (priceDifference.value / currentPrice.value) * 100
    return percentage.toFixed(6)
  })

  const currencyPair: ComputedRef<string> = computed(() => {
    return `${form.firstCurrency}/${form.secondCurrency}`
  })

  const getCurrencyPair = (firstCurrency: string, secondCurrency: string) => {
    return `${firstCurrency}/${secondCurrency}`
  }

  const getLiveCurrenciesList = async () => {
    // const url = `/api/live_currencies_list?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}`
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     ciurrencyPairs.value = data.currencies
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
  }

  const getCurrencyPairPrice = (firstCurrency: string, secondCurrency: string) => {
    console.log('getCurrencyPairPrice')
    // const currencyPair = getCurrencyPair(firstCurrency, secondCurrency)
    // const url = `/api/live?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}&currency=${currencyPair}`
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


  watch([form.firstCurrency, form.secondCurrency, selectedTimeFrame], () => {
    console.log('watch')
    if (form.firstCurrency && form.secondCurrency && selectedTimeFrame) {
      getCurrencyPairPrice(form.firstCurrency, form.secondCurrency)
    }
  })

  return {
    currentPrice,
    priceDifference,
    priceDifferencePercentage,
    currencyPairs,
    form,
    currentPriceFormatted,
    priceDifferenceFormatted,
    priceDifferencePercentageFormatted,
    currencyPair,
    getCurrencyPair,
    getLiveCurrenciesList,
    getCurrencyPairPrice,
    timeFrames,
    selectedTimeFrame
  }
})
