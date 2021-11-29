import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../../../../hooks/useTypeSelector'
import { RenameForm } from '../../../../Redux/actions/FormAction'
import { FormTypeObject } from '../../../../Redux/Types/FormsTypes'
import s from './NameComp.module.scss'

interface NameCompProps {
  changePopupValue:(val:boolean) => void
  changeFormId:string
}

export const NameComp: React.FC<NameCompProps> = ({ changePopupValue, changeFormId}) => {
  const dispatch = useDispatch()
  //для фокуса при первом рендере
  const refInp = React.useRef<HTMLInputElement>(null)
  //что б найти обьект формы
  const {form} = useTypeSelector(store => store.createForm)
  //обьект формы
  const Form = form.find((el: FormTypeObject) => el.id === changeFormId)
  //текс в инпуте который при нажатии на ок отправтися в диспатч
  const [inpValue, setInpValue] = React.useState<string>('')
  const onInputChange = () => {
    if (inpValue.length !== 0){
      dispatch(RenameForm(Form, {
        id: changeFormId,
        formName: inpValue,
      }))
    }else{
      alert('Вы не изменили вопрос')
    }
  }
  React.useEffect(() => {
    refInp.current?.focus()
  }, [])
  
  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <h1 className={s.title}> Переиенование</h1>
        <h3 className={s.descr}>Введите новое название</h3>
        <form action="" className={s.form}>
          <input ref={refInp} type="text" defaultValue={Form?.formName} onChange={(e) => setInpValue(e.target.value)}  />
        </form>
        <div className={s.buttons}>
          <button className={`${s.btn} ${s.btnError}`} onClick={() => changePopupValue(false)}>Отмена</button>
          <button className={`${s.btn} ${s.btnSuccess}`} onClick={() => {
            changePopupValue(false)
            onInputChange()
          }}>Ок</button>
        </div>
      </div>
    </div>
  )
}

