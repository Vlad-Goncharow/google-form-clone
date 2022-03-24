import React,{  ChangeEvent} from 'react'

import s from './FormName.module.scss'
import { useParams } from 'react-router-dom'
import { debounce } from '@mui/material/utils'
import { useTypeSelector } from '../../../../hooks/useTypeSelector'
import { useFormActions } from '../../../../hooks/UseActions'

export const FormName: React.FC = () => {
    const {id}:any = useParams()
    const { RenameForm, RenameFormDescr } = useFormActions()
    const { currentForm } = useTypeSelector(store => store.createForm)

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentForm){
            RenameForm(currentForm, {
                id: id,
                formName: e.target.value
            })
        }
    }

    const changeDescr = (e: ChangeEvent<HTMLInputElement>) => {
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