import React from 'react';

import { AddNewQuestionActionPayLoad, AddOneOffTheListVariantPayload, ChangeQuestionActionPayLoad } from '../../../../../../Redux/Types/QuestionsTypes';
import s from './formType.module.scss'
import { useParams } from 'react-router-dom';

import { v1 as uuidv1 } from 'uuid';
import { icons, TypeMenu } from '..';
import { useTypeSelector } from '../../../../../../hooks/useTypeSelector';
import { useQuesitonActions } from '../../../../../../hooks/UseActions';

interface typeProps {
    item: TypeMenu;
    active:boolean;
    question: AddNewQuestionActionPayLoad;
    setSelectActive:(bool:boolean) => void;
}

const FormType: React.FC<typeProps> = ({ item, active, question, setSelectActive} ) => {
    const { ChangeQuestionType, AddOneOffTheListVarian} = useQuesitonActions()
    const { currentForm } = useTypeSelector(store => store.createForm)

    const {id}:any = useParams()
    const change = (form=currentForm ,obj: ChangeQuestionActionPayLoad) => {
        ChangeQuestionType(form,obj)
    }

    const Icon = icons[item.icon]

    const addVariant = (form=currentForm , obj: AddOneOffTheListVariantPayload) => {
        AddOneOffTheListVarian(form, obj)
    }
    return (
        <div 
            className={item.name === question.questionType ? s.activeSelect + ' ' + s.activeSelect_active : s.activeSelect}
            onClick={() => {
                change(currentForm,{
                    questionId: question.questionId,
                    parentId:id,
                    questionType:item.name
                })
                if(question.questionOneOfTheList.length === 0){
                    if (item.name === 'Несколько из списка' || item.name === 'Один из списка' || item.name === 'Раскрывающийся список'){
                        addVariant(currentForm,{
                            oneOfTheListName: 'Вариант 1',
                            oneOfTheListId: uuidv1(),
                            questionId: question.questionId,
                            parentId:id
                        })
                    }
                }
                setSelectActive(false)
            }}
        >
            <Icon />
            <div className={s.activeType}>
                {item.name}
            </div>
            <div>
                <img style={active ? { display: "none" } : { display: 'block' }} className={s.activeDrop}
                    src="https://img.icons8.com/material-sharp/25/000000/expand-arrow--v1.png" alt='arrow' />
            </div>
        </div>
    );
};

export default FormType;