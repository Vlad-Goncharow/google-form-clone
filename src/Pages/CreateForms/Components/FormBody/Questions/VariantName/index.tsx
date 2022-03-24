import React, { ChangeEvent } from 'react'
import { AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import s from './VariantName.module.scss'
import debounce from '@mui/utils/debounce';
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector';
import { useQuesitonActions } from '../../../../../../hooks/UseActions';

interface VariantNameProps {
  question: AddNewQuestionActionPayLoad;
  variant: QuestionOneOfTheList
}

const VariantName: React.FC<VariantNameProps> = React.memo(({ question, variant}) => {
  React.useEffect(()=>{
    console.log('rerender')
  },[])
  const { ChangeVariantName } = useQuesitonActions()

  const { currentForm } = useTypeSelector(store => store.createForm)
  
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    ChangeVariantName(currentForm, {
      questionId: question.questionId,
      parentId: question.parentId,
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
})

export default VariantName
