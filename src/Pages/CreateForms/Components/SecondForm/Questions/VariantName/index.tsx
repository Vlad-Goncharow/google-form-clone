import React from 'react'
import { AddNewQuestionActionPayLoad, ChangeOneOffTheListVariantNamePayLoad, QuestionOneOfTheList } from '../../../../../../Redux/Types/QuestionsTypes'
import s from './VariantName.module.scss'
import { ChangeVariantName } from '../../../../../../Redux/actions/QuestionsActions';
import { useDispatch } from 'react-redux';
import debounce from '@mui/utils/debounce';
import { FormContext } from '../../../..';
import { FormTypeObject } from '../../../../../../Redux/Types/FormsTypes';

interface VariantNameProps {
  item: AddNewQuestionActionPayLoad;
  variant: QuestionOneOfTheList
}

const VariantName: React.FC<VariantNameProps> = ({ item, variant}) => {
  const dispatch = useDispatch()
  const { Form }: any = React.useContext(FormContext);
  
  const changeName = (Form:FormTypeObject,obj: ChangeOneOffTheListVariantNamePayLoad) => {
    dispatch(ChangeVariantName(Form,obj))
  }
  const debouncedChangeHandler = debounce(changeName, 2000);
  
  return (
    <input id='name' type="text" className={s.name} defaultValue={variant.oneOfTheListName} onChange={(e) => {
      debouncedChangeHandler(Form,{
        questionId: item.questionId,
        parentId: item.parentId,
        oneOfTheListId: variant.oneOfTheListId,
        oneOfTheListName: e.target.value
      })
    }} />
  )
}

export default VariantName
