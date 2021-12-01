import React from 'react'
import { FormTypeObject } from '../../../../Redux/Types/FormsTypes'
import s from './Header.module.scss'

interface HeaderProps{
  form: FormTypeObject | undefined
}

const Header: React.FC<HeaderProps> = ({form}) => {
  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <header className={s.top}>
          <h1>{form?.formName}</h1>
          {
            form?.FormDescr !== '' &&
            <h2>{form?.FormDescr}</h2>
          }
        </header>
        <div className={s.line}></div>
        <footer className={s.bottom}>
          Нет акаунта
        </footer>
      </div>
    </div>
  )
}

export default Header
