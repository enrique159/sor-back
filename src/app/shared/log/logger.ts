import { IRequest } from './interfaces/IRequest.js'
import { dateTimeZoneFormat } from '@/utils/dateTimeZoneFormat.js'
import ConsoleLog from './integrations/ConsoleLog.js'

export const logger = (info: IRequest) => {
  const { date, time } = getDateNow()
  const log = new ConsoleLog(info, date, time)
  log.log()
}

const getDateNow = () => {
  const dateNow = dateTimeZoneFormat()
  const [date, timeseconds] = dateNow.split('T')
  const time = timeseconds.slice(0, 8)
  return { date, time }
}