import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormTypeObject } from '../../../../../Redux/Types/FormsTypes'
import s from './GridView.module.scss'

import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside'
import { useFormActions } from '../../../../../hooks/UseActions'

interface LineViewProps {
  form: FormTypeObject;
  changePopupValue: (val: boolean) => void
}

export const GridView: React.FC<LineViewProps> = ({ form, changePopupValue }) => {
  const {DeleteForm,SetCurrentForm} = useFormActions()

  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  function openPopup(e: SyntheticEvent){
    e.preventDefault()
    setOpenMenu(true)
  }
  const refForm = React.useRef(null)
  useOnClickOutside(refForm, () => setOpenMenu(false))
  
  const removeForm = (e: SyntheticEvent) => {
    e.preventDefault()
    DeleteForm(form, { id: form.id.toString() })
  }

  //модалка с переименованием формы
  const OpenChangeFormNamePopup = (e: SyntheticEvent) => {
    e.preventDefault()
    changePopupValue(true)
  }
  
  return (
    <Link  to={`/${form.id}`} style={{ textDecoration: 'none' }} className={s.formItem}>
      <div className={s.formWrapper}>
        <div className={s.formImg}></div>
        <footer>
          <div className="formName">{form.formName}</div>

          <div className={s.ItemRow}>
            <div className={s.view}>
              <svg>
                <g xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm8 8h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4h-7V7h7v2z" fill="#8430CE" fillRule="nonzero" />
                  <path d="M0 0h24v24H0z" />
                </g>
              </svg>
              <span>{form.formDateChange}</span>
            </div>

            <div className={s.menu}>
              <button className={s.more} onClick={openPopup}>
                <MoreVertIcon />
              </button>
              {
                openMenu ?
                  <div onClick={() => SetCurrentForm(form.id)} ref={refForm} className={s.menuOpened}>
                    <div className={s.menuItem} onClick={OpenChangeFormNamePopup}>
                      <button className={s.menuIcon}>
                        <DriveFileRenameOutlineIcon />
                      </button>
                      <div className={s.menuName}>
                        Переименование
                      </div>
                    </div>
                    <div className={s.menuItem} onClick={removeForm}>
                      <button className={s.menuIcon} >
                        <DeleteOutlineIcon />
                      </button>
                      <div className={s.menuName}>Удалить</div>
                    </div>
                    <Link to={`/${form.id}`} target='_blank' className={s.menuItem} >
                      <button className={s.menuIcon}>
                        <OpenInNewIcon />
                      </button>
                      <div className={s.menuName}>
                        Открыть в новой вкладке
                      </div>
                    </Link>
                  </div>
                  : null
              }
            </div>
          </div>
        </footer>
      </div>
    </Link>
  )
}
