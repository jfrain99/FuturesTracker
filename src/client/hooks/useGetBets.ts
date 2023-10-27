import { useQuery } from "react-query"
import BetService from "../api/Services/betService"


const getBets = async () => {
    return await BetService.get("/").then((res) => res.data.data)
}

const useGetBets = () => {
    return useQuery(["get-bets"], () => getBets(), { refetchOnWindowFocus: false})
}

export default useGetBets