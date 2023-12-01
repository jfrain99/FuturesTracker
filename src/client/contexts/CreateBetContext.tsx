import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import useGetBetTypes from "../hooks/useGetBetTypes"
import { BetType } from "../types/Bet"

interface CreateBetContextInterface {
  step: number
  setStep: Dispatch<SetStateAction<number>>
  betTypes: BetType["BetType"][]
}
const CreateBetContext = createContext({} as CreateBetContextInterface)
export default CreateBetContext

const CreateBetProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0)

  const { data: betTypes } = useGetBetTypes()
  return (
    <CreateBetContext.Provider value={{ step, setStep, betTypes }}>
      {children}
    </CreateBetContext.Provider>
  )
}

function useCreateBetContext() {
  const appContext = useContext(CreateBetContext)
  if (appContext === undefined) {
    throw new Error(
      "useCreateBetContext must be used within an CreateBetProvider"
    )
  }
  return appContext
}

export { CreateBetProvider, useCreateBetContext }
