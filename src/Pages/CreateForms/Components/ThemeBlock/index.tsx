import React from 'react'
import s from './ThemeBlock.module.scss'

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddIcon from '@mui/icons-material/Add';

import { ChangeFormThemePayLoad, FormTypeObject } from '../../../../Redux/Types/FormsTypes';

import { ChromePicker } from 'react-color';
import { colord, extend, } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11y from "colord/plugins/a11y";
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import { useFormActions } from '../../../../hooks/UseActions';
extend([mixPlugin, a11y]);

interface themeBlockProps {
  themeIsOpen: boolean;
  setThemeIsOpen: (val: boolean) => void
}

export const ThemeBlock: React.FC<themeBlockProps> = ({ themeIsOpen, setThemeIsOpen }) => {
  const { changeFormTheme, AddNewFormColorAction } = useFormActions()

  const { currentForm } = useTypeSelector(store => store.createForm)
  //выбраный цвет в палитре цветов для новой темы
  const [color, setColor] = React.useState('')
  //Открыта/закрыта палитра с цветами
  const [colorPicker, setColorPicker] = React.useState<boolean>(false)
  const closeColorPicker = () => setColorPicker(false);
  const handleChangeComplete = (color: any) => {
    setColor(color?.hex); 
  };
  //изменить текущую тему
  const changeTheme = (Form: FormTypeObject, obj: ChangeFormThemePayLoad) => {
    changeFormTheme(Form, obj)
  }
  //добовление нового цвета
  const newColor = () => {
    setColorPicker(false)
    if (currentForm){
      AddNewFormColorAction(currentForm, {
        id: currentForm.id,
        formTheme: color,
        formThemeBackGround: color,
        themeColor: color
      })
    }
    
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
              <button onClick={newColor}>add</button>
              <button onClick={closeColorPicker}>remove</button>
            </div>
          </div>
        :
          <div className={s.item}>
            <div className={s.itemTitle}>Цвет темы</div>
            <div className={s.rowThems}>
              {
                currentForm?.formColors.map((theme: any, index:number) =>
                  <div
                    key={`theme_${theme}_${index}`}
                    onClick={() => changeTheme(currentForm, {
                      id: currentForm.id,
                      formTheme: theme,
                      formThemeBackGround: colord(theme).tints(6)[1].toHex()
                    })}
                    className={currentForm?.formTheme === theme ? s.themItem + ' ' + s.activeTheme : s.themItem}
                    style={{background: theme}}
                  >
                    {
                      currentForm?.formTheme === theme ? <div className={s.check}></div> : null
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
            currentForm?.formTheme === '#ffffff'?
              <div
                className={currentForm?.formThemeBackGround === '#fff' ? s.themItem + ' ' + s.activeTheme : s.themItem}
                style={{ background: '#ffffff' }}
                onClick={() => changeTheme(currentForm, {
                  id: currentForm.id,
                  formTheme: currentForm.formTheme,
                  formThemeBackGround: '#ffffff'
                })}
              >
                {
                  currentForm.formThemeBackGround === '#fff' ? <div className={s.check}></div> : null
                }
              </div>
            :
              colord(currentForm?.formTheme ? currentForm?.formTheme:'').tints(6).slice(1,5).map((c: any,index:number) => 
                <div 
                  key={`theme_${c.toHex()}_${index}`}
                  className={currentForm?.formThemeBackGround === c.toHex() ? s.themItem + ' ' + s.activeTheme : s.themItem}
                  style={{ background: c.toHex() }} 
                  onClick={() => {
                    if(currentForm){
                      changeTheme(currentForm, {
                        id: currentForm.id,
                        formTheme: currentForm.formTheme,
                        formThemeBackGround: c.toHex()
                      })
                    }
                  }}
                >
                  {
                    currentForm?.formThemeBackGround === c.toHex() ? <div className={s.check}></div> : null
                  }
                </div>
            )
          }
        </div>
      </div>
    </div>
  )
}