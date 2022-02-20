import React from 'react'
import { v1 as uuidv1 } from 'uuid';

import { useTypeSelector } from '../../hooks/useTypeSelector'

import { FormsRow } from './Components/FormsRow'
import { Header } from './Components/Header'

import s from './HomePage.module.scss'

import { NameComp } from './Components/NameComp';
import Loader from "react-loader-spinner";
import { useFormActions } from '../../hooks/UseActions';


function HomePage() {
  const { onLoadForms, addForm } = useFormActions()
  const { form, isLoading } = useTypeSelector(store => store.createForm)

  let uuId: string = React.useMemo(() => {
    return uuidv1()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  const [changeFormPopup, setChangeFormPopup] = React.useState<boolean>(false)

  const changePopupValue = (val: boolean) => {
    setChangeFormPopup(val)
  }
  //id формы
  const [changeFormId, setChangeFormId] = React.useState('')
  const changeFormPopupId = React.useCallback((str: string) => {
    setChangeFormId(str)
  }, [])

  //вид отображние форм
  const [grigView, setGridView] = React.useState<boolean>(false)
  //что б ссылка не терялась на ф-цию и не было ререндеров при передачи ее в iапку
  const ChangeFormView = React.useCallback(() => {
    setGridView(prev => !prev)
  }, [])

  React.useEffect(() => {
    if(form.length === 0){
      onLoadForms()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.length])

  const AddNewForm = () => {
    addForm({
      formName: 'Новая форма',
      formDateChange: `Просмотрено: ${new Date().getHours()}:${new Date().getMinutes()}`,
      id: uuId,
      FormDescr: '',
      questions: [
        {
          questionOneOfTheList: [],
          parentId: uuId,
          questionName: "Вопрос",
          questionDescr: '',
          questionType: 'Текст (строка)',
          questionId: uuidv1(),
          requiredQuestion: false,
          questionDescrIsActive: false
        }
      ],
      formColors: ['#db4437', '#673ab7', '#3f51b5', '#4285f4', '#03a9f4'],
      formTheme: '#03a9f4',
      formThemeBackGround: '#03a9f4'
    })
  }

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
            onClick={AddNewForm}
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
