import { computed, reactive, ref, type ComputedRef, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { CurrencyPair } from '@/types/CurrencyPair'
import payloadLiveCurrencies from '@/stores/live-currencies-payload.json'
import payloadTimeSeries from '@/stores/timeseries-payload.json'
import type { TimeSeries } from '@/types/TimeSeries'
import type { Quote } from '@/types/Quote'
import { DateAndTime } from '@/enums/date-and-time'
import type { TimeFrame } from '@/types/TimeFrame'

export const useDashboardStore = defineStore('dashboard', () => {
  const apiQueryParamHourly = '&format=records&interval=hourly&period=1'
  const apiQueryParamMinute = '&format=records&interval=minute&period=15'

  const currentPrice = ref(0.000000)
  const startingPrice = ref(0.000000)
  const closingPrice = ref(0.000000)
  const priceDifference = ref(0.000000)
  const priceDifferencePercentage = ref(0.000000)

  const historicalPeriod: Ref<Quote[]> = ref([])
  const currencyPairs: Ref<CurrencyPair[]> = ref([])

  const firstCurrency = ref('')
  const secondCurrency = ref('')
  const selectedTimeFrame: Ref<TimeFrame> = ref({})

  const timeFrames: TimeFrame[] = [{
    end_date: new Date().toISOString().slice(0, 10),
    interval: DateAndTime.fifteenMinutesInterval as const,
    label: DateAndTime.fifteenMinutes as const,
    period: DateAndTime.fifteenMinutesPeriod as const,
    start_date: new Date(new Date().getMilliseconds() - 15 * DateAndTime.MS_PER_MINUTE)
      .toISOString()
      .slice(0, 10)
  }, {
    end_date: new Date().toISOString().slice(0, 10),
    interval: DateAndTime.oneHourInterval as const,
    label: DateAndTime.oneHour as const,
    period: DateAndTime.none as const,
    start_date: new Date(new Date().getMilliseconds() - 60 * DateAndTime.MS_PER_MINUTE)
      .toISOString()
      .slice(0, 10)
  }, {
    end_date: new Date().toISOString().slice(0, 10),
    interval: DateAndTime.oneDayInterval as const,
    label: DateAndTime.oneDay as const,
    period: DateAndTime.oneHourPeriod as const,
    start_date: () => {
      const date = new Date()

      return new Date(date.setMonth(date.getDate() - 1))
        .toISOString()
        .slice(0, 10)
    }
  }, {
    end_date: new Date().toISOString().slice(0, 10),
    interval: DateAndTime.oneWeekInterval as const,
    label: DateAndTime.oneWeek as const,
    period: DateAndTime.oneWeekPeriod as const,
    start_date: () => {
      const date = new Date()

      return new Date(date.setMonth(date.getDate() - 7))
        .toISOString()
        .slice(0, 10)
    }
  }, {
    end_date: new Date().toISOString().slice(0, 10),
    interval: DateAndTime.oneMonthInterval as const,
    label: DateAndTime.oneMonth as const,
    period: DateAndTime.oneMonthPeriod as const,
    start_date: () => {
      const date = new Date()

      return new Date(date.setMonth(date.getMonth() - 1))
        .toISOString()
        .slice(0, 10)
    }
  }]

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
    return `${percentage.toFixed(6)} %`
  })

  const currencyPair: ComputedRef<string> = computed(() => {
    return `${form.firstCurrency}/${form.secondCurrency}`
  })

  const getCurrencyPair = (firstCurrency: string, secondCurrency: string) => {
    return `${firstCurrency}${secondCurrency}`
  }

  const getLiveCurrenciesList = async () => {
    // const url = `/v1/live_currencies_list?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}`
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     ciurrencyPairs.value = Object.keys(data.available_currencies)
    //       .map((key: string) => {
    //         return {
    //           value: key,
    //           label: data.available_currencies[key]
    //         }
    //       })
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    currencyPairs.value = Object.keys(payloadLiveCurrencies.available_currencies)
      .map((key: string) => {
        return {
          value: key,
          label: payloadLiveCurrencies.available_currencies[key]
        }
      })
  }

  const getTimeseries = (firstCurrency: string, secondCurrency: string) => {
    // Daily: start_date=2019-10-01&end_date=2019-10-10
    // Hourly: start_date=2023-05-19-00:00&end_date=2023-05-22-22:51&format=records&interval=hourly&period=1
    // Minutes: start_date=2023-05-19-00:00&end_date=2023-05-22-22:51&format=records&interval=minute&period=15

    // const currencyPair = getCurrencyPair(firstCurrency, secondCurrency)
    // const url = `/v1/timeseries?api_key=${import.meta.env.VITE_APP_TRADERMADE_API_KEY}&currency=${currencyPair}&start_date=2021-01-01&end_date=2021-01-02&format=records`
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     historicalPeriod.value = data.quotes
    //   })

    historicalPeriod.value = payloadTimeSeries.quotes as Quote[]
    payloadTimeSeries.quotes.forEach((quote: any) => {
      if (quote.date !== '2021-01-01') {
        console.log('is not end_date:', quote.date)
        return
      }

      console.log('matches end_date:', quote.date)
      currentPrice.value = quote.close
      startingPrice.value = quote.open
      closingPrice.value = quote.close
      priceDifference.value = startingPrice.value - closingPrice.value
      priceDifferencePercentage.value = (closingPrice.value - startingPrice.value) / payloadTimeSeries.quotes.length
    })
  }

  watch([form.firstCurrency, form.secondCurrency, selectedTimeFrame], () => {
    console.log('watch', selectedTimeFrame)
    if (form.firstCurrency && form.secondCurrency && selectedTimeFrame) {
      // getCurrencyPairPrice(form.firstCurrency, form.secondCurrency)
      getTimeseries(form.firstCurrency, form.secondCurrency)

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
    // getCurrencyPairPrice,
    getTimeseries,
    timeFrames,
    selectedTimeFrame
  }
})
