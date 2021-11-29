import React from 'react'
import s from './TextString.module.scss'

function TextString() {
  return (
    <div className='question'>
      <div className={s.name}>
        Краткий ответ
      </div>
    </div>
  )
}

export default TextString
