import React from 'react'

import s from './MainForm.module.scss'
import { useParams } from 'react-router-dom'
import { debounce } from '@mui/material/utils'
import { useTypeSelector } from '../../../../hooks/useTypeSelector'
import { useFormActions } from '../../../../hooks/UseActions'

const MainForm: React.FC = () => {
    const {id}:any = useParams()
    const { RenameForm, RenameFormDescr } = useFormActions()
    //Текущая форма
    const { currentForm } = useTypeSelector(store => store.createForm)
    //занчение в инпуте
    const changeName = (e:any) => {
        if (currentForm){
            RenameForm(currentForm, {
                id: id,
                formName: e.target.value
            })
        }
    }
    const changeDescr = (e: any) => {
        if (currentForm) {
            RenameFormDescr(currentForm, {
                id: id,
                FormDescr: e.target.value
            })
        }
        
    }
    const debouncedChangeNameHandler = debounce(changeName, 2000)
    const debouncedChangeDescrHandler = debounce(changeDescr, 2000)
    return (
        <form 
            key={`${currentForm?.formName}_${currentForm?.id}`}
            className={s.row}
            style={{ borderColor: currentForm?.formTheme}}
        >
            <input
                type='text'
                className={s.mainInput}
                defaultValue={currentForm?.formName}
                onChange={debouncedChangeNameHandler}
            />
            <input 
                type='text' 
                className={s.secondInput} 
                defaultValue={currentForm?.FormDescr === '' ? 'Описание' : currentForm?.FormDescr} 
                onChange={debouncedChangeDescrHandler}
            />
        </form>
    )
}

export default MainForm