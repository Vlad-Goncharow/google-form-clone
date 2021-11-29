import React from 'react'
import Header from './Components/Header'
import {Question} from './Components/Question'
import Footer from './Components/Footer'
import s from './ViewPage.module.scss'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { useParams } from 'react-router'
import { FormTypeObject } from '../../Redux/Types/FormsTypes'
import { AddNewQuestionActionPayLoad } from '../../Redux/Types/QuestionsTypes'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom'


function ViewPage() {
  const { form } = useTypeSelector(store => store.createForm)
  const {id}:any = useParams()
  const Form = form.find((el: FormTypeObject) => el.id === id)
  return (
    <div className={s.page}>
      <Header form={Form}/>
      <div className={s.items}>
        {
          Form?.questions?.map((el: AddNewQuestionActionPayLoad) =>
            <Question item={el} />
          )
        }
      </div>
      <Footer />
      <Link to={`/${id}`} className={s.changeForm}>
        <EditOutlinedIcon />
      </Link>
    </div>
  )
}

export default ViewPage
