import React from 'react'
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
  item: AddNewQuestionActionPayLoad;
  changeActiveQuestion: (num: number) => void;
  setSidebarTop: (num: any) => void;
}

const Question: React.FC<QuestionProps> = ({ itemIndex, active, item, changeActiveQuestion, setSidebarTop}) => {
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
      parentId: item.parentId,
      questionId: item.questionId,
      questionDescrIsActive: !item.questionDescrIsActive
    })
    setDescrPopup(false)
  }

  const chgangeQuestionName = (e:any) => {
    if (currentForm){
      ChangeQuestionName(currentForm, {
        parentId: item.parentId,
        questionId: item.questionId,
        questionName: e.target.value
      })
    }
  }
  
  const questionDescr = (e:any) => {
    if (currentForm){
      ChangeQuestionDescr(currentForm, {
        parentId: item.parentId,
        questionDescr: e.target.value,
        questionId: item.questionId
      })
    }
  }
  const debouncedChangeHandler = debounce(chgangeQuestionName, 2000)
  const questionDescrDebounced = debounce(questionDescr, 2000)
  

  const changeQuestionRequired = () => {
    ChangeQuestionRequired(currentForm, {
      parentId: item.parentId,
      questionId: item.questionId
    })
  }

  const dublicateQuestion = () => {
    addFormQuestion(currentForm, { ...item, questionId: uuidv1() })
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
          ...item,
          parentId: id,
          questionId: item.questionId
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
                  defaultValue={item.questionName}
                  placeholder={'Вопрос'}
                  onChange={debouncedChangeHandler}
                />
              </div>
              <FormTypes question={item} />
            </div>
            {
              item.questionDescrIsActive &&
              <form className={s.descr}>
                <input 
                id='descr' 
                type="text" 
                defaultValue={item.questionDescr.length < 1 ? 'Описание' : item.questionDescr} 
                onChange={questionDescrDebounced}/>
                <label htmlFor="descr"></label>
              </form>
            }
            <Questions itemIndex={itemIndex} active={active} item={item} />
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
                    checked={item.requiredQuestion} 
                    onChange={() => !item.requiredQuestion} 
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
                        {item.questionDescrIsActive &&<CheckIcon />}
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
          <div className={s.hideBlock} >
            <div className={s.w} onClick={() => changeActiveQuestion(itemIndex)}></div>
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
