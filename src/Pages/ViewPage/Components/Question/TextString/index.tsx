import React from 'react'
import s from './TextString.module.scss'

const TextString: React.FC = () => {
  return (
    <div className={s.item}>
      <input id='name' type="text" placeholder='Мой ответ' className={s.input} />
      <label htmlFor="name"></label>
    </div>
  )
}

export default TextString
