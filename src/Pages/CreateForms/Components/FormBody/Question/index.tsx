import React, { ChangeEvent } from 'react'
import { v1 as uuidv1 } from 'uuid';
import { useParams } from 'react-router-dom'

import { AddNewQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes'
import FormTypes from '../FormTypes'

import s from './Question.module.scss'


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';  
import { Questions } from '../Questions'
import { debounce } from '@mui/material/utils';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside';
import { useTypeSelector } from '../../../../../hooks/useTypeSelector';
import { useQuesitonActions } from '../../../../../hooks/UseActions';


interface QuestionProps {
  itemIndex: number;
  active: number;
  question: AddNewQuestionActionPayLoad;
  changeActiveQuestion: (num: number) => void;
  setSidebarTop: (num: any) => void;
}

const Question: React.FC<QuestionProps> = ({ itemIndex, active, question, changeActiveQuestion, setSidebarTop}) => {
  const {
    ChangeDescrIsActive,
    ChangeQuestionName,
    ChangeQuestionDescr,
    ChangeQuestionRequired,
    addFormQuestion,
    RemoveQuestion
  } = useQuesitonActions()

  const { currentForm } = useTypeSelector(store => store.createForm)

  const {id}:any = useParams()

  const [descrPopup,setDescrPopup] = React.useState<boolean>(false)
  const descrPopupRef = React.useRef<HTMLUListElement>(null)
  //хук на клик в не блока
  useOnClickOutside(descrPopupRef, () => setDescrPopup(false))

  const setDescrIsActive = () =>{
    ChangeDescrIsActive(currentForm, {
      parentId: question.parentId,
      questionId: question.questionId,
      questionDescrIsActive: !question.questionDescrIsActive
    })
    setDescrPopup(false)
  }

  const chgangeQuestionName = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentForm){
      ChangeQuestionName(currentForm, {
        parentId: question.parentId,
        questionId: question.questionId,
        questionName: e.target.value
      })
    }
  }
  
  const questionDescr = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentForm){
      ChangeQuestionDescr(currentForm, {
        parentId: question.parentId,
        questionDescr: e.target.value,
        questionId: question.questionId
      })
    }
  }
  const debouncedChangeHandler = debounce(chgangeQuestionName, 2000)
  const questionDescrDebounced = debounce(questionDescr, 2000)
  

  const changeQuestionRequired = () => {
    ChangeQuestionRequired(currentForm, {
      parentId: question.parentId,
      questionId: question.questionId
    })
  }

  const dublicateQuestion = () => {
    addFormQuestion(currentForm, { ...question, questionId: uuidv1() })
  }

  let questionRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let height = questionRef.current?.offsetTop

      if (height !== undefined) {
        setSidebarTop((prev: any) => [...prev, height].slice(-currentForm?.questions.length))
      }
  }, [active, setSidebarTop, currentForm?.questions.length])

  const deleteQuestion = () =>{
    if (currentForm){
      if (itemIndex !== 0) {
        changeActiveQuestion(itemIndex - 1)
      }
      changeActiveQuestion(0)
      RemoveQuestion(
        currentForm,
        {
          ...question,
          parentId: id,
          questionId: question.questionId
        }
      )
    }
  }

  return (
    <div ref={questionRef} className={active === itemIndex ? s.secondForm + ' ' + s.secondForm_active : s.secondForm}>
      {
        active === itemIndex ?
          <div className={s.secondFormContainer}>
            <div className={s.activeContent}>
              <div className={s.questionName}>
                <input
                  className={s.textarea}
                  defaultValue={question.questionName}
                  placeholder={'Вопрос'}
                  onChange={debouncedChangeHandler}
                />
              </div>
              <FormTypes question={question} />
            </div>
            {
              //Описание
              question.questionDescrIsActive &&
              <form className={s.descr}>
                <input 
                id='descr' 
                type="text" 
                defaultValue={question.questionDescr.length < 1 ? 'Описание' : question.questionDescr} 
                onChange={questionDescrDebounced}/>
                <label htmlFor="descr"></label>
              </form>
            }
            <Questions itemIndex={itemIndex} active={active} question={question} />
            <div className={s.footer} >
              <div className={s.footerIcons}>
                <div 
                  className={s.footerIcon} 
                  onClick={dublicateQuestion}
                >
                  <ContentCopyIcon />
                </div>
                <div className={s.footerIcon}>
                  <DeleteOutlineIcon
                    onClick={deleteQuestion}
                  />
                </div>
              </div>
              <div
                className={s.requiredBlock}
                onClick={changeQuestionRequired}
              >
                <span>Обязательный вопрос</span>
                <div className={s.requiredCheck} >
                  <input 
                    type="checkbox" 
                    id='required' 
                    checked={question.requiredQuestion} 
                    onChange={() => !question.requiredQuestion} 
                    className="requiredInput" 
                  />
                  <label htmlFor="required"></label>
                </div>
              </div>
              <div className={s.footerIcon}>
                <MoreVertIcon onClick={() => setDescrPopup(true)}/>
                {
                  descrPopup &&
                    <ul className={s.popup} ref={descrPopupRef}>
                      <li onClick={setDescrIsActive}>
                        {question.questionDescrIsActive &&<CheckIcon />}
                        <span>
                          Описание
                        </span>
                      </li>
                    </ul>
                }
              </div>
            </div>
          </div>
          :
          <div className={s.hideBlock} onClick={() => changeActiveQuestion(itemIndex)} >
            <h2 className={s.nameQuestion}>{question.questionName}</h2>
            {
              question.questionDescrIsActive &&
              <form className={`${s.descr} ${s.descr__notactive}`}>
                <input id='descr' type="text" defaultValue={question.questionDescr.length < 1 ? 'Описание' : question.questionDescr} />
                <label htmlFor="descr"></label>
              </form>
            }
            <Questions itemIndex={itemIndex} active={active} question={question} />
          </div>
      }
    </div>
  )
}

export default Question
