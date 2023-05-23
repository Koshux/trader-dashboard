export interface TimeFrame {
  end_date?: string
  interval?: string
  label?: string
  period?: string
  start_date?: string | (() => string)
}
