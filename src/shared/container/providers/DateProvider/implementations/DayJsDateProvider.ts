import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate)
    const endDateUtc = this.convertToUTC(endDate)

    return dayjs(endDateUtc).diff(startDateUtc, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  toDate(date: Date): Date {
    return dayjs(date, 'YYYY-MM-DD 00:00:00').toDate()
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  dateNowFormat(format: string): string {
    return dayjs().format(format)
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUtc = this.convertToUTC(startDate)
    const endDateUtc = this.convertToUTC(endDate)

    return dayjs(endDateUtc).diff(startDateUtc, 'days')
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  subtractDays(days: number): Date {
    return dayjs().subtract(days, 'days').toDate()
  }

  convertToFormatDb(date: Date): string {
    return dayjs(date, 'YYYY-MM-DD HH:mm:ss').toString()
  }
}

export { DayJsDateProvider }
