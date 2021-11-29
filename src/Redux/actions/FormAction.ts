import axios from "axios"
import { Dispatch } from "react"
import { FormAction, FormActionsTypes } from "../Types"

import { FormTypeObject, RenameFormPayLoad, ChangeFormThemePayLoad, DeleteFormPayload} from "../Types/FormsTypes"

export const addForm = (form: FormTypeObject) => {
    return async (dispatch: Dispatch<FormAction>) =>{
        try{
            await axios.post('https://6115dc868f38520017a385df.mockapi.io/form', form).then(pre => {
                const {data} = pre
                dispatch({
                    type: FormActionsTypes.ADD_NEW_FORM,
                    payload: data
                })
            })
        } catch(e) {
           alert('Не удалось создать форму, попробуйте еще') 
        }
    }
}

export const onLoadForms = () => {
    return async (dispatch: Dispatch<FormAction>) => {
        try{
            dispatch({ type: FormActionsTypes.LOADING_FORM_START })
            const { data } = await axios.get<FormTypeObject[]>('https://6115dc868f38520017a385df.mockapi.io/form')
            dispatch({ type: FormActionsTypes.LOADING_FORM_FINISH,paylaod:data })
        } catch(e) {
            alert('При закгрузки произошла ошибка, попробуйте еще раз')
        }
    }
}

export const RenameForm = (form: FormTypeObject | undefined,obj: RenameFormPayLoad) => {
    return async (dispatch: Dispatch<FormAction>) => {
        try{
            dispatch({
                type: FormActionsTypes.RENAME_FORM,
                payload: obj
            })
            await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, { ...form, formName: obj.formName })
        } catch(e) {
            alert('При изменении произошла ошибка попробуйте еще раз')
        }
    }
}

export const changeFormTheme = (form: FormTypeObject | undefined,obj: ChangeFormThemePayLoad) => {
    return async (dispatch: Dispatch<FormAction>) => {
        try{
            dispatch({
                type: FormActionsTypes.CHANGE_FORM_THEME,
                payload: obj
            })
            await axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
                ...form,
                formTheme: obj.formTheme,
                formThemeBackGround: obj.formThemeBackGround
            })
        } catch(e) {
            alert('При изменении темы произошла ошибка, попробуйте еще рах')
        }
    }
}

export const DeleteForm = (form: FormTypeObject,obj:DeleteFormPayload) => {
    return async (dispatch: Dispatch<FormAction>) => {
        try{
            await axios.delete(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`,)
            dispatch({
                type: FormActionsTypes.DELETE_FORM,
                payload: obj
            })
        } catch(e){
            alert('При удалении формы произошла ошибка, попробуйте еще раз')
        }
    }
}