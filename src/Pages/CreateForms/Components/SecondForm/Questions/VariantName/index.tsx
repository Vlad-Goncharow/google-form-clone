import React from 'react'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import s from './VariantName.module.scss'
import debounce from '@mui/utils/debounce';
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector';
import { useQuesitonActions } from '../../../../../../hooks/UseActions';

interface VariantNameProps {
  item: AddNewQuestionActionPayLoad;
  variant: QuestionOneOfTheList
}

const VariantName: React.FC<VariantNameProps> = ({ item, variant}) => {
  const { ChangeVariantName } = useQuesitonActions()

  const { currentForm } = useTypeSelector(store => store.createForm)
  
  const changeName = (e:any) => {
    ChangeVariantName(currentForm, {
      questionId: item.questionId,
      parentId: item.parentId,
      oneOfTheListId: variant.oneOfTheListId,
      oneOfTheListName: e.target.value
    })
  }
  const debouncedChangeHandler = debounce(changeName, 2000);
  
  return (
    <input 
      type="text" 
      className={s.name} 
      defaultValue={variant.oneOfTheListName} 
      onChange={debouncedChangeHandler} 
    />
  )
}

export default VariantName
