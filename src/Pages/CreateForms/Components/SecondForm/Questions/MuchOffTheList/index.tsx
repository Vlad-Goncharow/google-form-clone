import React from 'react'
import { useDispatch } from 'react-redux'
import { AddOneOffTheListVarian, DeleteVariantName } from '../../../../../../Redux/actions/QuestionsActions'
import {
  AddNewQuestionActionPayLoad,
  AddOneOffTheListVariantPayload,
  DeleteOneOffTheListVariantNamePayLoad,
  QuestionOneOfTheList
} from '../../../../../../Redux/Types/QuestionsTypes'
import s from './MuchOffTheList.module.scss'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { v1 as uuidv1 } from 'uuid';

import { FormContext} from '../../../../index'
import { FormTypeObject } from '../../../../../../Redux/Types/FormsTypes'
import VariantName from '../VariantName'

interface OneOfTheListProps {
  item: AddNewQuestionActionPayLoad
  active: number;
  itemIndex: number;
}
const MuchOffTheList: React.FC<OneOfTheListProps> = ({ item, itemIndex, active }) => {
  const { Form }: any = React.useContext(FormContext);
  const dispatch = useDispatch()

  const addVariant = (Form: FormTypeObject,obj: AddOneOffTheListVariantPayload) => {
    dispatch(AddOneOffTheListVarian(Form,obj))
  }

  const deleteVariantt = (Form: FormTypeObject,obj: DeleteOneOffTheListVariantNamePayLoad) => {
    dispatch(DeleteVariantName(Form,obj))
  }
  return (
    <div>
      {
        item.questionOneOfTheList?.map((el: QuestionOneOfTheList,index:number) =>
          <div className={s.item} key={`${index}_variant`}>
            <div className={s.iconLeft}>
              <CheckBoxOutlineBlankIcon className={s.left} />
            </div>
            <div className={s.nameItem}>
              <VariantName item={item} variant={el} />
              <label htmlFor="name">
                <ImageOutlinedIcon />
              </label>
              <div className={s.hoverItem}></div>
            </div>
            {
              itemIndex === active ?
                <div className={s.right}>
                  <div className={s.iconRight} onClick={() => deleteVariantt(
                    Form,
                  {
                    questionId: item.questionId,
                    parentId: item.parentId,
                    oneOfTheListId: el.oneOfTheListId,
                  })}>
                    <CloseOutlinedIcon />
                  </div>
                </div>
                : null
            }
          </div>
        )
      }
      {
        itemIndex === active ?
          <div className={s.addVAr}>
            <div className={s.iconLeft}>
              <CheckBoxOutlineBlankIcon className={s.left} />
            </div>
            <button onClick={() => {
              addVariant(
                Form,
                {
                  questionId: item.questionId,
                  oneOfTheListId: uuidv1(),
                  parentId: item.parentId,
                  oneOfTheListName: `Вариант ${item.questionOneOfTheList.length + 1}`
                })
            }}
            >
              добавить вариант
            </button>
          </div>
          : null
      }
    </div>
  )
}

export default MuchOffTheList
