import React from 'react'
import TextArea from './TextArea'
import TextString from './TextString'
import { AddNewQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes'
import List from './List'

interface Questionsprops {
  item: AddNewQuestionActionPayLoad
  active:number
  itemIndex:number
}

export const Questions: React.FC<Questionsprops> = ({ item, active, itemIndex}) =>{
  switch (item.questionType) {
    case 'Текст (строка)':
      return <TextString />
    case 'Текст (абзац)':
      return <TextArea />
    case 'Один из списка':
    case 'Несколько из списка' :
    case 'Раскрывающийся список':
      return <List active={active} itemIndex={itemIndex} item={item} />
    default :
      return null
  }
}

