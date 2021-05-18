import { Input, Title, SubTitleLevelThree, BlurDiv, OverrideBlurDiv } from './punch-clock-style'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import Button from 'components/button/button'

import * as PunchClockActions from '@redux/punch-clock/punch-clock-actions'
import * as PunchClockSelector from '@selectors/click/punch-clock-selector'
import ReactTooltip from 'react-tooltip'
import TableData from './components/table-data'
import NoMonthMockTable from './components/no-month-mock-table'
import TableLoader from './components/table-loader'
import { selectRequesting } from '@selectors/requesting/requesting-selector'
import { timer, useTimer } from '@utilities/timer-utility'

const PunchClock = () => {
  const dispatch = useDispatch()
  const timer2 = useTimer()
  const timeValidator = /^[0-9]{2}:([0-9]{2}:)?[0-9]{2}$/g

  const [intervals, setIntervals] = useState([])

  const times = useSelector(PunchClockSelector.times)
  const currentMonthExists = useSelector(PunchClockSelector.currentMonthExists)
  const hasLoadedTimes = useSelector(state => selectRequesting(state, [PunchClockActions.GET_BY_YEAR_AND_MONTH_TIMES_FINISHED]))
  const hasLoadedCurrentMonthExists = useSelector(state => selectRequesting(state, [PunchClockActions.VERIFY_EXISTS_FINISHED]))

  const handlerOnBlur = async ({ target: { value, name, id } }) => {
    if (!timeValidator.test(value)) return toast('O horário deve ter o formato: hora:minuto ou hora:minuto:segundos')

    const fieldToUpdate = {
      [name]: value,
    }

    await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    await dispatch(PunchClockActions.getById(id))
  }

  const handlerOnChange = async ({ target: { value, name, id } }) => {
    if (value.length !== 5 && value.length !== 8) return
    if (!timeValidator.test(value)) return toast('O horário deve ter o formato: hora:minuto ou hora:minuto:segundos')

    const fieldToUpdate = {
      [name]: value,
    }

    await dispatch(PunchClockActions.patchTime(id, fieldToUpdate))
    await dispatch(PunchClockActions.getById(id))
  }

  useEffect(() => {
    dispatch(PunchClockActions.verifyExists(2021, '05'))
  }, [dispatch])

  useEffect(() => {
    if (currentMonthExists && hasLoadedCurrentMonthExists) dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }, [currentMonthExists, dispatch, hasLoadedCurrentMonthExists])

  const startNewMonth = async () => {
    await dispatch(PunchClockActions.startNewMonth(2021, '05'))
    await dispatch(PunchClockActions.verifyExists(2021, '05'))
  }

  const handlerDayOffExtraButton = async id => {
    const { hasInterceptorError } = await dispatch(PunchClockActions.patchTime(id, { dayOff: false }))
    if (hasInterceptorError) return
    await dispatch(PunchClockActions.getByYearAndMonthTimes(2021, '05'))
  }

  const setTimer = time => {
    timer2(time, timer => {
      dispatch(PunchClockActions.setTimer(time.id, timer))
    })
  }

  return (
    <div className="container">
      <div>
        <Title data-tip="hello world">Maio</Title>
      </div>
      {currentMonthExists ? (
        <TableLoader isLoading={!hasLoadedTimes}>
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
                  Total de horas
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
                  <TableData
                    buttonName="Iniciar"
                    time={time}
                    shouldRenderButton={time.createEnterTime}
                    name={'enterTime'}
                    onBlur={handlerOnBlur}
                    onChange={handlerOnChange}
                    isEnterTime={true}
                  />
                  <TableData
                    buttonName="Ir pro almoço"
                    time={time}
                    shouldRenderButton={time.createLeaveToLunchTime}
                    name={'leaveToLunchTime'}
                    onBlur={handlerOnBlur}
                    onChange={handlerOnChange}
                  />
                  <TableData
                    buttonName="Voltar do almoço"
                    time={time}
                    shouldRenderButton={time.createBackFromLunchTime}
                    name={'backFromLunchTime'}
                    onBlur={handlerOnBlur}
                    onChange={handlerOnChange}
                  />
                  <TableData
                    buttonName="Sair"
                    time={time}
                    shouldRenderButton={time.createExitTime}
                    name={'exitTime'}
                    onBlur={handlerOnBlur}
                    onChange={handlerOnChange}
                  />
                  <td className="align-middle">{time.totalHour ? time.totalHour : setTimer(time)}</td>
                  <td className="align-middle">
                    {!time.dayOff ? (
                      <Button className="btn-info" data-tip="Adicionar informações extra" disabled={!time.allowToPunchIn} iconButton>
                        <i className="fa fa-edit" />
                      </Button>
                    ) : (
                      <Button
                        className="btn-info"
                        data-tip="Adicionar data nesse day off"
                        disabled={!time.allowToPunchIn}
                        onClick={() => handlerDayOffExtraButton(time.id)}
                        iconButton
                      >
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
        </TableLoader>
      ) : (
        <>
          <BlurDiv>
            <NoMonthMockTable />
          </BlurDiv>
          <OverrideBlurDiv className="d-flex justify-content-center">
            <Button className="btn-info btn-lg" style={{ margin: '200px 0' }} onClick={startNewMonth}>
              Iniciar mês de Maio
            </Button>
          </OverrideBlurDiv>
        </>
      )}
    </div>
  )
}

export default PunchClock
