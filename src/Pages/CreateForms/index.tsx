import React from 'react'
import {Header} from './Components/Header'
import { SecondForm} from "./Components/SecondForm";
import MainForm from "./Components/MainForm";
import {ThemeBlock} from "./Components/ThemeBlock";
import s from './CreateForms.module.scss'

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLoadForms, SetCurrentForm } from '../../Redux/actions/FormAction';
import Loader from "react-loader-spinner";

export const FormContext = React.createContext({})

export const CreateForms: React.FC = () => {
    const { id }: any = useParams()
    let dispatch = useDispatch()
    const {form,isLoading,currentForm} = useTypeSelector(store => store.createForm)

    const [themeIsOpen, setThemeIsOpen] = React.useState(false)
    //реф что б навесит падинг
    const formRef = React.useRef<HTMLDivElement>(null)
   
    React.useEffect(() =>{
        if (!form.length){
            dispatch(onLoadForms())
        } else{
            dispatch(SetCurrentForm(id))
        }
    }, [dispatch, form, id])

    return (
        <div>
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
                style={{ background: currentForm?.formThemeBackGround}}
            >
                <Header formRef={formRef} setThemeIsOpen={setThemeIsOpen} />
                <div className={s.formCreate}>
                    <MainForm />
                    <SecondForm />
                </div>
                <ThemeBlock themeIsOpen={themeIsOpen} setThemeIsOpen={setThemeIsOpen} />
            </div>
            }
        </div>
    )
}
