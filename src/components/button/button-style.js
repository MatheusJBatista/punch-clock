import styled, { css } from 'styled-components'

export const Button = styled.button``
export const Icon = styled.i`
  ${props =>
    !props.iconButton &&
    css`
      margin-left: 10px;
    `}
`
