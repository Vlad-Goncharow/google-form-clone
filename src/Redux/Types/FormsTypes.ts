import { FormActionsTypes } from "../Types";

export interface FormTypeObject {
  formName: string,
  formDateChange?: string,
  id: string,
  questions: any,
  formTheme:string,
  formThemeBackGround:string,
  formId?:number,
  FormDescr:string,
  formColors: string[]
}

export interface formsState {
  form: FormTypeObject[];
  isLoading:boolean;
  error:string
  currentForm: FormTypeObject | null;
}

export interface AddFormAction {
  type: FormActionsTypes.ADD_NEW_FORM;
  payload: FormTypeObject
}



//=====Удалить форму /delete form
export interface SetCurrentForm {
  type: FormActionsTypes.SET_CURRENT_FORM;
  payload: string
}
//=====Удалить форму /delete form



//=====Удалить форму /delete form
export interface DeleteFormAction {
  type: FormActionsTypes.DELETE_FORM;
  payload: DeleteFormPayload
}
export interface DeleteFormPayload {
  id: string
}
//=====Удалить форму /delete form



//=====Изменить описание формы /change form descr
export interface ChangeFormDescrAction{
  type:FormActionsTypes.CHANGE_FORM_DESCR
  payload: ChangeFormDescrPayload
}
export interface ChangeFormDescrPayload{
  id: string;
  FormDescr: string;
}
//=====Изменить описание формы /change form descr



//======Изменить имя вопроса /change form name
export interface RenameFormAction {
  type: FormActionsTypes.RENAME_FORM;
  payload: RenameFormPayLoad
}
export interface RenameFormPayLoad {
  id: string | number;
  formName: string;
}
//======Изменить имя вопроса /change form name



//======Изменить тему /change theme
export interface ChangeFormTheme {
  type:FormActionsTypes.CHANGE_FORM_THEME,
  payload: ChangeFormThemePayLoad
}
export interface ChangeFormThemePayLoad {
  id: string | number,
  formTheme: string,
  formThemeBackGround: string
}
//======Изменить тему /change theme



//======добавить новый цвет /add new theme color
export interface AddNewThemeColor {
  type: FormActionsTypes.ADD_NEW_THEME_COLOR,
  payload: AddNewThemeColorPayLoad
}
export interface AddNewThemeColorPayLoad {
  id: string | number,
  themeColor:string;
  formTheme: string
  formThemeBackGround: string
}
//======добавить новый цвет /add new theme color



//======загрузка форм/form loading
export interface startLaoding{
  type:FormActionsTypes.LOADING_FORM_START
}
export interface finishLoading{
  type:FormActionsTypes.LOADING_FORM_FINISH,
  payload: FormTypeObject[]
}
//======загрузка форм/form loading