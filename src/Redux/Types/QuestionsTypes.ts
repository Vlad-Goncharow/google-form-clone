import { FormActionsTypes } from "../Types";


//========Новый вопрос /new question
export interface AddNewQuestionAction {
  type: FormActionsTypes.ADD_NEW_QUESTION;
  payload: AddNewQuestionActionPayLoad
}
export interface QuestionOneOfTheList {
  oneOfTheListName: string;
  oneOfTheListId: string;
}
export interface AddNewQuestionActionPayLoad {
  parentId: string,
  questionName: string,
  questionType: string,
  questionId: string,
  requiredQuestion: false,
  questionOneOfTheList: QuestionOneOfTheList[],
  questionDescr:string
  questionDescrIsActive:boolean
}
//========Новый вопрос /new question



//========Удаление вопроса /remove question
export interface RemoveQuestionAction {
  type: FormActionsTypes.REMOVE_QUESTION;
  payload: RemoveQuestionActionPayLoad
}
export interface RemoveQuestionActionPayLoad {
  parentId: string,
  questionId: string,
}
//========Удаление вопроса /remove question



//========Изменить тип вопроса /change type
export interface ChangeQuestionType {
  type: FormActionsTypes.CHANGE_QUESTION_TYPE;
  payload: ChangeQuestionActionPayLoad
}
export interface ChangeQuestionActionPayLoad {
  parentId: string,
  questionId: string,
  questionType: string | undefined,
}
//========Изменить тип вопроса /change type



//Изменить вопрос /change question name
export interface ChangeQuestionNameAction {
  type:FormActionsTypes.CHANGE_QUESTION_NAME,
  payload: ChangeQuestionNamePayload
}
export interface ChangeQuestionNamePayload {
  parentId: string,
  questionId: string,
  questionName: string,
}
//Изменить вопрос /change question name



//Обязательный ли вопрос /Required question
export interface ChangeQuestionRequiredAction {
  type:FormActionsTypes.CHANGE_QUESTION_REQUIRED,
  payload: ChangeQuestionRequiredPayload
}
export interface ChangeQuestionRequiredPayload {
  parentId: string;
  questionId: string;
}
//Обязательный ли вопрос /Required question



//Добавить новый вариант /new variant
export interface AddOneOfTheListAction{
  type:FormActionsTypes.ADD_ONEOFFTHELIST_VARIANT,
  payload: AddOneOffTheListVariantPayload
}
export interface AddOneOffTheListVariantPayload {
  oneOfTheListName: string;
  oneOfTheListId: string;
  questionId: string;
  parentId: string,
}
//Добавить новый вариант /new variant



//Изменить название варианта /change variant name
export interface ChangeOneOffTheListVariantName{
  type:FormActionsTypes.CHANGE_ONEOFFTHELIST_VARIANTNAME,
  payload: ChangeOneOffTheListVariantNamePayLoad
}
export interface ChangeOneOffTheListVariantNamePayLoad {
  parentId: string,
  questionId: string,
  oneOfTheListId: string;
  oneOfTheListName: string | undefined;
}
//Изменить название варианта /change variant name



//Удалить вариант /delete variant
export interface DeleteOneOffTheListVariantName{
  type:FormActionsTypes.DELETE_ONEOFFTHELIST_VARIANTNAME,
  payload: DeleteOneOffTheListVariantNamePayLoad
}

export interface DeleteOneOffTheListVariantNamePayLoad{
  parentId: string,
  questionId: string,
  oneOfTheListId: string;
}
//Удалить вариант /delete variant



//Активно ли описание в вопросе /is question desct isactive?
export interface QuestionDesctIsActiveAction {
  type: FormActionsTypes.SET_DESCR_ISACTIVE,
  payload: QuestionDesctIsActivePayload
}
export interface QuestionDesctIsActivePayload {
  parentId: string,
  questionId: string,
  questionDescrIsActive:boolean
}
//Активно ли описание в вопросе /is question desct isactive?



//=====Добавить описание вопроса /add questiond descr
export interface ChangeQuestionDesctAction{
  type: FormActionsTypes.RENAME_QUESTION_DESCR,
  payload: ChangeQuestionDescrPayload
}
export interface ChangeQuestionDescrPayload{
  parentId: string,
  questionId: string,
  questionDescr:String
}
//=====Добавить описание вопроса /add questiond descr