import React from 'react'
import {Header} from './Components/Header/Header'
import { SecondForm} from "./Components/SecondForm";
import MainForm from "./Components/MainForm/MainForm";
import {ThemeBlock} from "./Components/ThemeBlock";
import s from './CreateForms.module.scss'

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useParams } from 'react-router-dom';
import { FormTypeObject } from '../../Redux/Types/FormsTypes';
import { useDispatch } from 'react-redux';
import { onLoadForms } from '../../Redux/actions/FormAction';
import Loader from "react-loader-spinner";

export const FormContext = React.createContext({})

export const CreateForms: React.FC = () => {
    let dispatch = useDispatch()

    const [themeIsOpen, setThemeIsOpen] = React.useState(false)

    const {form,isLoading} = useTypeSelector(store => store.createForm)
    const {id}:any = useParams()

    //реф что б навесит падинг
    const formRef = React.useRef<HTMLDivElement>(null)
    //не знаю почему захотелось сделать так, /можно было и find использовать
    let Form = form[form.findIndex((el:FormTypeObject) => el.id === id)]
    
    React.useEffect(() =>{
        if(Form === undefined){
            dispatch(onLoadForms())
        }
    },[Form, dispatch])
    
    return (
        <FormContext.Provider value={{
            Form
        }}>
            {
                isLoading ?
                <div className={s.loader}>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                </div>
                :
            <div 
                ref={formRef}
                className={s.form}
                style={{ background: Form?.formThemeBackGround}}
            >
                <Header formRef={formRef} setThemeIsOpen={setThemeIsOpen} />
                <div className={s.formCreate}>
                    <MainForm />
                    <SecondForm />
                </div>
                <ThemeBlock themeIsOpen={themeIsOpen} setThemeIsOpen={setThemeIsOpen} />
            </div>
            }
        </FormContext.Provider>
    )
}
