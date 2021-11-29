import { FormActionsTypes } from "../Types";

export interface FormTypeObject {
  formName: string,
  formDateChange?: string,
  id: string,
  questions: any,
  formTheme:string,
  formThemeBackGround:string,
  formId?:number
}

export interface formsState {
  form: Array<FormTypeObject>;
  isLoading:boolean;
  error:string
}

export interface AddFormAction {
  type: FormActionsTypes.ADD_NEW_FORM;
  payload: FormTypeObject
}



//=====Удалить форма /delete form
export interface DeleteFormAction {
  type: FormActionsTypes.DELETE_FORM;
  payload: DeleteFormPayload
}
export interface DeleteFormPayload {
  id: string
}
//=====Удалить форма /delete form



//======Изменть имя вопроса /change form name
export interface RenameFormAction {
  type: FormActionsTypes.RENAME_FORM;
  payload: RenameFormPayLoad
}
export interface RenameFormPayLoad {
  id: string | number;
  formName: string;
}
//======Изменть имя вопроса /change form name



//======Изменть тему /change theme
export interface ChangeFormTheme {
  type:FormActionsTypes.CHANGE_FORM_THEME,
  payload: ChangeFormThemePayLoad
}
export interface ChangeFormThemePayLoad {
  id: string | number,
  formTheme: string,
  formThemeBackGround: string
}
//======Изменть тему /change theme



//======загрузка форм/form loading
export interface startLaoding{
  type:FormActionsTypes.LOADING_FORM_START
}
export interface finishLoading{
  type:FormActionsTypes.LOADING_FORM_FINISH,
  paylaod: FormTypeObject[]
}
//======загрузка форм/form loading