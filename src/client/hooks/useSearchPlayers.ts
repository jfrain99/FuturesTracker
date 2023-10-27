import { useQuery } from "react-query"
import PlayerService from "../api/Services/playerService"

const searchPlayers = async ({search, teamId}: {search: string, teamId: number}) => {


    const res = await PlayerService.get("/", { params: {
      search,
      teamId
    }}).then((res) => res.data.data)

    console.log({res})
    return res

}
const useSearchPlayers = ({search, teamId}: {search: string, teamId: number}) => {
    return useQuery(["search-players"], () => searchPlayers({search, teamId}), {
      refetchOnWindowFocus: false,
      enabled: false
    })
}

export default useSearchPlayers