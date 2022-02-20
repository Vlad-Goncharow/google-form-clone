import s from './SecondForms.module.scss'

import React, {useState} from 'react'

import {SideBar} from "./SideBar";

import { AddNewQuestionActionPayLoad} from '../../../../Redux/Types/QuestionsTypes';

import Question from './Question';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';


export const SecondForm: React.FC = () => {
    //для того что б sidebar двигался при нажатие на вопрос
    const [active, setActive] = useState<number>(0)
    //массив с размеров в пикселях от родителю до вопроса/ для тоого что б сайдбар при клике двигался
    const [sidebarTop, setSidebarTop] = useState<number[]>([])
    const { currentForm } = useTypeSelector(store => store.createForm)

    const changeActiveQuestion = (num:number)=>{
        setActive(num)
    }
    
    return (
        <div className={s.wrapper}>
            {
                currentForm?.questions.map((item: AddNewQuestionActionPayLoad, index: number) =>
                    <Question 
                        key={`question_${item.questionId}`} 
                        item={item} 
                        active={active} 
                        setSidebarTop={setSidebarTop}
                        itemIndex={index} 
                        changeActiveQuestion={changeActiveQuestion} 
                    />
                )
            }
            <SideBar changeActiveQuestion={changeActiveQuestion} active={active} sidebarTop={sidebarTop} />
        </div>
    )

}
