import { useQuery } from "react-query"
import BetService from "../api/Services/betService"


const getBetTypes = async () => {
    return await BetService.get("/types").then((res) => res.data.data)
}

const useGetBetTypes = () => {
    return useQuery(["get-bet-types"], () => getBetTypes(), { refetchOnWindowFocus: false})
}

export default useGetBetTypes