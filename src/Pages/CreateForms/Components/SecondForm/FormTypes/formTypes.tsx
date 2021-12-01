import React, { useState } from 'react';
import s from './formTypes.module.scss'
import FormType from "./FormType/FormType";

import ReorderIcon from '@mui/icons-material/Reorder';
import ShortTextIcon from '@mui/icons-material/ShortText';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import { AddNewQuestionActionPayLoad } from '../../../../../Redux/Types/QuestionsTypes';
import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside';

interface FormTypesProps {
    question: AddNewQuestionActionPayLoad;
}

export interface TypeMenu {
    name: string;
    checked: boolean;
    id: number;
    icon: keyof typeof icons;
}
export const icons: any = {
    ReorderIcon,
    ShortTextIcon,
    RadioButtonCheckedIcon,
    CheckBoxIcon,
    ArrowDropDownCircleIcon
};

const FormTypes: React.FC<FormTypesProps> = ({question }) => {
    const types: TypeMenu[] = [
        {
            id: 59713,
            name: 'Текст (строка)',
            checked: true,
            icon: 'ShortTextIcon'
        }, {
            id: 73812,
            name: 'Текст (абзац)',
            checked: false,
            icon: 'ReorderIcon'
        }, {
            id: 38539,
            name: 'Один из списка',
            checked: false,
            icon: 'RadioButtonCheckedIcon'
        }, {
            id: 44315,
            name: 'Несколько из списка',
            checked: false,
            icon: 'CheckBoxIcon'
        }, {
            id: 32787,
            name: 'Раскрывающийся список',
            checked: false,
            icon: 'ArrowDropDownCircleIcon'
        }
    ]
    //Попап с типами
    const [selectActive, setSelectActive] = useState<boolean>(false)
    //Проверка на клик вне менюшки
    const refMenu = React.useRef<HTMLDivElement>(null)
    //хук на клик в не менюшки
    useOnClickOutside(refMenu, () => setSelectActive(false))
    //Иконки выбраного типа
    let Icon = icons[types[types.findIndex((el: TypeMenu) => el.name === question.questionType)].icon]

    return (
        <div ref={refMenu} className={s.activeSelectBlock}>
            {
                selectActive ?
                    <div className={s.activeSelectOpen} >
                        {
                            types.map((el: TypeMenu, index: number) =>
                                <FormType
                                    key={`type ${index}`}
                                    question={question}
                                    item={el}
                                    active={selectActive}
                                />
                            )
                        }
                    </div>
                :
                    <div onClick={() => setSelectActive(true)} className={s.activeSelect}>
                        <Icon className={s.acticveSelectImg} />
                        <div className={s.activeSelectName}>{question.questionType}</div>
                        <img className={s.activeSelectArrow} src="https://img.icons8.com/material-sharp/25/000000/expand-arrow--v1.png" alt="" />
                    </div>
            }
        </div>
    );
};

export default FormTypes;