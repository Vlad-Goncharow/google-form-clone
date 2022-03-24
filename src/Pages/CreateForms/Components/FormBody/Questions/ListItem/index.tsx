import React from 'react'
import { useQuesitonActions } from '../../../../../../hooks/UseActions'
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import VariantName from '../VariantName'
import s from './ListItem.module.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useOnClickOutside } from '../../../../../../hooks/useOnClickOutside'

interface ListItemProps {
  variant: QuestionOneOfTheList
  variantIndex: number
  question: AddNewQuestionActionPayLoad
  active: number
  itemIndex: number
  activeQuestion: number | null
  setAcitoveQuesiton: (num: number) => void
  CheckTypeIconVariante: (num: number) => any
}

const ListItem: React.FC<ListItemProps> = ({
  variant,
  variantIndex,
  question,
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
      questionId: question.questionId,
      parentId: question.parentId,
      oneOfTheListId: variant.oneOfTheListId,
    })
  }

  const [a, setA] = React.useState(false)
  const ref = React.useRef(null)
  useOnClickOutside(ref, () => setA(false))

  return (
    <div ref={ref} onClick={() => setA(true)} className={s.item} key={`${variantIndex}_variant`}>
      <div className={s.iconLeft}>
        {CheckTypeIconVariante(variantIndex + 1)}
      </div>

      <div className={s.nameItem} onClick={() => setAcitoveQuesiton(variantIndex)}>
        <VariantName question={question} variant={variant} />
        {
          a &&
          <div
            style={{ background: currentForm?.formTheme }}
            className={activeQuestion === variantIndex ? s.hoverItem : ''}
          ></div>
        }
        
      </div>
      {
        itemIndex === active &&
        <div className={s.flex}>
          {
            a&&
              <button className={s.image}>
                <ImageOutlinedIcon />
              </button>
          }
          <button onClick={deleteVariantt}>
            <CloseOutlinedIcon />
          </button>
        </div>
      }
    </div>
  )
}

export default ListItem