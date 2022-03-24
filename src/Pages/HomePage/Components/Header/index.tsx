import React, { ChangeEvent } from 'react'
import Logo from '../../../../components/Logo'
import s from './Header.module.scss'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

interface HeaderProps{
  ChangeFormView:() => void
  changeEvent: (e: ChangeEvent<HTMLInputElement>)=>void
  inputValue:string
  setInputValue: (str:string) => void
}

export const Header: React.FC<HeaderProps> = React.memo(({ ChangeFormView, inputValue, changeEvent, setInputValue }) => {
  
  return (
    <div className={s.header}>
      <div className={s.headerTop}>
        <Logo name='Формы' />

        <form action="" className={s.form}>
          <div className={s.formInput}>
            <input 
              className={s.search} 
              type="text" 
              placeholder='Пойск' 
              value={inputValue}
              onChange={changeEvent}
            />
          </div>
          <button className={s.btnSubmit}>
            <SearchIcon />
          </button>
          <button type='reset' className={s.formClear} onClick={() => setInputValue('')}>
            <CloseIcon />
          </button>
        </form>

        <div className={s.userInfo}>
          <button className={s.menu}>
            <svg className="gb_Pe" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
          </button>
          <button className={s.user}></button>
        </div>
      </div>

      <div className={s.headerBottom}>
        <div className={s.recentForms}>Недавние формы</div>

        <div className={s.setings}>
          <button className={s.setingIcon} onClick={() => ChangeFormView()}>
            <ListAltIcon />
          </button>
          <button className={s.setingIcon}>
            <SortByAlphaIcon />
          </button>
        </div>
      </div>
    </div>
  )
})
