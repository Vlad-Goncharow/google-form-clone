import axios from "axios"
import { Dispatch } from "react"
import { getTime } from "../../helper"
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
    dispatch({
      type: FormActionsTypes.ADD_NEW_QUESTION,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: [...form.questions, obj]
      })
    } catch (e) {
      alert('При добовлении вопроса произошла ошибка, попробуйте еще раз')
    }
  }
}

export const RemoveQuestion = (form: FormTypeObject, obj: RemoveQuestionActionPayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.REMOVE_QUESTION,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form.questions.filter((el: AddNewQuestionActionPayLoad) => el.questionId !== obj.questionId)
      })
    } catch (e) {
      alert('При удалении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeQuestionType = (form: FormTypeObject | null, obj: ChangeQuestionActionPayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.CHANGE_QUESTION_TYPE,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
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

export const ChangeQuestionName = (form: FormTypeObject, obj: ChangeQuestionNamePayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.CHANGE_QUESTION_NAME,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        formDateChange: getTime(),
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
    } catch (e) {
      alert('При изменении вопроса произошла ошибка, попробуйте езе раз')
    }
  }
}

export const ChangeDescrIsActive = (form: FormTypeObject | null, obj: QuestionDesctIsActivePayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.SET_DESCR_ISACTIVE,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
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
    dispatch({
      type: FormActionsTypes.RENAME_QUESTION_DESCR,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form.formId}`, {
        ...form,
        formDateChange: getTime(),
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

export const ChangeQuestionRequired = (form: FormTypeObject | null, obj: ChangeQuestionRequiredPayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.CHANGE_QUESTION_REQUIRED,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
          if (el.questionId === obj.questionId) {
            return {
              ...el,
              requiredQuestion: !el.requiredQuestion
            }
          }
          return el
        })
      })
    } catch (e) {
      alert('произошла ошибка, попробуйте езе раз')
    }
  }
}

export const AddOneOffTheListVarian = (form: FormTypeObject | null, obj: AddOneOffTheListVariantPayload) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.ADD_ONEOFFTHELIST_VARIANT,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
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
    } catch (e) {
      alert('При добовлении варианта произошла ошибка, попробуйте еще раз')
    }
  }
}

export const ChangeVariantName = (form: FormTypeObject | null, obj: ChangeOneOffTheListVariantNamePayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.CHANGE_ONEOFFTHELIST_VARIANTNAME,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
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

export const DeleteVariantName = (form: FormTypeObject | null, obj: DeleteOneOffTheListVariantNamePayLoad) => {
  return async (dispatch: Dispatch<FormAction>) => {
    dispatch({
      type: FormActionsTypes.DELETE_ONEOFFTHELIST_VARIANTNAME,
      payload: obj
    })
    try {
      axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
        ...form,
        formDateChange: getTime(),
        questions: form?.questions.map((el: AddNewQuestionActionPayLoad) => {
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