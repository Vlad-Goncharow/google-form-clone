import axios from "axios"
import { Dispatch } from "react"
import { getTime } from "../../helper"
import { FormAction, FormActionsTypes } from "../Types"

import { FormTypeObject, RenameFormPayLoad, ChangeFormThemePayLoad, DeleteFormPayload, ChangeFormDescrPayload, AddNewThemeColorPayLoad} from "../Types/FormsTypes"

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
        dispatch({ type: FormActionsTypes.LOADING_FORM_START })
        try{
            const { data } = await axios.get<FormTypeObject[]>('https://6115dc868f38520017a385df.mockapi.io/form')
            dispatch({ type: FormActionsTypes.LOADING_FORM_FINISH, payload:data })
        } catch(e) {
            alert('При закгрузки произошла ошибка, попробуйте еще раз')
        }
    }
}
//Оставл null (потом удалить комент)
export const RenameForm = (form: FormTypeObject|null,obj: RenameFormPayLoad) => {
    return async (dispatch: Dispatch<FormAction>) => {
        dispatch({
            type: FormActionsTypes.RENAME_FORM,
            payload: obj
        })
        try{
            axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, { ...form, formDateChange: getTime(), formName: obj.formName })
        } catch(e) {
            alert('При изменении произошла ошибка попробуйте еще раз')
        }
    }
}
//Оставл null (потом удалить комент)
export const RenameFormDescr = (form: FormTypeObject, obj: ChangeFormDescrPayload) => {
    return async (dispatch: Dispatch<FormAction>) => {
        dispatch({
            type: FormActionsTypes.CHANGE_FORM_DESCR,
            payload: obj
        })
        try {
            axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, 
            { ...form, formDateChange: getTime(), FormDescr: obj.FormDescr })
        } catch (e) {
            alert('При изменении произошла ошибка попробуйте еще раз')
        }
    }
}

export const changeFormTheme = (form: FormTypeObject,obj: ChangeFormThemePayLoad) => {
    return async (dispatch: Dispatch<FormAction>) => {
        dispatch({
            type: FormActionsTypes.CHANGE_FORM_THEME,
            payload: obj
        })
        try{
            axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
                ...form,
                formDateChange: getTime(),
                formTheme: obj.formTheme,
                formThemeBackGround: obj.formThemeBackGround
            })
        } catch(e) {
            alert('При изменении темы произошла ошибка, попробуйте еще рах')
        }
    }
}

export const AddNewFormColorAction = (form: FormTypeObject, obj: AddNewThemeColorPayLoad) => {
    return async (dispatch: Dispatch<FormAction>) => {
        dispatch({
            type: FormActionsTypes.ADD_NEW_THEME_COLOR,
            payload: obj
        })
        try {
            axios.put(`https://6115dc868f38520017a385df.mockapi.io/form/${form?.formId}`, {
                ...form,
                formDateChange: getTime(),
                formColors: [...form.formColors, obj.themeColor],
                formTheme: obj.formTheme,
                formThemeBackGround: obj.formThemeBackGround
            })
            
        } catch (e) {
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

export const SetCurrentForm = (str:string) => {
    return (dispatch: Dispatch<FormAction>) => {
        dispatch({
            type: FormActionsTypes.SET_CURRENT_FORM,
            payload: str
        })
    }
}