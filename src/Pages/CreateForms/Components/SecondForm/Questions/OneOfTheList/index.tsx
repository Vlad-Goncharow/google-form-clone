import React from 'react'
import { useDispatch } from 'react-redux'
import { AddOneOffTheListVarian, DeleteVariantName } from '../../../../../../Redux/actions/QuestionsActions'
import {
  AddNewQuestionActionPayLoad,
  AddOneOffTheListVariantPayload,
  DeleteOneOffTheListVariantNamePayLoad,
  QuestionOneOfTheList
} from '../../../../../../Redux/Types/QuestionsTypes'
import s from './OneOfTheList.module.scss'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { v1 as uuidv1 } from 'uuid';
import { FormContext } from '../../../..'
import { FormTypeObject } from '../../../../../../Redux/Types/FormsTypes'
import VariantName from '../VariantName'

interface OneOfTheListProps {
  item: AddNewQuestionActionPayLoad;
  active: number;
  itemIndex: number;
}
const OneOfTheList: React.FC<OneOfTheListProps> = ({ item, itemIndex, active }) => {
  const { Form }: any = React.useContext(FormContext);
  const dispatch = useDispatch()

  const addVariant = (Form: FormTypeObject, obj: AddOneOffTheListVariantPayload) => {
    dispatch(AddOneOffTheListVarian(Form, obj))
  }

  const deleteVariantt = (Form: FormTypeObject, obj: DeleteOneOffTheListVariantNamePayLoad) => {
    dispatch(DeleteVariantName(Form, obj))
  }
  return (
    <div className={s.row}>
      {item.questionOneOfTheList?.map((el: QuestionOneOfTheList, index: number) =>
        //Если вопрос не активный тобиш не открыт, не показывать иконки удаления вариантов
        <div className={s.item} key={`${index}_variant`}>
          <div className={s.iconLeft}>
            <RadioButtonUncheckedOutlinedIcon className={s.left} />
          </div>

          <div className={s.nameItem}>
            <VariantName item={item} variant={el} />
            <label>
              <ImageOutlinedIcon />
            </label>
            <div className={s.hoverItem}></div>
          </div>
          {
            itemIndex === active ?
              <div className={s.iconRight} onClick={() => {
                deleteVariantt(Form, {
                  questionId: item.questionId,
                  parentId: item.parentId,
                  oneOfTheListId: el.oneOfTheListId,
                })
              }}>
                <CloseOutlinedIcon />
              </div>
              :
              null
          }
        </div>
      )}
      {
        itemIndex === active ?
          <div className={s.addVAr}>
            <div className={s.iconLeft}>
              <RadioButtonUncheckedOutlinedIcon className={s.left} />
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

export default OneOfTheList