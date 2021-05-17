import { DateTime } from 'luxon'

const getShortTime = time => time?.slice(0, 8)

const times = state =>
  state.punchClock.times?.map(time => {
    const parsedDate = new DateTime.fromISO(time.date)
    const dateNow = DateTime.now()

    const allowToPunchIn = parsedDate.ordinal <= dateNow.ordinal

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
  })

const currentMonthExists = state => state.punchClock.currentMonthExist

export { times, currentMonthExists }
