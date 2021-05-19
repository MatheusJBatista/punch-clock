import { getTimeByIds } from '@selectors/click/punch-clock-selector'
import { DateTime, Info } from 'luxon'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const timer = (enterTime, leaveToLunchTime, backFromLunchTime, exitTime, setTime) => {
  if (!enterTime || exitTime) return

  const getTotalDurationOfLunch = dateNow => {
    let leaveToLunchDate = leaveToLunchTime ? DateTime.fromISO(leaveToLunchTime) : null
    let backFromLunchDate = backFromLunchTime ? DateTime.fromISO(backFromLunchTime) : null

    if (!leaveToLunchDate) return

    if (backFromLunchDate) {
      const totalTimeOfLunch = backFromLunchDate.diff(leaveToLunchDate, ['hours', 'minutes', 'seconds'])

      return totalTimeOfLunch
    }

    const totalTimeOfLunchSoFar = dateNow.diff(leaveToLunchDate, ['hours', 'minutes', 'seconds'])

    return totalTimeOfLunchSoFar
  }

  const dateNowForValidation = DateTime.now()
  const startDateForValidation = DateTime.fromISO(enterTime)
  if (startDateForValidation > dateNowForValidation) return
  return setInterval(() => {
    const dateNow = DateTime.now()
    const startDate = DateTime.fromISO(enterTime)
    const durationOfLunch = getTotalDurationOfLunch(dateNow)

    let totalTimeSoFar = dateNow.diff(startDate, ['hours', 'minutes', 'seconds'])
    if (durationOfLunch) totalTimeSoFar = totalTimeSoFar.minus(durationOfLunch)

    const hours = totalTimeSoFar.values.hours
    const minutes = totalTimeSoFar.values.minutes
    const seconds = totalTimeSoFar.values.seconds.toFixed(0)

    const hoursInString = hours <= 9 ? `0${hours}` : hours
    const minutesInString = minutes <= 9 ? `0${minutes}` : minutes
    const secondsInString = seconds <= 9 ? `0${seconds}` : seconds

    setTime(`${hoursInString}:${minutesInString}:${secondsInString}`)
  }, 1000)
}

const useTimer = () => {
  const [intervals, setIntervals] = useState([])
  const [timeIds, setTimeIds] = useState([])
  const [currentTimes, setCurrentTimes] = useState([])
  const times = useSelector(state => getTimeByIds(state, timeIds))

  useEffect(() => {
    if (!times?.length) return
    times
      ?.filter(time => timeIds.includes(time.id))
      ?.forEach(time => {
        if (time.isCompletedDay) {
          const intervalId = intervals.find(interval => interval.timeId === time.id)?.id
          clearInterval(intervalId)
        }
      })
  }, [intervals, timeIds, times])

  const hasChangeFromOldTime = time => {
    const currentTime = currentTimes.find(currentTime => time.id === currentTime.id)

    let hasSomeChange = false
    if (currentTime.enterTime !== time.enterTime) hasSomeChange = true
    if (currentTime.leaveToLunchTime !== time.leaveToLunchTime) hasSomeChange = true
    if (currentTime.backFromLunchTime !== time.backFromLunchTime) hasSomeChange = true

    if (hasSomeChange) {
      const currentInterval = intervals.find(interval => interval.timeId === time.id)
      clearInterval(currentInterval.id)

      setIntervals(prevState => [...prevState.filter(interval => interval.timeId !== time.id)])
      setCurrentTimes(prevState => [...prevState.filter(currentTime => currentTime.id !== time.id), time])
    }

    return hasSomeChange
  }

  const thisTimer = (time, setTimer) => {
    if (intervals.some(interval => interval.timeId === time.id && !hasChangeFromOldTime(time))) return
    const { enterTime, leaveToLunchTime, backFromLunchTime, exitTime, id } = time

    const intervalId = timer(enterTime, leaveToLunchTime, backFromLunchTime, exitTime, setTimer)
    if (intervalId) {
      setTimeIds(prevState => [...prevState, id])
      setCurrentTimes(prevState => [...prevState, time])
      setIntervals(prevState => [...prevState, { timeId: id, id: intervalId }])
    }
  }

  return thisTimer
}

const months = Info.months('long', { locale: 'pt-br' }).map((month, index) => {
  const numberMonth = index + 1
  const id = numberMonth <= 9 ? `0${numberMonth}` : numberMonth
  return { text: month, id, position: index + 1 }
})

export { timer, useTimer, months }
