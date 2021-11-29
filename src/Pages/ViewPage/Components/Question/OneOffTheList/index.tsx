import React from 'react'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../Redux/Types/QuestionsTypes'
import s from './OneOffTheList.module.scss'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface OneOffTheListProps {
  item: AddNewQuestionActionPayLoad
}

export const OneOffTheList: React.FC<OneOffTheListProps> = ({ item }) => {
  const [isCheck, setIsCheck] = React.useState<null | number>(null)
  return (
    <div>
      {
        item.questionOneOfTheList?.map((el: QuestionOneOfTheList, index: number) =>
          <div key={`variant_${el.oneOfTheListId}`} className={s.variant} onClick={() => setIsCheck(index)}>
            {
              item.questionDescr.length > 1 &&
              <span>qwe</span>
            }
            <button className={isCheck === index ? s.icon + ' ' + s.icon_active : s.icon}>
              {
                isCheck === index ?
                  <RadioButtonCheckedIcon />
                  :
                  <RadioButtonUncheckedIcon />
              }
            </button>
            <div className={s.name}>{el.oneOfTheListName}</div>
          </div>
        )
      }
    </div>
  )
}

