import React from 'react'
import { useParams } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid';

import s from './SideBar.module.scss'


import ControlPointIcon from '@mui/icons-material/ControlPoint';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BorderAllIcon from '@mui/icons-material/BorderAll';

import { useTypeSelector } from '../../../../../hooks/useTypeSelector';
import { useQuesitonActions } from '../../../../../hooks/UseActions';

interface ISideBar {
    active: number;
    sidebarTop: number[];
    changeActiveQuestion:(num:number) => void;
}

export const SideBar: React.FC<ISideBar> = ({ active, changeActiveQuestion, sidebarTop} ) => {
    const { addFormQuestion } = useQuesitonActions()
    //высота в писелях для сайдбара
    let numb = sidebarTop[active]
    const {id}:any = useParams()
    const { currentForm } = useTypeSelector(store => store.createForm)
    
    const addQues = () => {
        addFormQuestion(
            currentForm,
            {
                questionOneOfTheList: [],
                parentId: id,
                questionName: "Вопрос",
                questionDescr: '',
                questionType: 'Текст (строка)',
                questionId: uuidv1(),
                requiredQuestion: false,
                questionDescrIsActive: false
            })
        changeActiveQuestion(active + 1)
    }

    return (
        <div style={sidebarTop.length === 1 ? { top: 0 } : { top: numb }} className={s.sideBar}>
            <ul>
                <li onClick={addQues}>
                    <ControlPointIcon />
                </li>
                <li>
                    <UploadFileIcon />
                </li>
                <li>
                    <TextFieldsIcon />
                </li>
                <li>
                    <ImageOutlinedIcon />
                </li>
                <li>
                    <OndemandVideoIcon />
                </li>
                <li>
                    <BorderAllIcon />
                </li>
            </ul>
        </div>
    )
}
