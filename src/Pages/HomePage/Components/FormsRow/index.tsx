import React from 'react'
import s from './FormsRow.module.scss'

import { useTypeSelector } from '../../../../hooks/useTypeSelector'
import { FormTypeObject } from '../../../../Redux/Types/FormsTypes';
import { GridView } from './GridView';
import LineView from './LineView';

interface FormsRowProps {
  changePopupValue: (val: boolean) => void
  grigView:boolean
  searchForms:FormTypeObject[]
}

export const FormsRow: React.FC<FormsRowProps> = React.memo(({ changePopupValue, grigView, searchForms }) => {
  const { form } = useTypeSelector(store => store.createForm)

  return (
    <div className={s.container}>
      <div className={s.FormsRow}>
        {
          form.length > 0 ?
            searchForms.map((form: FormTypeObject) =>
              grigView ?
              <LineView key={`form_${form.id}`} form={form} changePopupValue={changePopupValue}  />
              :
              <GridView key={`form_${form.id}`} form={form} changePopupValue={changePopupValue}  />
            )
          :
            <div>Создайте форму</div>
        }
      </div>
    </div>
  )
})

