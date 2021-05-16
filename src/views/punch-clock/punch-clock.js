import { Input, Title, SubTitleLevelThree } from './punch-clock-style'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import Button from 'components/button/button'
import { DateTime } from 'luxon'

import * as PunchClockActions from '@redux/punch-clock/punch-clock-actions'
import * as PunchClockSelector from '@selectors/click/punch-clock-selector'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import TableData from './components/table-data'

const PunchClock = () => {
  const dispatch = useDispatch()
  const times = useSelector(PunchClockSelector.times)
  const timeValidator = /^[0-9]{2}:([0-9]{2}:)?[0-9]{2}$/g

  const handlerOnBlur = ({
    target: {
      value,
      name,
      id,
      _wrapperState: { initialValue },
    },
  }) => {
    if (value === initialValue) return
    if (!timeValidator.test(value)) return toast('O horário deve ter o formato: hora:minuto ou hora:minuto:segundos')
  }

  useEffect(() => {
    dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }, [dispatch])

  return (
    <div className="container">
      <div>
        <Title data-tip="hello world">Maio</Title>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col" className="align-middle">
              Dia
            </th>
            <th scope="col" className="align-middle">
              Entrada
            </th>
            <th scope="col" className="align-middle">
              Saida almoço
            </th>
            <th scope="col" className="align-middle">
              Volta almoço
            </th>
            <th scope="col" className="align-middle">
              Saída
            </th>
            <th scope="col" className="align-middle">
              Total do dia
            </th>
            <th scope="col" className="align-middle">
              Extra
            </th>
          </tr>
        </thead>
        <tbody>
          {times?.map(time => (
            <tr key={time.id}>
              <td className="align-middle">
                {time.weekday} {time.day}
              </td>
              <TableData time={time} shouldRenderButton={time.createEnterTime} name={'enterTime'} onBlur={handlerOnBlur} showDayOfButton={true} />
              <TableData time={time} shouldRenderButton={time.createLeaveToLunchTime} name={'leaveToLunchTime'} onBlur={handlerOnBlur} />
              <TableData time={time} shouldRenderButton={time.createBackFromLunchTime} name={'backFromLunchTime'} onBlur={handlerOnBlur} />
              <TableData time={time} shouldRenderButton={time.createExitTime} name={'exitTime'} onBlur={handlerOnBlur} />
              <td className="align-middle">{time.totalHour ? time.totalHour : '-----'}</td>
              <td className="align-middle">
                {!time.dayOff ? (
                  <Button className="btn-info" data-tip="Adicionar informações extra" disabled={!time.allowToPunchIn}>
                    <i className="fa fa-edit" />
                  </Button>
                ) : (
                  <Button className="btn-info" data-tip="Adicionar data nesse day off" disabled={!time.allowToPunchIn}>
                    <i className="fa fa-plus-square" />
                  </Button>
                )}
                <ReactTooltip textColor="black" backgroundColor="white" border />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SubTitleLevelThree>Quantidade de tempo requerida no mês: 200</SubTitleLevelThree>
      <SubTitleLevelThree>Tempo acumulado dos meses anteriores: 200</SubTitleLevelThree>
      <SubTitleLevelThree>Total de tempo do mês: 200</SubTitleLevelThree>
      <SubTitleLevelThree>Novo Tempo acumulado: 200</SubTitleLevelThree>
    </div>
  )
}

export default PunchClock
