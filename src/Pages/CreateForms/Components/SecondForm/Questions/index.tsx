import React from 'react'
import TextArea from './TextArea'
import TextString from './TextString'
import OneOfTheList from './OneOfTheList'
import { AddNewQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes'
import MuchOffTheList from './MuchOffTheList'
import OpenList from './OpenList'

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
      return <OneOfTheList active={active} itemIndex={itemIndex}  item={item} />
    case 'Несколько из списка':
      return <MuchOffTheList active={active} itemIndex={itemIndex} item={item} />
    case 'Раскрывающийся список':
      return <OpenList active={active} itemIndex={itemIndex} item={item} />
    default :
      return null
  }
}

