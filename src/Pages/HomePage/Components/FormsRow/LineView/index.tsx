import React, { SyntheticEvent } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import s from './LineView.module.scss'
import { Link } from 'react-router-dom';
import { DeleteFormPayload, FormTypeObject } from '../../../../../Redux/Types/FormsTypes';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside';
import { useFormActions } from '../../../../../hooks/UseActions';


interface LineViewProps{
  form: FormTypeObject;
  changePopupValue: (val: boolean) => void
}

const LineView: React.FC<LineViewProps> = ({ form, changePopupValue}) => {
  const { DeleteForm, SetCurrentForm } = useFormActions()

  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  function openPopup(e: SyntheticEvent) {
    e.preventDefault()
    setOpenMenu(true)
  }
  const refForm = React.useRef(null)
  useOnClickOutside(refForm, () => setOpenMenu(false))


  const removeForm = (form: FormTypeObject, obj: DeleteFormPayload) => {
    DeleteForm(form, obj)
  }

  //модалка с переименованием формы
  const OpenChangeFormNamePopup = (e: SyntheticEvent) => {
    e.preventDefault()
    changePopupValue(true)
  }

  return (
    <Link to={`/${form.id}`} className={s.item} >
      <div className={s.left}>
        <button className={s.girdIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 30 30" width="30px" height="30px"><path d="M24.707,7.793l-5.5-5.5C19.019,2.105,18.765,2,18.5,2H7C5.895,2,5,2.895,5,4v22c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V8.5C25,8.235,24.895,7.981,24.707,7.793z M10,15c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,14.552,10.552,15,10,15z M10,19c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,18.552,10.552,19,10,19z M10,23c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,22.552,10.552,23,10,23z M20,23h-6c-0.552,0-1-0.448-1-1s0.448-1,1-1h6c0.552,0,1,0.448,1,1S20.552,23,20,23z M20,19h-6c-0.552,0-1-0.448-1-1s0.448-1,1-1h6c0.552,0,1,0.448,1,1S20.552,19,20,19z M20,15h-6c-0.552,0-1-0.448-1-1s0.448-1,1-1h6c0.552,0,1,0.448,1,1S20.552,15,20,15z M19,9c-0.552,0-1-0.448-1-1V3.904L23.096,9H19z" /></svg>
        </button>
        <div className={s.name}>{form.formName}</div>
      </div>
      <div className={s.right}>
        <span className={s.time}>{form.formDateChange}</span>
        <div className={s.gridMoreMenu}>
          <button className={s.gridMoreIcon} onClick={openPopup}>
            <MoreVertIcon />
          </button>
          {
            openMenu ?
              <div ref={refForm} onClick={() => SetCurrentForm(form.id)} className={s.menuOpened}>
                <div className={s.menuItem} onClick={OpenChangeFormNamePopup}>
                  <button className={s.menuIcon}>
                    <DriveFileRenameOutlineIcon />
                  </button>
                  <div className={s.menuName}>
                    Переименование
                  </div>
                </div>
                <div className={s.menuItem} onClick={(e) => {
                  e.preventDefault()
                  removeForm(form, { id: form.id.toString() })
                }}>
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
    </Link >
  )
}

export default LineView
