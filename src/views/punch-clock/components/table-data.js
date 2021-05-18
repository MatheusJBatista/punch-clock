import { Input } from '../punch-clock-style'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Button from 'components/button/button'
import { DateTime } from 'luxon'

import * as PunchClockActions from '@redux/punch-clock/punch-clock-actions'
import { useRef } from 'react'

const TableData = ({ time, name, shouldRenderButton, isEnterTime, onBlur, onChange, buttonName }) => {
  const input = useRef()
  const { id, dayOff, allowToPunchIn } = time
  const value = time[name]
  const dispatch = useDispatch()

  const handlerOnClick = async () => {
    const dateNow = DateTime.now()
    const minuteAsString = dateNow.minute <= 9 ? `0${dateNow.minute}` : dateNow.minute
    const hourAsString = dateNow.hour <= 9 ? `0${dateNow.hour}` : dateNow.hour
    const fieldToUpdate = {
      [name]: `${hourAsString}:${minuteAsString}`,
    }

    const { hasInterceptorError } = await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    if (hasInterceptorError) return
    await dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }

  const handlerDayOffClick = async () => {
    const fieldToUpdate = {
      dayOff: true,
    }

    const { hasInterceptorError } = await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    if (hasInterceptorError) return
    await dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }

  const handlerOnChange = e => {
    const value = e.target.value

    let maskedValue = value.replace(/\D/g, '')
    maskedValue = maskedValue.slice(0, 6)
    maskedValue = maskedValue.replace(/^(\d{2})(\d{1})/g, '$1:$2')
    maskedValue = maskedValue.replace(/^(.{5})(\d{1})/g, '$1:$2')

    e.target.value = maskedValue
    input.current.value = maskedValue

    if (onChange) onChange(e)
  }

  if (dayOff) return <td className="align-middle">-----</td>
  if (!allowToPunchIn) return <td className="align-middle">Aguardando chegar no dia</td>

  return (
    <td className="align-middle">
      {value && <Input type="tel" ref={input} defaultValue={value} name={name} id={id} onBlur={onBlur} onChange={handlerOnChange} />}
      {shouldRenderButton && allowToPunchIn && (
        <div className="row">
          <div className="col-md-12">
            <Button onClick={handlerOnClick}>{buttonName ? buttonName : 'Marcar horário atual'}</Button>
          </div>
          {isEnterTime && (
            <div className="col-12 mt-1">
              <Button className="btn-secondary" onClick={handlerDayOffClick}>
                Day Off
              </Button>
            </div>
          )}
        </div>
      )}
      {!shouldRenderButton && !value && 'Aguardando o horário anterior'}
    </td>
  )
}

TableData.propTypes = {
  time: {
    id: PropTypes.string,
    dayOff: PropTypes.bool,
    allowToPunchIn: PropTypes.bool,
  },
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  shouldRenderButton: PropTypes.bool,
  isEnterTime: PropTypes.bool,
  buttonName: PropTypes.string,
}

export default TableData
