import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

interface CreateBetContextInterface {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}
const CreateBetContext = createContext({} as CreateBetContextInterface)
export default CreateBetContext

const CreateBetProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0)
  return (
    <CreateBetContext.Provider value={{ step, setStep }}>
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
