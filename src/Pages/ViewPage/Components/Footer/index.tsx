import React from 'react'
import s from './Footer.module.scss'

function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.top}>
        <button className={s.btn}>Отправить</button>
        <button className={s.clear}>Очистить форму</button>
      </div>
      <p className={s.privecy}>
        Компания Google не имеет никакого отношения к этому контенту. <span className={s.privecy_btn}>Сообщение о нарушении</span> - <span className={s.privecy_btn}>Условия использования</span> - <span className={s.privecy_btn}>Политика конфиденциальности</span>
      </p>
    </div>
  )
}

export default Footer
