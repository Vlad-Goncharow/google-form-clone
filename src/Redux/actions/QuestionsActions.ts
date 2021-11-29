import axios from "axios"
import { Dispatch } from "react"
import { FormAction, FormActionsTypes } from "../Types"
import { FormTypeObject } from "../Types/FormsTypes"
import { 
  AddNewQuestionActionPayLoad, 
  ChangeQuestionActionPayLoad, 
  RemoveQuestionActionPayLoad, 
  ChangeQuestionNamePayload, 
  ChangeQuestionRequiredPayload, 
  AddOneOffTheListVariantPayload,
  ChangeOneOffTheListVariantNamePayLoad,
  DeleteOneOffTheListVariantNamePayLoad,
  QuestionOneOfTheList,
  QuestionDesctIsActivePayload,
  ChangeQuestionDescrPayload
} from "../Types/QuestionsTypes"

export const addFormQuestion = (form: any | undefined, obj: AddNewQuestionActionPayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try{
      dispatch({
        type: FormActionsTypes.ADD_NEW_QUESTION,
        payload: obj
      })
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: [...form.questions, obj]
      })
    } catch(e){
      alert('При добовлении вопроса произошла ошибка, попробуйте еще раз')
    }
  }
}

export const RemoveQuestion = (form: FormTypeObject,obj: RemoveQuestionActionPayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try{
      dispatch({
        type: FormActionsTypes.REMOVE_QUESTION,
        payload: obj
      })
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.filter((el: AddNewQuestionActionPayLoad) => el.questionId !== obj.questionId)
      })
    }catch(e){
      alert('При удалении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeQuestionType = (form: FormTypeObject,obj: ChangeQuestionActionPayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try {
      dispatch({
        type: FormActionsTypes.CHANGE_QUESTION_TYPE,
        payload: obj
      })
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionType: obj.questionType,
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('При изменении типа вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeQuestionName = (form: FormTypeObject,obj: ChangeQuestionNamePayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try{
      dispatch({
        type: FormActionsTypes.CHANGE_QUESTION_NAME,
        payload: obj
      })

      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionName: obj.questionName
            }
          }
          return el
        })
      })
    } catch(e) {
      alert('При изменении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeDescrIsActive = (form: FormTypeObject, obj: QuestionDesctIsActivePayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try {
      dispatch({
        type: FormActionsTypes.SET_DESCR_ISACTIVE,
        payload: obj
      })

      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionDescrIsActive: obj.questionDescrIsActive
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('При изменении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeQuestionDescr = (form: FormTypeObject, obj: ChangeQuestionDescrPayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try {
      dispatch({
        type: FormActionsTypes.RENAME_FORM_DESCR,
        payload: obj
      })

      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionDescr: obj.questionDescr
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('При изменении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}


export const ChangeQuestionRequired = (form: FormTypeObject,obj: ChangeQuestionRequiredPayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.CHANGE_QUESTION_REQUIRED,
      payload: obj
    })
    try{
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              requiredQuestion: !el.requiredQuestion
            }
          }
          return el
        })
      })
    } catch(e) {
      alert('произошла ошибка, попробуйте езе раз')
    }
  }
}

export const AddOneOffTheListVarian = (form: FormTypeObject, obj: AddOneOffTheListVariantPayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try{
      dispatch({
        type: FormActionsTypes.ADD_ONEOFFTHELIST_VARIANT,
        payload: obj
      })

      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionOneOfTheList: [...el.questionOneOfTheList, {
                oneOfTheListName: obj.oneOfTheListName,
                oneOfTheListId: obj.oneOfTheListId
              }]
            }
          }
          return el
        })
      })
    }catch(e) {
      alert('При добовлении варианта произошла ошибка, попробуйте еще раз')
    }
  }
}

export const ChangeVariantName = (form: FormTypeObject,obj: ChangeOneOffTheListVariantNamePayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try {
      dispatch({
        type: FormActionsTypes.CHANGE_ONEOFFTHELIST_VARIANTNAME,
        payload: obj
      })
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionOneOfTheList: el.questionOneOfTheList.map((el: QuestionOneOfTheList) => {
                if (obj.oneOfTheListId === el.oneOfTheListId) {
                  return {
                    ...el,
                    oneOfTheListName: obj.oneOfTheListName
                  }
                }
                else return el
              })
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('При изменении варианта произошла ошибка, попробуйте еще раз')
    }
  }
}

export const DeleteVariantName = (form: FormTypeObject,obj: DeleteOneOffTheListVariantNamePayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    try {
      dispatch({
        type: FormActionsTypes.DELETE_ONEOFFTHELIST_VARIANTNAME,
        payload: obj
      })
      await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              questionOneOfTheList: el.questionOneOfTheList.filter((vari: QuestionOneOfTheList) => vari.oneOfTheListId !== obj.oneOfTheListId)
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('При удалении варианта произошла ошибка, попробуйте еще раз')
    }
  }
}