import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button as ButtonStyle, Icon } from './button-style'

const Button = ({ children, loading, onClick, className, iconButton, ...rest }) => {
  const [isLoading, setIsLoading] = useState(loading)

  const handlerOnClick = async () => {
    setIsLoading(true)
    if (onClick) await onClick()
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const classNames = classnames('btn', className, { 'btn-primary': !className })

  return (
    <ButtonStyle className={classNames} onClick={handlerOnClick} disabled={isLoading} {...rest}>
      {iconButton && isLoading ? <></> : children}
      {isLoading && <Icon className="fa fa-spinner fa-spin" iconButton={iconButton} />}
    </ButtonStyle>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconButton: PropTypes.bool,
}

export default Button
