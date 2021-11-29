import React from 'react'

import s from './MainForm.module.scss'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormTypeObject, RenameFormPayLoad } from '../../../../Redux/Types/FormsTypes'
import { debounce } from '@mui/material/utils'
import { FormContext } from '../..'
import { RenameForm } from '../../../../Redux/actions/FormAction'

const MainForm: React.FC = () => {
    const {id}:any = useParams()
    const dispatch = useDispatch()
    //Текущая форма
    const { Form }: any = React.useContext(FormContext);
    //занчение в инпуте
    const changeName = (Form: FormTypeObject, obj: RenameFormPayLoad) => {
        dispatch(RenameForm(Form, obj))
    }
    const debouncedChangeHandler = debounce(changeName, 2000)
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
                onChange={(e) => debouncedChangeHandler(Form, {
                    id: id,
                    formName: e.target.value
                })}
            />
            <input type='text' className={s.secondInput} placeholder='Описание' />
        </form>
    )
}

export default MainForm