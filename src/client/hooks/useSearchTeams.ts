import axios from "axios"
import {  useQuery } from "react-query"

const searchTeams = async ({search}: {search: string}) => {
    const options = {
        method: 'GET',
        url: 'https://api-american-football.p.rapidapi.com/teams',
        params: { search, },
        headers: {
          'X-RapidAPI-Key': '46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e',
          'X-RapidAPI-Host': 'api-american-football.p.rapidapi.com'
        }
      };

      const res = await axios.request(options).then((res) => res.data.response)
      console.log(res)
      
    return res
}
const useSearchTeams = ({search,}: {search: string}) => {
    return useQuery(["search-teams"], () => searchTeams({search}), {
        refetchOnWindowFocus: false,
        enabled: false
    })
}

export default useSearchTeams