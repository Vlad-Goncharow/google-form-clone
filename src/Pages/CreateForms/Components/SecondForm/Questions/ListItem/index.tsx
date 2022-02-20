import React from 'react'
import { useQuesitonActions } from '../../../../../../hooks/UseActions'
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import VariantName from '../VariantName'
import s from './ListItem.module.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface ListItemProps {
  el: QuestionOneOfTheList
  variantIndex: number
  item: AddNewQuestionActionPayLoad
  active: number
  itemIndex: number
  activeQuestion: number | null
  setAcitoveQuesiton: (num: number) => void
  CheckTypeIconVariante:(num:number) => any
}

const ListItem: React.FC<ListItemProps> = ({ 
  el, 
  variantIndex, 
  item, 
  active, 
  itemIndex, 
  activeQuestion, 
  setAcitoveQuesiton, 
  CheckTypeIconVariante 
}) => {
  const { currentForm } = useTypeSelector(store => store.createForm)

  const { DeleteVariantName } = useQuesitonActions()

  const deleteVariantt = () => {
    DeleteVariantName(currentForm, {
      questionId: item.questionId,
      parentId: item.parentId,
      oneOfTheListId: el.oneOfTheListId,
    })
  }
  return (
    <div className={s.item} key={`${variantIndex}_variant`}>
      <div className={s.iconLeft}>
        {CheckTypeIconVariante(variantIndex + 1)}
      </div>

      <div className={s.nameItem} onClick={() => setAcitoveQuesiton(variantIndex)}>
        <VariantName item={item} variant={el} />
        <label>
          <ImageOutlinedIcon />
        </label>
        <div
          style={{ background: currentForm?.formTheme }}
          className={activeQuestion === variantIndex ? s.hoverItem : ''}
        ></div>
      </div>
      {
        itemIndex === active ?
          <div className={s.iconRight} onClick={deleteVariantt}>
            <CloseOutlinedIcon />
          </div>
          :
          null
      }
    </div>
  )
}

export default ListItem