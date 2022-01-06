import React from 'react'
import s from './ThemeBlock.module.scss'

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch } from 'react-redux';

import { AddNewFormColorAction, changeFormTheme } from '../../../../Redux/actions/FormAction';

import { AddNewThemeColorPayLoad, ChangeFormThemePayLoad, FormTypeObject } from '../../../../Redux/Types/FormsTypes';
import { FormContext } from '../..';

import { ChromePicker } from 'react-color';
import { colord, extend, } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11y from "colord/plugins/a11y";
extend([mixPlugin, a11y]);

interface themeBlockProps {
  themeIsOpen: boolean;
  setThemeIsOpen: (val: boolean) => void
}

export const ThemeBlock: React.FC<themeBlockProps> = ({ themeIsOpen, setThemeIsOpen }) => {
  const dispatch = useDispatch()
  const { Form }: any = React.useContext(FormContext);
  //выбраный цвет в палитре цветов для   новой темы
  const [color, setColor] = React.useState(Form.themeColor)
  //Открыта/закрыта палитра с цветами
  const [colorPicker, setColorPicker] = React.useState<boolean>(false)
  const handleChangeComplete = (color: any) => {
    setColor(color?.hex); 
  };
  //изменить текущую тему
  const changeTheme = (Form: FormTypeObject | undefined, obj: ChangeFormThemePayLoad) => {
    dispatch(changeFormTheme(Form, obj))
  }
  //добовление нового цвета
  const newColor = (Form: FormTypeObject, obj: AddNewThemeColorPayLoad) => {
    dispatch(AddNewFormColorAction(Form, obj))
  }

  return (
    <div className={themeIsOpen ? s.themeBlock + ' ' + s.themeBlock_open : s.themeBlock}>
      <header className={s.header}>
        <PaletteOutlinedIcon />
        <h1>Настройка темы</h1>
        <div className={s.close} onClick={() => setThemeIsOpen(false)}>
          <CloseOutlinedIcon />
        </div>
      </header>
      <div className={s.item}>
        <div className={s.itemTitle}>ВЕРХНИЙ КОЛОНТИТУЛ</div>
        <button className={s.image}>
          <ImageOutlinedIcon />
          <span>Выбрать изображение</span>
        </button>
      </div>
      {
        colorPicker ?
          <div className={s.item}>
            <ChromePicker
              color={color}
              onChange={handleChangeComplete}
            />
            <div className={s.colorBtns}>
              <button onClick={() => {
                setColorPicker(false)
                newColor(Form,{ 
                  id:Form.id,
                  formTheme:color,
                  formThemeBackGround:color,
                  themeColor:color
                })
              }}>add</button>
              <button onClick={() => setColorPicker(false)}>remove</button>
            </div>
          </div>
        :
          <div className={s.item}>
            <div className={s.itemTitle}>Цвет темы</div>
            <div className={s.rowThems}>
              {
                Form.formColors.map((theme: any, index:number) =>
                  <div
                    onClick={() => changeTheme(Form, {
                      id: Form.id,
                      formTheme: theme,
                      formThemeBackGround: theme
                    })}
                    className={Form?.formTheme === theme ? s.themItem + ' ' + s.activeTheme : s.themItem}
                    style={{background: theme}}
                  >
                    {
                      Form?.formTheme === theme ? <div className={s.check}></div> : null
                    }
                  </div>
                )
              }
              <div className={s.themItem} onClick={() => setColorPicker(true)}>
                <AddIcon />
              </div>
            </div>
          </div>
      }
      <div className={s.item}>
        <div className={s.itemTitle}>Цвет фона</div>
        <div className={s.rowThems}>
          {
            //для того что бы не было 5 оттенков белого))
            Form.formTheme === '#ffffff'?
              <div
                className={Form?.formThemeBackGround === '#fff' ? s.themItem + ' ' + s.activeTheme : s.themItem}
                style={{ background: '#ffffff' }}
                onClick={() => changeTheme(Form, {
                  id: Form.id,
                  formTheme: Form.formTheme,
                  formThemeBackGround: '#ffffff'
                })}
              >
                {
                  Form.formThemeBackGround === '#fff' ? <div className={s.check}></div> : null
                }
              </div>
            :
              colord(Form.formTheme).tints(6).slice(0,5).map((c: any) => 
                <div 
                  className={Form?.formThemeBackGround === c.toHex() ? s.themItem + ' ' + s.activeTheme : s.themItem}
                  style={{ background: c.toHex() }} 
                  onClick={() => changeTheme(Form, {
                    id: Form.id,
                    formTheme: Form.formTheme,
                    formThemeBackGround: c.toHex()
                  })}
                >
                  {
                    Form.formThemeBackGround === c.toHex() ? <div className={s.check}></div> : null
                  }
                </div>
            )
          }
        </div>
      </div>
    </div>
  )
}