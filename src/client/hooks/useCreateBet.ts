import { useMutation } from "react-query"

import BetService from "../api/Services/betService"

interface CreateBetBody {
    playerId: number
    teamId: number
    stat: string
    amount: string
    risk: string
    win: string
    overUnder: string
}
const createBet = async (data: CreateBetBody) => {


    const res = await BetService.post("/", data)
    console.log({res})
    return res

}
const useCreateBet = () => {
    return useMutation(["search-players"], (data: CreateBetBody) => createBet(data))
}

export default useCreateBet