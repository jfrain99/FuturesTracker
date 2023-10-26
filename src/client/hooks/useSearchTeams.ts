import {  useQuery } from "react-query"
import TeamService from "../api/Services/teamService"

const searchTeams = async ({search}: {search: string}) => {
  return TeamService.get("/", { params: {
    search
  }}).then((res) => res.data.data)
      
}
const useSearchTeams = ({search,}: {search: string}) => {
    return useQuery(["search-teams"], () => searchTeams({search}), {
        refetchOnWindowFocus: false,
        enabled: false
    })
}

export default useSearchTeams