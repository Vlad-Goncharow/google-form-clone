import React from 'react'
import s from './TextArea.module.scss'


const TextArea: React.FC = () => {
  return (
    <div className={s.item}>
      <input id='name' type="text" placeholder='Мой ответ' className={s.input} />
      <label htmlFor="name"></label>
    </div>
  )
}

export default TextArea
