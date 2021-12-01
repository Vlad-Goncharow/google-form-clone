import React from 'react'
import { v1 as uuidv1 } from 'uuid';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addFormQuestion, ChangeDescrIsActive, ChangeQuestionDescr, ChangeQuestionName, ChangeQuestionRequired, RemoveQuestion} from '../../../../../Redux/actions/QuestionsActions'
import { AddNewQuestionActionPayLoad, ChangeQuestionDescrPayload, ChangeQuestionNamePayload, ChangeQuestionRequiredPayload, QuestionDesctIsActivePayload, RemoveQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes'
import FormTypes from '../FormTypes/formTypes'

import s from './Question.module.scss'


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';  
import { Questions } from '../Questions'
import { FormTypeObject } from '../../../../../Redux/Types/FormsTypes';
import { FormContext } from '../../..';
import { debounce } from '@mui/material/utils';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside';


interface QuestionProps {
  itemIndex: number;
  active: number;
  item: AddNewQuestionActionPayLoad;
  changeActiveQuestion: (num: number) => void;
  setSidebarTop: (num: any) => void;
}

const Question: React.FC<QuestionProps> = ({ itemIndex, active, item, changeActiveQuestion, setSidebarTop}) => {
  const {id}:any = useParams()
  const dispatch = useDispatch()
  const { Form }: any = React.useContext(FormContext);

  const [descrPopup,setDescrPopup] = React.useState<boolean>(false)
  const descrPopupRef = React.useRef<HTMLDivElement>(null)
  //хук на клик в не блока
  useOnClickOutside(descrPopupRef, () => setDescrPopup(false))

  const setDescrIsActive = (form: FormTypeObject, obj: QuestionDesctIsActivePayload) =>{
    dispatch(ChangeDescrIsActive(form, obj))
  }

  const removeQuesion = (form: FormTypeObject,obj: RemoveQuestionActionPayLoad) => {
    dispatch(RemoveQuestion(form,obj))
  }

  const chgangeQuestionName = (Form: FormTypeObject,obj: ChangeQuestionNamePayload) => {
    dispatch(ChangeQuestionName(Form,obj))
  }
  const questionDescr = (Form: FormTypeObject, obj: ChangeQuestionDescrPayload) => {
    dispatch(ChangeQuestionDescr(Form,obj))
  }
  const debouncedChangeHandler = debounce(chgangeQuestionName, 2000)
  const questionDescrDebounced = debounce(questionDescr, 2000)
  

  const changeQuestionRequired = (form: FormTypeObject,obj: ChangeQuestionRequiredPayload) => {
    dispatch(ChangeQuestionRequired(form,obj))
  }

  const dublicateQuestion = (form: any,obj: AddNewQuestionActionPayLoad) => {
    dispatch(addFormQuestion(form,obj))
  }

  let questionRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let height = questionRef.current?.offsetTop
    if (height !== undefined) {
      setSidebarTop((prev: any) => [...prev, height].slice(-Form.questions.length))
    }
  }, [Form.questions.length, active, setSidebarTop])

  return (
    <div ref={questionRef} className={active === itemIndex ? s.secondForm + ' ' + s.secondForm_active : s.secondForm}>
      {
        //для открытия вопроса и если вопрос открыт при удаление не работал changeActiveQuestion
        active === itemIndex ?
          null
          :
          <div onClick={() => changeActiveQuestion(itemIndex)} className={s.w}></div>
      }
      {
        active === itemIndex ?
          <div className={s.secondFormContainer}>
            <div className={s.activeContent}>
              <div className={s.questionName}>
                <input
                  className={s.textarea}
                  defaultValue={item.questionName}
                  placeholder={'Вопрос'}
                  onChange={(e) => {
                    debouncedChangeHandler(Form, {
                      parentId: item.parentId,
                      questionId: item.questionId,
                      questionName: e.target.value
                    })
                  }}
                />
              </div>
              <FormTypes question={item} />
            </div>
            {
              item.questionDescrIsActive &&
              <form className={s.descr}>
                <input id='descr' type="text" defaultValue={item.questionDescr.length < 1 ? 'Описание' : item.questionDescr} onChange={(e) => {
                  questionDescrDebounced(Form,{
                    parentId:item.parentId,
                    questionDescr:e.target.value,
                    questionId:item.questionId
                  })
                }}/>
                <label htmlFor="descr"></label>
              </form>
            }
            <Questions itemIndex={itemIndex} active={active} item={item} />
            <div className={s.footer} >
              <div className={s.footerIcons}>
                <div className={s.footerIcon} onClick={() => dublicateQuestion(Form, { ...item, questionId: uuidv1() })}>
                  <ContentCopyIcon />
                </div>
                <div className={s.footerIcon}>
                  <DeleteOutlineIcon
                    onClick={() => {
                      changeActiveQuestion(itemIndex - 1)
                      removeQuesion(
                        Form,
                      {
                        ...item,
                        parentId:id,
                        questionId:item.questionId
                      })
                    }}
                  />
                </div>
              </div>
              <div
                className={s.requiredBlock}
                onClick={() => {
                  changeQuestionRequired(Form,{
                    parentId: item.parentId,
                    questionId: item.questionId
                  })
                }}
              >
                <span>Обязательный вопрос</span>
                <div className={s.requiredCheck} >
                  <input type="checkbox" id='required' checked={item.requiredQuestion} onChange={() => !item.requiredQuestion} className="requiredInput" />
                  <label htmlFor="required"></label>
                </div>
              </div>
              <div className={s.footerIcon}>
                <MoreVertIcon onClick={() => setDescrPopup(true)}/>
                {descrPopup &&
                <div className={s.popup} ref={descrPopupRef}>
                  <ul>
                    <li onClick={() => setDescrIsActive(Form, {
                      parentId: item.parentId,
                      questionId: item.questionId,
                      questionDescrIsActive:!item.questionDescrIsActive
                    })}>
                      {item.questionDescrIsActive &&<CheckIcon />}
                      <span >
                        Описание
                      </span>
                    </li>
                  </ul>
                </div>}
              </div>
            </div>
          </div>
          :
          <div className={s.hideBlock}>
            <h2 className={s.nameQuestion}>{item.questionName}</h2>
            {
              item.questionDescrIsActive &&
              <form className={`${s.descr} ${s.descr__notactive}`}>
                <input id='descr' type="text" defaultValue={item.questionDescr.length < 1 ? 'Описание' : item.questionDescr} />
                <label htmlFor="descr"></label>
              </form>
            }
            <Questions itemIndex={itemIndex} active={active} item={item} />
          </div>
      }
    </div>
  )
}

export default Question
