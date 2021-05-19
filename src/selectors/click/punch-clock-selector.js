import { DateTime } from 'luxon'

const getShortTime = time => time?.slice(0, 8)

const mapperTime = time => {
  const parsedDate = new DateTime.fromISO(time.date)
  const dateNow = DateTime.now()

  const allowToPunchIn = parsedDate <= dateNow

  return {
    ...time,
    day: parsedDate.day,
    enterTime: getShortTime(time.enterTime),
    createEnterTime: !time.enterTime,
    leaveToLunchTime: getShortTime(time.leaveToLunchTime),
    createLeaveToLunchTime: !time.leaveToLunchTime && !!time.enterTime,
    backFromLunchTime: getShortTime(time.backFromLunchTime),
    createBackFromLunchTime: !time.backFromLunchTime && !!time.leaveToLunchTime,
    exitTime: getShortTime(time.exitTime),
    createExitTime: !time.exitTime && !!time.backFromLunchTime,
    allowToPunchIn,
  }
}

const times = state => state.punchClock.times?.map(mapperTime)

const getTimeByIds = (state, ids) => {
  const times = state.punchClock.times?.filter(time => ids.includes(time.id))
  if (!times?.length) return []

  return times.map(mapperTime)
}

const currentMonthExists = state => state.punchClock.currentMonthExist

export { times, currentMonthExists, getTimeByIds }
