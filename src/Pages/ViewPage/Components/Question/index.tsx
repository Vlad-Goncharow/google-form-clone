import React from 'react'
import { AddNewQuestionActionPayLoad } from '../../../../Redux/Types/QuestionsTypes'
import {MuchOffTheList} from './MuchOffTheList'
import {OneOffTheList} from './OneOffTheList'
import TextArea from './TextArea'
import TextString from './TextString'
import s from './Question.module.scss'

interface QuestionProps{
  item: AddNewQuestionActionPayLoad
}

export const Question: React.FC<QuestionProps> = ({item}) => {
  function checkItem(item: AddNewQuestionActionPayLoad) {
    switch (item.questionType){
      case 'Текст (строка)':
        return <TextString />
      case 'Текст (абзац)':
        return <TextArea  />
      case 'Один из списка':
        return <OneOffTheList item={item} />
      case 'Несколько из списка':
        return <MuchOffTheList item={item}/>
    }
  }

  return (
    <div className={s.item}>
      {
        item.requiredQuestion ?
          <div style={{color:'red',marginBottom:'18px'}}>*</div>
          : null
      }
      <h2 className={s.name}>{item.questionName}</h2>
      {
        item.questionDescr.length > 1 &&
        <div>{item.questionDescr}</div>
      }
      {
        checkItem(item)
      }
    </div>
  )
}