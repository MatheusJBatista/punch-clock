import PropTypes from 'prop-types'
import { BlurDiv, OverrideBlurDiv } from '../punch-clock-style'
import NoMonthMockTable from './no-month-mock-table'

const TableLoader = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <>
          <BlurDiv>
            <NoMonthMockTable />
          </BlurDiv>
          <OverrideBlurDiv className="d-flex justify-content-center">
            <i className="fa fa-spinner fa-spin" style={{ margin: '200px 0', color: 'white', fontSize: '70px' }} />
          </OverrideBlurDiv>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

TableLoader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
}

export default TableLoader
