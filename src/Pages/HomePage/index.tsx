import React, { ChangeEvent } from 'react'
import { v1 as uuidv1 } from 'uuid';

import { useTypeSelector } from '../../hooks/useTypeSelector'

import { FormsRow } from './Components/FormsRow'
import { Header } from './Components/Header'

import s from './HomePage.module.scss'

import { NameComp } from './Components/NameComp';
import Loader from "react-loader-spinner";
import { useFormActions } from '../../hooks/UseActions';
import { getTime } from '../../helper';


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
      formDateChange: getTime(),
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

  const [inputValue, setInputValue] = React.useState('')
  function changeEvent(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  const searchForms = React.useMemo(()=> {
    if (inputValue){
      return form.filter((item: any) => item.formName.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return form
  }, [form, inputValue])

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
        <Header setInputValue={setInputValue} inputValue={inputValue} changeEvent={changeEvent} ChangeFormView={ChangeFormView} />
        <FormsRow searchForms={searchForms} grigView={grigView}  changePopupValue={changePopupValue} />
        {
          changeFormPopup &&
          <NameComp changePopupValue={changePopupValue} />
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

export default HomePage
