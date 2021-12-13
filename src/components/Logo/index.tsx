import React from 'react'
import { Link } from 'react-router-dom'
import s from './Logo.module.scss'

export interface LogoProp  {
  name:string | undefined
}

const Logo: React.FC<LogoProp> = ({name}) => {
  return (
    <Link className={s.logo} to='/'>
      <img src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png" alt="Logo icon" />
      <span>{name}</span>
    </Link>
  )
}

export default Logo
