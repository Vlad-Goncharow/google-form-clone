import React from 'react'
import s from './MuchOffTheList.module.scss'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../Redux/Types/QuestionsTypes';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface MuchOffTheListProps {
  item: AddNewQuestionActionPayLoad
}

export const MuchOffTheList: React.FC<MuchOffTheListProps> = ({ item }) => {
  const [isCheck, setIsCheck] = React.useState<null | number>(null)
  return (
    <div>
      {
        item.questionOneOfTheList?.map((el: QuestionOneOfTheList, index: number) =>
          <div key={`variant_${el.oneOfTheListId}`} className={s.variant} onClick={() => setIsCheck(index)}>
            {
              item.questionDescr.length > 1 &&
              <div>{item.questionDescr}</div>
            }
            <button className={isCheck === index ? s.icon + ' ' + s.icon_active : s.icon}>
              {
                isCheck === index ?
                  <CheckBoxIcon />
                  :
                  <CheckBoxOutlineBlankIcon />
              }
            </button>
            <div className={s.name}>{el.oneOfTheListName}</div>
          </div>
        )
      }
    </div>
  )
}

