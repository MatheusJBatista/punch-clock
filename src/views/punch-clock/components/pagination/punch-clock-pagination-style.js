import styled, { css } from 'styled-components'

const Pagination = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const Icon = styled.i`
  font-size: 25px;
  margin: 0 20px;
  cursor: pointer;
  ${props =>
    props.disabled &&
    css`
      cursor: auto;
      color: #5d5d5d;
    `}
`

const Select = styled.select`
  background-color: black;
  border: 0;
  color: white;
  appearance: none;
  cursor: pointer;
  font-size: 2em;
  text-transform: capitalize;
  margin-bottom: 5px;
`

const Option = styled.option`
  text-transform: capitalize;
`

const Input = styled.input`
  color: white;
  background-color: black;
  font-size: 2em;
  border: 0;
  width: 75px;
`

export { Pagination, Icon, Select, Option, Input }
