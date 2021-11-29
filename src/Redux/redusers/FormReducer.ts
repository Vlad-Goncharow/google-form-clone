
import { FormActionsTypes, FormAction } from '../Types'

import { formsState, FormTypeObject} from '../Types/FormsTypes'

import { RemoveQuestionActionPayLoad, ChangeQuestionActionPayLoad, ChangeQuestionNamePayload, AddNewQuestionActionPayLoad, QuestionOneOfTheList } from '../Types/QuestionsTypes'



const initialState: formsState = {
    form: [],
    error:'',
    isLoading:false
}

export function createForm(state = initialState, action: FormAction): formsState {
    switch (action.type) {
        case FormActionsTypes.LOADING_FORM_START:
            return{
                ...state,
                isLoading:true
            }
        case FormActionsTypes.LOADING_FORM_FINISH:
            return{
                ...state,
                isLoading:false,
                form:action.paylaod
            }
        case FormActionsTypes.ADD_NEW_FORM:
            return {
                ...state, form: [...state.form, action.payload]
            }
        case FormActionsTypes.RENAME_FORM :
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            formName: action.payload.formName
                        }
                    }
                    return item
                })
            }
        case FormActionsTypes.DELETE_FORM :
            return {
                ...state,
                form: state.form.filter((form: FormTypeObject) => form.id !== action.payload.id)
            }
        case FormActionsTypes.CHANGE_FORM_THEME :
            return {
                ...state,
                form:state.form.map((item:FormTypeObject) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            formTheme:action.payload.formTheme,
                            formThemeBackGround: action.payload.formThemeBackGround
                        }
                    }
                    return item
                })
            }
        case FormActionsTypes.ADD_NEW_QUESTION:
            return {
                ...state, form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId) {
                        return {
                            ...item,
                            questions: [...item.questions, action.payload]
                        }
                    }return item
                })
            }
        case FormActionsTypes.REMOVE_QUESTION:
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId) {
                        return {
                            ...item,
                            questions: item.questions.filter((el: RemoveQuestionActionPayLoad) => el.questionId !== action.payload.questionId)
                        }
                    } return item
                })
            }
        case FormActionsTypes.CHANGE_QUESTION_REQUIRED:
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId) {
                        return {
                            ...item,
                            questions: item.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        requiredQuestion: !el.requiredQuestion
                                    }
                                }
                                return el
                            })
                        }
                    } return item
                })
            }
        case FormActionsTypes.CHANGE_QUESTION_TYPE:
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId){
                        return {
                            ...item,
                            questions: item.questions.map((el: ChangeQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionType: action.payload.questionType,
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return item
                })
            }
        case FormActionsTypes.ADD_ONEOFFTHELIST_VARIANT:
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId) {
                        return {
                            ...item,
                            questions: item.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionOneOfTheList:[...el.questionOneOfTheList,{
                                            oneOfTheListName: action.payload.oneOfTheListName,
                                            oneOfTheListId: action.payload.oneOfTheListId
                                        }]
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return item
                })
            }
        case FormActionsTypes.CHANGE_QUESTION_NAME:
            return {
                ...state,
                form: state.form.map((item: FormTypeObject) => {
                    if (item.id === action.payload.parentId) {
                        return {
                            ...item,
                            questions: item.questions.map((el: ChangeQuestionNamePayload) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionName: action.payload.questionName
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return item
                })
            }
        case FormActionsTypes.CHANGE_ONEOFFTHELIST_VARIANTNAME :
            return {
                ...state,
                form: state.form.map((form: FormTypeObject) => {
                    if(form.id === action.payload.parentId){
                        return{
                            ...form,
                            questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionOneOfTheList: el.questionOneOfTheList.map((variant: QuestionOneOfTheList) => {
                                            if (variant.oneOfTheListId === action.payload.oneOfTheListId){
                                                return{
                                                    ...variant,
                                                    oneOfTheListName:action.payload.oneOfTheListName
                                                }
                                            }
                                            return variant
                                        })
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return form
                })
            }
        case FormActionsTypes.DELETE_ONEOFFTHELIST_VARIANTNAME:
            return {
                ...state,
                form: state.form.map((form: FormTypeObject) => {
                    if (form.id === action.payload.parentId) {
                        return {
                            ...form,
                            questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionOneOfTheList: el.questionOneOfTheList.filter((variant: QuestionOneOfTheList) => variant.oneOfTheListId !== action.payload.oneOfTheListId )
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return form
                })
            }
        case FormActionsTypes.SET_DESCR_ISACTIVE :
            return{
                ...state,
                form: state.form.map((form: FormTypeObject) => {
                    if (form.id === action.payload.parentId) {
                        return {
                            ...form,
                            questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionDescrIsActive: action.payload.questionDescrIsActive
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return form
                })
            };
        case FormActionsTypes.RENAME_FORM_DESCR:
            return {
                ...state,
                form: state.form.map((form: FormTypeObject) => {
                    if (form.id === action.payload.parentId) {
                        return {
                            ...form,
                            questions: form.questions.map((el: AddNewQuestionActionPayLoad) => {
                                if (el.questionId === action.payload.questionId) {
                                    return {
                                        ...el,
                                        questionDescr: action.payload.questionDescr
                                    }
                                }
                                return el
                            })
                        }
                    }
                    return form
                })
            }
        default:
            return state
    }
}