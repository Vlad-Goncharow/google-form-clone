import React from 'react'
import { v1 as uuidv1 } from 'uuid';

import { useTypeSelector } from '../../hooks/useTypeSelector'

import { useDispatch } from 'react-redux'

import { FormsRow } from './Components/FormsRow'
import { Header } from './Components/Header'

import s from './HomePage.module.scss'

import { addForm, onLoadForms } from '../../Redux/actions/FormAction'
import { FormTypeObject } from '../../Redux/Types/FormsTypes'

import { NameComp } from './Components/NameComp';
import Loader from "react-loader-spinner";


function HomePage() {
  const { form, isLoading } = useTypeSelector(store => store.createForm)
  const dispatch = useDispatch()
  //Доьовление формы
  const AddNewForm = (obj: FormTypeObject) => {
    dispatch(addForm(obj))
  }

  let time: string = React.useMemo(() => {
    return uuidv1()
  }, [form])

  const [changeFormPopup, setChangeFormPopup] = React.useState<boolean>(false)

  const changePopupValue = (val: boolean) => {
    setChangeFormPopup(val)
  }
  //id формы
  const [changeFormId, setChangeFormId] = React.useState('')
  const changeFormPopupId = React.useCallback((obj: string) => {
    setChangeFormId(obj)
  }, [])

  //вид отображние форм
  const [grigView, setGridView] = React.useState<boolean>(false)
  //что б ссылка не терялась на ф-цию и не было ререндеров при передачи ее в щапку
  const ChangeFormView = React.useCallback(() => {
    setGridView(prev => !prev)
  }, [])

  React.useEffect(() => {
    dispatch(onLoadForms())
  }, [dispatch])

  function checkLoader(){
    //я сделал это для того, если проверять через тернарку ошибки нет, но div меняет цвет и выглядит как то не очень
    if (isLoading){
      return (
        <div className={s.loader} >
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )
    } else {
      return (
        <div className={s.HomePage}>
          <Header ChangeFormView={ChangeFormView} />
          <FormsRow grigView={grigView} changeFormPopupId={changeFormPopupId} changePopupValue={changePopupValue} />
          {
            changeFormPopup &&
            <NameComp changeFormId={changeFormId} changePopupValue={changePopupValue} />
          }
          <div
            className={s.createForm}
            onClick={() => {
              AddNewForm({
                formName: 'Новая форма',
                formDateChange: `Просмотрено: ${new Date().getHours()}:${new Date().getMinutes()}`,
                id: time,
                FormDescr: '',
                questions: [
                  {
                    questionOneOfTheList: [],
                    parentId: time,
                    questionName: "Вопрос",
                    questionDescr: '',
                    questionType: 'Текст (строка)',
                    questionId: uuidv1(),
                    requiredQuestion: false,
                    questionDescrIsActive: false
                  }
                ],
                formColors:['#db4437','#673ab7','#3f51b5','#4285f4','#03a9f4'],
                formTheme: '#03a9f4',
                formThemeBackGround: '#03a9f4'
              });
            }}
          >
            <svg>
              <g xmlns="http://www.w3.org/2000/svg" >
                <path fill="#4285F4" d="M10 10v4.001h14V10z" />
                <path fill="#FBBC05" d="M10 10H0v4.001h10L14.001 10z" />
                <path fill="#34A853" d="M10 14h4v10h-4z" />
                <path fill="#EA4335" d="M10 0v14l4.001-4V0z" />
              </g>
            </svg>
          </div>
        </div>
      )
    }
  }
  return checkLoader()
}

export default HomePage
