import { Input } from '../punch-clock-style'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Button from 'components/button/button'
import { DateTime } from 'luxon'

import * as PunchClockActions from '@redux/punch-clock/punch-clock-actions'
import classNames from 'classnames'

const TableData = ({ time, name, shouldRenderButton, showDayOfButton }) => {
  const { id, onBlur, dayOff, allowToPunchIn } = time
  const value = time[name]
  const dispatch = useDispatch()

  const handlerOnClick = async () => {
    const dateNow = DateTime.now()
    console.log(dateNow, dateNow.hour, dateNow.minute)
    const minuteAsString = dateNow.minute <= 9 ? `0${dateNow.minute}` : dateNow.minute
    const hourAsString = dateNow.hour <= 9 ? `0${dateNow.hour}` : dateNow.hour
    const fieldToUpdate = {
      [name]: `${hourAsString}:${minuteAsString}`,
    }

    await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    await dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }

  const handlerDayOffClick = async () => {
    const fieldToUpdate = {
      dayOff: true,
    }

    await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    await dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }

  const punchInButtonClasses = classNames({ [`col-${showDayOfButton ? 8 : 12}`]: true })

  if (dayOff) return <td className="align-middle">-----</td>
  if (!allowToPunchIn) return <td className="align-middle">Aguardando chegar no dia</td>

  return (
    <td className="align-middle">
      {value && <Input defaultValue={value} name={name} id={id} onBlur={onBlur} />}
      {shouldRenderButton && allowToPunchIn && (
        <div className="row">
          <div className={punchInButtonClasses}>
            <Button onClick={handlerOnClick}>Marcar horário atual</Button>
          </div>
          {showDayOfButton && (
            <div className="col-4">
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
    onBlur: PropTypes.func,
    dayOff: PropTypes.bool,
    allowToPunchIn: PropTypes.bool,
  },
  name: PropTypes.string,
  shouldRenderButton: PropTypes.bool,
  showDayOfButton: PropTypes.bool,
}

export default TableData
