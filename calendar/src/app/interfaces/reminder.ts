export interface Reminder {
  id: number,
  date: {
    day: number,
    monthIndex: number,
    year: number,
    time: string
  },
  tag: string,
  body: string,
}
