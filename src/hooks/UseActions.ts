import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as FormActions from '../Redux/actions/FormAction'
import * as QuestionActions from '../Redux/actions/QuestionsActions'


export const useFormActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(FormActions, dispatch)
}

export const useQuesitonActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(QuestionActions, dispatch)
}