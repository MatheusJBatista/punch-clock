import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import { months } from '@utilities/timer-utility'

import { Icon, Pagination, Select, Option, Input } from './punch-clock-pagination-style'
import noop from 'lodash.noop'
import { toast } from 'react-toastify'

const PunchClockPagination = ({ onDateChange }) => {
  const initialDate = new DateTime.now()
  const [year, setYear] = useState(initialDate.year || '')
  const [month, setMonth] = useState(months.find(month => month.position === initialDate.month).id || '')

  useEffect(() => {
    if (onDateChange) onDateChange({ year, month })
  }, [year, month, onDateChange])

  const resetDate = () => {
    setYear(initialDate.year)
    setMonth(months.find(month => month.position === initialDate.month).id)
  }

  const shouldResetDate = year => parseInt(year) === initialDate.year

  const validateYearAndThrowMessage = year => {
    const isValid = true
    if (parseInt(year) > initialDate.year) {
      toast(`Não é possível selecionar um ano maior que ${initialDate.year}`)
      return !isValid
    }

    return isValid
  }

  const handlerYearChange = ({ target: { value } }) => {
    const onlyNumberValue = value.replace(/\D/g, '')
    if (shouldResetDate(onlyNumberValue)) return resetDate()
    if (!validateYearAndThrowMessage(onlyNumberValue)) return setYear(initialDate.year)
    setYear(onlyNumberValue)
  }

  const nextYear = () => {
    const nextYearToSet = parseInt(year) + 1
    if (shouldResetDate(nextYearToSet)) return resetDate()
    if (!validateYearAndThrowMessage(nextYearToSet)) return
    setYear(nextYearToSet)
  }

  const prevYear = () => {
    const nextYearToSet = parseInt(year) - 1
    if (shouldResetDate(nextYearToSet)) return resetDate()
    if (nextYearToSet <= 0) return toast('o ano deve ser maior que 0')
    setYear(nextYearToSet)
  }

  const handlerMonthChange = ({ target: { value } }) => setMonth(value)

  const nextMonth = () => {
    const nextMonthToSet = months.find(monthHelper => monthHelper.position === parseInt(month) + 1)
    setMonth(nextMonthToSet.id)
  }

  const prevMonth = () => {
    const nextMonthToSet = months.find(monthHelper => monthHelper.position === parseInt(month) - 1)
    setMonth(nextMonthToSet.id)
  }

  const disableNextButtonFromMonth =
    (parseInt(month) === initialDate.month && year === initialDate.year) || parseInt(month) === months[months.length - 1].position
  const disablePrevButtonFromMonth = parseInt(month) === months.find(Boolean).position

  const disableNextButtonFromYear = parseInt(year) === initialDate.year
  const disablePrevButtonFromYear = parseInt(year) <= 0

  const disableOption = month => parseInt(month) > initialDate.month && year === initialDate.year
  return (
    <>
      <Pagination>
        <Icon className="fa fa-chevron-left" disabled={disablePrevButtonFromYear} onClick={!disablePrevButtonFromYear ? prevYear : noop} />
        <Input value={year} onChange={handlerYearChange} />
        <Icon className="fa fa-chevron-right" disabled={disableNextButtonFromYear} onClick={!disableNextButtonFromYear ? nextYear : noop} />
      </Pagination>
      <Pagination>
        <Icon className="fa fa-chevron-left" disabled={disablePrevButtonFromMonth} onClick={!disablePrevButtonFromMonth ? prevMonth : noop} />
        <Select onChange={handlerMonthChange} value={month}>
          {months.map(month => (
            <Option value={month.id} key={month.id} disabled={disableOption(month.id)}>
              {month.text}
            </Option>
          ))}
        </Select>
        <Icon className="fa fa-chevron-right" disabled={disableNextButtonFromMonth} onClick={!disableNextButtonFromMonth ? nextMonth : noop} />
      </Pagination>
    </>
  )
}

PunchClockPagination.propTypes = {
  onDateChange: PropTypes.func,
}

export default PunchClockPagination
