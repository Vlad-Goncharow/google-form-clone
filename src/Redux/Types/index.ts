import { 
  AddFormAction, 
  DeleteFormAction, 
  RenameFormAction, 
  ChangeFormTheme,
  startLaoding,
  finishLoading
} from "./FormsTypes";

import { 
  AddNewQuestionAction, 
  ChangeQuestionType, 
  RemoveQuestionAction, 
  ChangeQuestionNameAction, 
  ChangeQuestionRequiredAction, 
  AddOneOfTheListAction,
  ChangeOneOffTheListVariantName,
  DeleteOneOffTheListVariantName,
  QuestionDesctIsActiveAction,
  ChangeQuestionDesctAction
} from "./QuestionsTypes";

export enum FormActionsTypes {
  ADD_NEW_FORM = 'ADD_NEW_FORM',
  LOADING_FORM_START = 'LOADING_FORM_START',
  LOADING_FORM_FINISH = 'LOADING_FORM_FINISH',
  LOADING_FORM_ERROR = 'LOADING_FORM_SERROR',
  DELETE_FORM = 'DELETE_FORM',
  RENAME_FORM = 'RENAME_FORM',
  RENAME_FORM_DESCR = 'RENAME_FORM_DESCR',
  CHANGE_FORM_THEME = 'CHANGE_FORM_THEME',
  ADD_NEW_QUESTION = 'ADD_NEW_QUESTION',
  REMOVE_QUESTION = 'REMOVE_QUESTION',
  CHANGE_QUESTION_TYPE = 'CHANGE_QUESTION_TYPE',
  CHANGE_QUESTION_NAME = 'CHANGE_QUESTION_NAME',
  CHANGE_QUESTION_REQUIRED = 'CHANGE_QUESTION_REQUIRED',
  CHANGE_QUESTION_ONEOFFTHELIST = 'CHANGE_QUESTION_ONEOFFTHELIST',
  ADD_ONEOFFTHELIST_VARIANT = 'ADD_ONEOFFTHELIST_VARIANT',
  CHANGE_ONEOFFTHELIST_VARIANTNAME = 'CHANGE_ONEOFFTHELIST_VARIANTNAME',
  DELETE_ONEOFFTHELIST_VARIANTNAME = ' DELETE_ONEOFFTHELIST_VARIANTNAME',
  SET_DESCR_ISACTIVE = ' SET_DESCR_ISACTIVE',
}

export type FormAction = startLaoding | 
finishLoading | 
AddFormAction | 
DeleteFormAction | 
RenameFormAction | 
AddNewQuestionAction | 
ChangeQuestionType | 
RemoveQuestionAction | 
ChangeQuestionNameAction | 
ChangeQuestionRequiredAction | 
ChangeFormTheme |  
AddOneOfTheListAction | 
ChangeOneOffTheListVariantName | 
DeleteOneOffTheListVariantName |
QuestionDesctIsActiveAction | 
ChangeQuestionDesctAction 
