import React from 'react'
import s from './ThemeBlock.module.scss'

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeFormTheme } from '../../../../Redux/actions/FormAction';

import { ChangeFormThemePayLoad, FormTypeObject } from '../../../../Redux/Types/FormsTypes';
import { FormContext } from '../..';

interface themeBlockProps {
  themeIsOpen: boolean;
  setThemeIsOpen: (val: boolean) => void
}

export const ThemeBlock: React.FC<themeBlockProps> = ({ themeIsOpen, setThemeIsOpen }) => {
  const { Form }: any = React.useContext(FormContext);

  const themes = [
    {
      themeColor: '#db4437',
      themeName: 'Красный',
      themeBackground: [
        {
          backgroundColor: '#fae3e1',
          backgroundName: 'Светлый'
        },
        {
          backgroundColor: '#f6d0cd',
          backgroundName: 'Средний'
        },
        {
          backgroundColor: '#f2beb9',
          backgroundName: 'Темный'
        },
        {
          backgroundColor: '#f6f6f6',
          backgroundName: 'Серый'
        }
      ]
    },
    {
      themeColor: '#673ab7',
      themeName: 'Фиолетовый',
      themeBackground: [
        {
          backgroundColor: '#f0ebf8',
          backgroundName: 'Светлый'
        },
        {
          backgroundColor: '#e1d8f1',
          backgroundName: 'Средний'
        },
        {
          backgroundColor: '#d1c4e9',
          backgroundName: 'Темный'
        },
        {
          backgroundColor: '#f6f6f6',
          backgroundName: 'Серый'
        }
      ]
    },
    {
      themeColor: '#3f51b5',
      themeName: 'Индиго',
      themeBackground: [
        {
          backgroundColor: '#eceef8',
          backgroundName: 'Светлый'
        },
        {
          backgroundColor: '#c5cbe9',
          backgroundName: 'Средний'
        },
        {
          backgroundColor: '#d1c4e9',
          backgroundName: 'Темный'
        },
        {
          backgroundColor: '#f6f6f6',
          backgroundName: 'Серый'
        }
      ]
    },
    {
      themeColor: '#4285f4',
      themeName: 'Синий  ',
      themeBackground: [
        {
          backgroundColor: '#e3edfd',
          backgroundName: 'Светлый'
        },
        {
          backgroundColor: '#d0e1fc',
          backgroundName: 'Средний'
        },
        {
          backgroundColor: '#bdd4fb',
          backgroundName: 'Темный'
        },
        {
          backgroundColor: '#f6f6f6',
          backgroundName: 'Серый'
        }
      ]
    },
    {
      themeColor: '#03a9f4',
      themeName: 'Светлоо синий',
      themeBackground: [
        {
          backgroundColor: '#d9f2fd',
          backgroundName: 'Светлый'
        },
        {
          backgroundColor: '#c0eafc',
          backgroundName: 'Средний'
        },
        {
          backgroundColor: '#a7f1eb',
          backgroundName: 'Темный'
        },
        {
          backgroundColor: '#f6f6f6',
          backgroundName: 'Серый'
        }
      ]
    }
  ]

  const { id }: any = useParams()

  const dispatch = useDispatch()
  const changeTheme = (Form: FormTypeObject | undefined, obj: ChangeFormThemePayLoad) => {
    dispatch(changeFormTheme(Form, obj))
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
      <div className={s.item}>
        <div className={s.itemTitle}>Цвет темы</div>
        <div className={s.rowThems}>
          {
            themes.map((theme, index) =>
              <div
                key={`${theme.themeName}_${index}`}
                onClick={() => changeTheme(Form, {
                  id: id,
                  formTheme: theme.themeColor,
                  formThemeBackGround: theme.themeBackground[0].backgroundColor
                })}
                className={s.themItem}
                style={{ background: theme.themeColor }}
              >
                {
                  Form?.formTheme === theme.themeColor ? <div className={s.check}></div> : null
                }
              </div>
            )
          }

        </div>
      </div>
      <div className={s.item}>
        <div className={s.itemTitle}>Цвет фона</div>
        <div className={s.rowThems}>
          {
            themes.map(theme =>
              theme.themeColor === Form?.formTheme ?
                theme.themeBackground.map((el, index) =>
                  <div
                    key={`${el.backgroundName}_${index}`}
                    onClick={() => changeTheme(Form, {
                      id: id,
                      formTheme: theme.themeColor,
                      formThemeBackGround: el.backgroundColor
                    })}
                    className={s.themItem}
                    style={{ background: el.backgroundColor }}
                  >
                    {
                      el.backgroundColor === Form?.formThemeBackGround ? <div className={s.check}></div> : null
                    }
                  </div>
                )
                : null
            )
          }
        </div>
      </div>
    </div>
  )
}

