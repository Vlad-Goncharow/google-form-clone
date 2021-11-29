import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "../Redux/redusers/RootReducer"

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector