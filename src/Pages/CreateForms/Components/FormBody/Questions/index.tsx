import React from 'react'
import TextArea from './TextArea'
import TextString from './TextString'
import { AddNewQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes'
import List from './List'

interface Questionsprops {
  question: AddNewQuestionActionPayLoad
  active:number
  itemIndex:number
}

export const Questions: React.FC<Questionsprops> = ({ question, active, itemIndex}) =>{
  switch (question.questionType) {
    case 'Текст (строка)':
      return <TextString />
    case 'Текст (абзац)':
      return <TextArea />
    case 'Один из списка':
    case 'Несколько из списка' :
    case 'Раскрывающийся список':
      return <List active={active} itemIndex={itemIndex} question={question} />
    default :
      return null
  }
}

