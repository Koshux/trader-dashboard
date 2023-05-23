import type { Quote } from "@/types/Quote"

export interface TimeSeries {
  base_currency: string
  end_date: string
  endpoint: string
  quote_currency: string
  quotes: Quote[]
  request_time: string
  start_date: string
}
