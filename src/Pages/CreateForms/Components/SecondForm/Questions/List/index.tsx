import React from 'react'
import { AddNewQuestionActionPayLoad,QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import ListItem from '../ListItem'
import s from './List.module.scss'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useQuesitonActions } from '../../../../../../hooks/UseActions';
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector';
import { v1 as uuidv1 } from 'uuid';
interface ListProps {
  item: AddNewQuestionActionPayLoad;
  active: number;
  itemIndex: number;
}

const List: React.FC<ListProps> = ({item,active,itemIndex}) => {
  const { AddOneOffTheListVarian} = useQuesitonActions()

  const { currentForm } = useTypeSelector(store => store.createForm)

  const addVariant = () => {
    AddOneOffTheListVarian(currentForm,
      {
        questionId: item.questionId,
        oneOfTheListId: uuidv1(),
        parentId: item.parentId,
        oneOfTheListName: `Вариант ${item.questionOneOfTheList.length + 1}`
      })
  }

  const CheckTypeIconVariante = (num:number) => {
    switch(item.questionType){
      case 'Один из списка' :
        return <RadioButtonUncheckedOutlinedIcon/>
      case 'Несколько из списка':
        return <CheckBoxOutlineBlankIcon/>
      case 'Раскрывающийся список':
        return num
      default : 
        return null
    }
  }

  //для бордера когда меняешь текст в варианте
  const [activeQuestion, setAcitoveQuesiton] = React.useState<number | null>(null)

  return (
    <div>
      {item.questionOneOfTheList.map((el: QuestionOneOfTheList,index:number)=>
        <ListItem 
          key={`${el.oneOfTheListId}_variant`} 
          el={el} 
          variantIndex={index}
          item={item}
          active={active}
          itemIndex={itemIndex}
          activeQuestion={activeQuestion}
          setAcitoveQuesiton={setAcitoveQuesiton}
          CheckTypeIconVariante={CheckTypeIconVariante}
        />
      )}
      {
        itemIndex === active ?
          <div className={s.addVAr}>
            <div className={s.iconLeft}>
              {CheckTypeIconVariante(item.questionOneOfTheList.length + 1)}
            </div>
            <button onClick={addVariant}>
              добавить вариант
            </button>
          </div>
          : null
      }
    </div>
  )
}

export default List