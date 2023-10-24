import axios from "axios"
import { useQuery } from "react-query"

const searchPlayers = async ({search, teamId}: {search: string, teamId: number}) => {
    const options = {
        method: 'GET',
        url: 'https://api-american-football.p.rapidapi.com/players',
        params: {search, team: teamId, season: "2023"},
        headers: {
          'X-RapidAPI-Key': '46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e',
          'X-RapidAPI-Host': 'api-american-football.p.rapidapi.com'
        }
      };

      const res = await axios.request(options).then((res) => res.data.response)
      console.log(res)
      
    return res
}
const useSearchPlayers = ({search, teamId}: {search: string, teamId: number}) => {
    return useQuery(["search-players"], () => searchPlayers({search, teamId}), {
      refetchOnWindowFocus: false,
      enabled: false
    })
}

export default useSearchPlayers