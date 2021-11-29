import s from './SecondForms.module.scss'

import React, {useState} from 'react'

import {SideBar} from "./SideBar";

import { AddNewQuestionActionPayLoad} from '../../../../Redux/Types/QuestionsTypes';

import Question from './Question';
import { FormContext } from '../..';


export const SecondForm: React.FC = () => {
    //для того что б sidebar двигался при нажатие на вопрос
    const [active, setActive] = useState<number>(0)
    //массив с размеров в пикселях от родителю до вопроса/ для тоого что б сайдбар при клике двигался
    const [sidebarTop, setSidebarTop] = useState<number[]>([])
    const { Form }: any = React.useContext(FormContext);

    const changeActiveQuestion = (num:number)=>{
        setActive(num)
    }
    
    return (
        <div className={s.wrapper}>
            {
                Form?.questions.map((item: AddNewQuestionActionPayLoad, index: number) =>
                    <Question 
                        key={`${Form.name}_${index}`} 
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
