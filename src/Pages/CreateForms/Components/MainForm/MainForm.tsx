import React from 'react'

import s from './MainForm.module.scss'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ChangeFormDescrPayload, FormTypeObject, RenameFormPayLoad } from '../../../../Redux/Types/FormsTypes'
import { debounce } from '@mui/material/utils'
import { FormContext } from '../..'
import { RenameForm, RenameFormDescr } from '../../../../Redux/actions/FormAction'

const MainForm: React.FC = () => {
    const {id}:any = useParams()
    const dispatch = useDispatch()
    //Текущая форма
    const { Form }: any = React.useContext(FormContext);
    //занчение в инпуте
    const changeName = (Form: FormTypeObject, obj: RenameFormPayLoad) => {
        dispatch(RenameForm(Form, obj))
    }
    const changeDescr = (Form: FormTypeObject, obj: ChangeFormDescrPayload) => {
        dispatch(RenameFormDescr(Form, obj))
    }
    const debouncedChangeNameHandler = debounce(changeName, 2000)
    const debouncedChangeDescrHandler = debounce(changeDescr, 2000)
    return (
        <form 
            key={`${Form?.FormName}_${Form?.id}`}
            className={s.row}
            style={{ borderColor: Form?.formTheme}}
        >
            <input
                type='text'
                className={s.mainInput}
                defaultValue={Form?.formName}
                onChange={(e) => debouncedChangeNameHandler(Form, {
                    id: id,
                    formName: e.target.value
                })}
            />
            <input 
                type='text' 
                className={s.secondInput} 
                defaultValue={Form?.FormDescr === '' ? 'Описание' : Form?.FormDescr} 
                onChange={(e) => debouncedChangeDescrHandler(Form, {
                    id: id,
                    FormDescr: e.target.value
                })}
            />
        </form>
    )
}

export default MainForm